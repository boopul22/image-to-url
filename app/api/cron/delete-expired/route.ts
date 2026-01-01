import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { deleteFromR2WithRetry } from "@/lib/r2/delete"

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Allow up to 60 seconds for processing

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

    if (authHeader !== expectedAuth) {
      console.error("[Cron] Unauthorized cron request")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Cron] Starting expired uploads cleanup...")

    const supabase = await createClient()
    const now = new Date().toISOString()

    // Query expired uploads - only delete if user explicitly set an expiry
    // Images are permanent by default (expires_at = NULL)
    // Only delete if custom_deletion_time is set and in the past
    const { data: expiredUploads, error: queryError } = await supabase
      .from("uploads")
      .select("id, r2_key, custom_deletion_time, expires_at, file_name")
      .eq("status", "active")
      .not("custom_deletion_time", "is", null)
      .lt("custom_deletion_time", now)
      .limit(100) // Process 100 at a time

    if (queryError) {
      console.error("[Cron] Error querying expired uploads:", queryError)
      return NextResponse.json(
        { error: "Failed to query expired uploads" },
        { status: 500 }
      )
    }

    if (!expiredUploads || expiredUploads.length === 0) {
      const duration = Date.now() - startTime
      console.log(`[Cron] No expired uploads found (${duration}ms)`)
      return NextResponse.json({
        deleted: 0,
        errors: 0,
        tracked: 0,
        message: "No expired uploads found",
        duration: `${duration}ms`
      })
    }

    console.log(`[Cron] Found ${expiredUploads.length} expired uploads to process`)

    let deleted = 0
    let errors = 0
    let tracked = 0
    const deletedIds: string[] = []
    const failedIds: string[] = []

    // Process each expired upload
    for (const upload of expiredUploads) {
      try {
        // Safety check for race conditions
        const expiryTime = new Date(upload.custom_deletion_time!).getTime()
        if (expiryTime > Date.now()) {
          console.log(`[Cron] Skipping upload ${upload.id} - not yet expired`)
          continue
        }

        console.log(`[Cron] Processing upload ${upload.id}: ${upload.file_name}`)

        // Delete from R2 with retry logic
        const r2Result = await deleteFromR2WithRetry(upload.r2_key, 3, 1000)

        if (!r2Result.success) {
          console.error(`[Cron] Failed to delete ${upload.r2_key} from R2: ${r2Result.error}`)

          // Track failed deletion for later retry
          const { error: trackError } = await supabase
            .from("failed_deletions")
            .insert({
              upload_id: upload.id,
              r2_key: upload.r2_key,
              reason: r2Result.error || "R2 deletion failed",
              status: "pending"
            })

          if (trackError) {
            console.error(`[Cron] Failed to track deletion failure:`, trackError)
          } else {
            tracked++
          }

          errors++
          failedIds.push(upload.id)
          continue
        }

        // Delete from database only after R2 deletion succeeds
        const { error: deleteError } = await supabase
          .from("uploads")
          .delete()
          .eq("id", upload.id)

        if (deleteError) {
          console.error(`[Cron] Failed to delete upload ${upload.id} from database:`, deleteError)

          // Track orphaned R2 deletion (file deleted but record remains)
          await supabase
            .from("failed_deletions")
            .insert({
              upload_id: upload.id,
              r2_key: upload.r2_key,
              reason: `Database deletion failed after R2 success: ${deleteError.message}`,
              status: "pending"
            })

          errors++
          failedIds.push(upload.id)
        } else {
          deleted++
          deletedIds.push(upload.id)
          console.log(`[Cron] Successfully deleted upload ${upload.id}`)
        }
      } catch (err) {
        console.error(`[Cron] Error processing upload ${upload.id}:`, err)
        errors++
        failedIds.push(upload.id)
      }
    }

    const duration = Date.now() - startTime

    console.log(`[Cron] Cleanup complete in ${duration}ms: ${deleted} deleted, ${errors} errors, ${tracked} tracked for retry`)

    return NextResponse.json({
      deleted,
      errors,
      tracked,
      deletedIds,
      failedIds,
      message: `Processed ${deleted + errors} expired uploads`,
      duration: `${duration}ms`
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[Cron] Job error after ${duration}ms:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
