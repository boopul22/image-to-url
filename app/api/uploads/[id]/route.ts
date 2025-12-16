import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { deleteFromR2 } from "@/lib/r2/delete"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get upload to verify ownership and get R2 key
    const { data: upload, error: fetchError } = await supabase
      .from("uploads")
      .select("user_id, r2_key")
      .eq("id", id)
      .single()

    if (fetchError || !upload) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 })
    }

    if (upload.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Delete from R2
    await deleteFromR2(upload.r2_key)

    // Delete from database
    const { error: deleteError } = await supabase.from("uploads").delete().eq("id", id)

    if (deleteError) {
      return NextResponse.json({ error: "Failed to delete upload" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting upload:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
