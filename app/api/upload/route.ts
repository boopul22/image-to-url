import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOrCreateSessionId } from "@/lib/auth/session"
import { checkAnonymousUploadLimit, incrementAnonymousUploadCount } from "@/lib/auth/upload-limiter"
import { getMissingR2Env, getR2Env } from "@/lib/r2/env"
import { getR2BucketBinding, getRequiredUploadEnvKeys, putObjectToR2 } from "@/lib/r2/storage"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Upload request received")

    const r2Env = getR2Env()
    const hasBinding = Boolean(getR2BucketBinding())
    const missingR2 = getMissingR2Env(r2Env, getRequiredUploadEnvKeys(hasBinding))
    if (missingR2.length > 0) {
      console.error("[v0] Missing R2 environment variables:", missingR2.join(", "))
      return NextResponse.json(
        {
          error: "Server configuration error. Please ensure all R2 environment variables are set.",
        },
        { status: 500 },
      )
    }

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

    // Convert file to arrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    console.log("[v0] Uploading to R2 bucket:", r2Env.bucketName)

    // Upload to R2 (binding preferred, S3 fallback)
    await putObjectToR2({
      key: fullPath,
      body: arrayBuffer,
      contentType: file.type,
      cacheControl: "public, max-age=31536000, immutable",
    })

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
