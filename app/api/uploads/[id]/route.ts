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

    // Delete from R2 - MUST succeed before deleting from database
    const r2Success = await deleteFromR2(upload.r2_key)

    if (!r2Success) {
      console.error(`[Delete] R2 deletion failed for upload ${id}, r2_key: ${upload.r2_key}`)
      return NextResponse.json(
        { error: "Failed to delete file from storage. Please try again." },
        { status: 500 }
      )
    }

    // Delete from database only after R2 deletion succeeds
    const { error: deleteError } = await supabase.from("uploads").delete().eq("id", id)

    if (deleteError) {
      // R2 file is already deleted, log this orphan situation
      console.error(`[Delete] Database deletion failed for upload ${id} after R2 success:`, deleteError)
      return NextResponse.json({ error: "Failed to delete upload record" }, { status: 500 })
    }

    console.log(`[Delete] Successfully deleted upload ${id} from R2 and database`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting upload:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
