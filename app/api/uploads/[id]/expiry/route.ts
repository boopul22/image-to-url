import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { custom_deletion_time } = body

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify ownership
    const { data: upload, error: fetchError } = await supabase
      .from("uploads")
      .select("user_id")
      .eq("id", id)
      .single()

    if (fetchError || !upload) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 })
    }

    if (upload.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update custom_deletion_time
    const { error: updateError } = await supabase
      .from("uploads")
      .update({ custom_deletion_time })
      .eq("id", id)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update expiry" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating expiry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
