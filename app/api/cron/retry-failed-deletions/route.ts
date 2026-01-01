import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { deleteFromR2WithRetry } from "@/lib/r2/delete"

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const MAX_RETRY_COUNT = 5 // Maximum number of retry attempts before marking as permanently failed

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

    if (authHeader !== expectedAuth) {
      console.error("[Retry Cron] Unauthorized request")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Retry Cron] Starting failed deletions retry...")

    const supabase = await createClient()

    // Fetch pending failed deletions that haven't exceeded max retries
    const { data: failedDeletions, error: queryError } = await supabase
      .from("failed_deletions")
      .select("*")
      .eq("status", "pending")
      .lt("retry_count", MAX_RETRY_COUNT)
      .order("created_at", { ascending: true })
      .limit(50)

    if (queryError) {
      console.error("[Retry Cron] Error querying failed deletions:", queryError)
      return NextResponse.json(
        { error: "Failed to query failed deletions" },
        { status: 500 }
      )
    }

    if (!failedDeletions || failedDeletions.length === 0) {
      const duration = Date.now() - startTime
      console.log(`[Retry Cron] No failed deletions to retry (${duration}ms)`)
      return NextResponse.json({
        resolved: 0,
        stillFailed: 0,
        permanentlyFailed: 0,
        message: "No failed deletions to retry",
        duration: `${duration}ms`
      })
    }

    console.log(`[Retry Cron] Found ${failedDeletions.length} failed deletions to retry`)

    let resolved = 0
    let stillFailed = 0
    let permanentlyFailed = 0

    for (const failedDeletion of failedDeletions) {
      try {
        // Mark as retrying
        await supabase
          .from("failed_deletions")
          .update({
            status: "retrying",
            last_retry_at: new Date().toISOString()
          })
          .eq("id", failedDeletion.id)

        console.log(`[Retry Cron] Retrying deletion for r2_key: ${failedDeletion.r2_key}`)

        // Attempt to delete from R2
        const r2Result = await deleteFromR2WithRetry(failedDeletion.r2_key, 2, 500)

        if (r2Result.success) {
          // R2 deletion succeeded - now try to clean up the upload record if it still exists
          if (failedDeletion.upload_id) {
            await supabase
              .from("uploads")
              .delete()
              .eq("id", failedDeletion.upload_id)
          }

          // Mark as resolved
          await supabase
            .from("failed_deletions")
            .update({
              status: "resolved",
              resolved_at: new Date().toISOString()
            })
            .eq("id", failedDeletion.id)

          resolved++
          console.log(`[Retry Cron] Successfully resolved: ${failedDeletion.r2_key}`)
        } else {
          const newRetryCount = failedDeletion.retry_count + 1

          if (newRetryCount >= MAX_RETRY_COUNT) {
            // Mark as permanently failed
            await supabase
              .from("failed_deletions")
              .update({
                status: "failed",
                retry_count: newRetryCount,
                reason: `${failedDeletion.reason} | Final attempt failed: ${r2Result.error}`
              })
              .eq("id", failedDeletion.id)

            permanentlyFailed++
            console.error(`[Retry Cron] Permanently failed after ${MAX_RETRY_COUNT} attempts: ${failedDeletion.r2_key}`)
          } else {
            // Update retry count and mark as pending for next run
            await supabase
              .from("failed_deletions")
              .update({
                status: "pending",
                retry_count: newRetryCount,
                reason: `${failedDeletion.reason} | Retry ${newRetryCount} failed: ${r2Result.error}`
              })
              .eq("id", failedDeletion.id)

            stillFailed++
            console.log(`[Retry Cron] Retry ${newRetryCount}/${MAX_RETRY_COUNT} failed for: ${failedDeletion.r2_key}`)
          }
        }
      } catch (err) {
        console.error(`[Retry Cron] Error processing failed deletion ${failedDeletion.id}:`, err)

        // Mark as pending for next retry
        await supabase
          .from("failed_deletions")
          .update({
            status: "pending",
            retry_count: failedDeletion.retry_count + 1
          })
          .eq("id", failedDeletion.id)

        stillFailed++
      }
    }

    const duration = Date.now() - startTime

    console.log(`[Retry Cron] Complete in ${duration}ms: ${resolved} resolved, ${stillFailed} still failing, ${permanentlyFailed} permanently failed`)

    return NextResponse.json({
      resolved,
      stillFailed,
      permanentlyFailed,
      message: `Processed ${failedDeletions.length} failed deletions`,
      duration: `${duration}ms`
    })
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[Retry Cron] Job error after ${duration}ms:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
