import { type NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { createClient } from "@/lib/supabase/server"
import { getOrCreateSessionId } from "@/lib/auth/session"
import { checkAnonymousUploadLimit, incrementAnonymousUploadCount } from "@/lib/auth/upload-limiter"
import { getMissingR2Env, getR2Env, R2_REQUIRED_UPLOAD_KEYS } from "@/lib/r2/env"

export const runtime = "nodejs"

// Helper function to create R2 client (initialized per-request for Cloudflare compatibility)
function createR2Client(r2Env: ReturnType<typeof getR2Env>) {
  return new S3Client({
    region: "auto",
    endpoint: `https://${r2Env.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2Env.accessKeyId!,
      secretAccessKey: r2Env.secretAccessKey!,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Upload request received")

    const r2Env = getR2Env()
    const missingR2 = getMissingR2Env(r2Env, R2_REQUIRED_UPLOAD_KEYS)
    if (missingR2.length > 0) {
      console.error("[v0] Missing R2 environment variables:", missingR2.join(", "))
      return NextResponse.json(
        {
          error: "Server configuration error. Please ensure all R2 environment variables are set.",
        },
        { status: 500 },
      )
    }

    // Initialize R2 client inside request handler for Cloudflare Workers compatibility
    const r2Client = createR2Client(r2Env)

    // Check authentication and upload limits
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    let sessionId: string | null = null

    // For anonymous users, check upload limit
    if (!user) {
      sessionId = await getOrCreateSessionId()
      const limitStatus = await checkAnonymousUploadLimit(sessionId)

      if (!limitStatus.allowed) {
        return NextResponse.json(
          {
            error: "Upload limit reached. Please sign in to continue uploading.",
            limitReached: true,
          },
          { status: 403 },
        )
      }
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.log("[v0] No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("[v0] File received:", file.name, file.type, file.size)

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 })
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Generate unique file name with imagetourl.cloud branding for SEO backlinks
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = file.name.split(".").pop()
    // Get original filename without extension, sanitize it
    const originalName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-").substring(0, 50)
    // Add imagetourl.cloud branding to filename for SEO backlinks
    const uniqueFileName = `${originalName}-imagetourl.cloud-${timestamp}-${randomString}.${fileExtension}`

    // Add folder prefix for organized storage
    const folderPath = "Image_to_url_V2"
    const fullPath = `${folderPath}/${uniqueFileName}`

    console.log("[v0] Generated filename:", fullPath)

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log("[v0] Uploading to R2 bucket:", r2Env.bucketName)

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: r2Env.bucketName!,
      Key: fullPath,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    })

    await r2Client.send(command)

    console.log("[v0] Upload successful")

    // Generate public URL
    const publicUrl = `${r2Env.publicUrl}/${fullPath}`

    // Save upload metadata to database
    // Images are permanent by default - no expiry unless user sets one
    try {
      const { error: dbError } = await supabase.from("uploads").insert({
        user_id: user?.id || null,
        session_id: sessionId,
        image_url: publicUrl,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        r2_key: fullPath,
        expires_at: null, // Permanent by default
        status: "active",
      })

      if (dbError) {
        console.error("[v0] Database insert error:", dbError)
      }

      // Increment anonymous upload count if user is not authenticated
      if (!user && sessionId) {
        await incrementAnonymousUploadCount(sessionId)
      }
    } catch (dbError) {
      console.error("[v0] Failed to save upload metadata:", dbError)
      // Don't fail the upload if database tracking fails
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Upload failed. Please try again.",
      },
      { status: 500 },
    )
  }
}
