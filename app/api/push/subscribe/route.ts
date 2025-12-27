import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOrCreateSessionId } from "@/lib/auth/session"

export async function POST(request: NextRequest) {
  try {
    const sessionId = await getOrCreateSessionId()
    const { subscription, userAgent } = await request.json()

    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return NextResponse.json(
        { error: "Invalid subscription data" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase.from("push_subscriptions").upsert(
      {
        session_id: sessionId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        user_agent: userAgent || null,
      },
      {
        onConflict: "endpoint",
      }
    )

    if (error) {
      console.error("Error saving subscription:", error)
      return NextResponse.json(
        { error: "Failed to save subscription" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
