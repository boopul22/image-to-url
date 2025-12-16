import { createClient } from "@/lib/supabase/server"

const MAX_ANONYMOUS_UPLOADS = 5

export interface UploadLimitStatus {
  allowed: boolean
  count: number
  remaining: number
  limit: number
}

export async function checkAnonymousUploadLimit(sessionId: string): Promise<UploadLimitStatus> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("anonymous_upload_tracking")
    .select("upload_count")
    .eq("session_id", sessionId)
    .single()

  const currentCount = error || !data ? 0 : data.upload_count || 0
  const remaining = Math.max(0, MAX_ANONYMOUS_UPLOADS - currentCount)
  const allowed = currentCount < MAX_ANONYMOUS_UPLOADS

  return {
    allowed,
    count: currentCount,
    remaining,
    limit: MAX_ANONYMOUS_UPLOADS,
  }
}

export async function incrementAnonymousUploadCount(sessionId: string): Promise<void> {
  const supabase = await createClient()

  const { data } = await supabase
    .from("anonymous_upload_tracking")
    .select("id, upload_count")
    .eq("session_id", sessionId)
    .single()

  if (data) {
    await supabase
      .from("anonymous_upload_tracking")
      .update({
        upload_count: (data.upload_count || 0) + 1,
        last_upload_at: new Date().toISOString(),
      })
      .eq("session_id", sessionId)
  } else {
    await supabase.from("anonymous_upload_tracking").insert({
      session_id: sessionId,
      upload_count: 1,
    })
  }
}
