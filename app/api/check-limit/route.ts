import { NextResponse } from "next/server"
import { getOrCreateSessionId } from "@/lib/auth/session"
import { checkAnonymousUploadLimit } from "@/lib/auth/upload-limiter"
import { createClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Authenticated users have unlimited uploads
    if (user) {
      return NextResponse.json({
        allowed: true,
        count: 0,
        remaining: 999,
        limit: 999,
        authenticated: true,
      })
    }

    // Check anonymous upload limit
    const sessionId = await getOrCreateSessionId()
    const status = await checkAnonymousUploadLimit(sessionId)

    return NextResponse.json({
      ...status,
      authenticated: false,
    })
  } catch (error) {
    console.error("Error checking upload limit:", error)
    return NextResponse.json({ error: "Failed to check upload limit" }, { status: 500 })
  }
}
