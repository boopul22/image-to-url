import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { deleteFromR2 } from "@/lib/r2/delete"

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    const now = new Date().toISOString()

    // Query expired uploads
    // Check both expires_at and custom_deletion_time
    const { data: expiredUploads, error: queryError } = await supabase
      .from("uploads")
      .select("id, r2_key, custom_deletion_time, expires_at")
      .eq("status", "active")
      .or(`expires_at.lt.${now},custom_deletion_time.lt.${now}`)
      .limit(100) // Process 100 at a time

    if (queryError) {
      console.error("Error querying expired uploads:", queryError)
      return NextResponse.json(
        { error: "Failed to query expired uploads" },
        { status: 500 }
      )
    }

    if (!expiredUploads || expiredUploads.length === 0) {
      return NextResponse.json({ deleted: 0, errors: 0, message: "No expired uploads found" })
    }

    let deleted = 0
    let errors = 0

    // Process each expired upload
    for (const upload of expiredUploads) {
      try {
        // Determine which timestamp to use
        const customTime = upload.custom_deletion_time
          ? new Date(upload.custom_deletion_time).getTime()
          : Infinity
        const defaultTime = upload.expires_at ? new Date(upload.expires_at).getTime() : Infinity
        const expiryTime = Math.min(customTime, defaultTime)

        // Skip if not actually expired
        if (expiryTime > Date.now()) {
          continue
        }

        // Delete from R2
        const r2Success = await deleteFromR2(upload.r2_key)

        if (!r2Success) {
          console.error(`Failed to delete ${upload.r2_key} from R2`)
          errors++
          continue
        }

        // Delete from database
        const { error: deleteError } = await supabase
          .from("uploads")
          .delete()
          .eq("id", upload.id)

        if (deleteError) {
          console.error(`Failed to delete upload ${upload.id} from database:`, deleteError)
          errors++
        } else {
          deleted++
        }
      } catch (err) {
        console.error(`Error processing upload ${upload.id}:`, err)
        errors++
      }
    }

    return NextResponse.json({
      deleted,
      errors,
      message: `Processed ${deleted + errors} expired uploads`,
    })
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
