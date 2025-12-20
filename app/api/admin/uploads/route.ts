import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/admin-middleware"
import { deleteFromR2 } from "@/lib/r2/delete"

export const dynamic = "force-dynamic"

/**
 * GET /api/admin/uploads
 * Fetch all uploads with pagination, search, and sorting
 */
export async function GET(request: NextRequest) {
    // Check admin access
    const { allowed, response: authResponse } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get("page") || "1")
        const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100)
        const search = searchParams.get("search") || ""
        const sortBy = searchParams.get("sortBy") || "created_at"
        const sortOrder = searchParams.get("sortOrder") === "asc" ? true : false
        const status = searchParams.get("status") || "all"

        const offset = (page - 1) * limit

        const supabase = await createClient()

        // Build query
        let query = supabase
            .from("uploads")
            .select("*", { count: "exact" })

        // Apply status filter
        if (status !== "all") {
            query = query.eq("status", status)
        }

        // Apply search filter
        if (search) {
            query = query.or(`file_name.ilike.%${search}%,image_url.ilike.%${search}%`)
        }

        // Apply sorting and pagination
        query = query
            .order(sortBy, { ascending: sortOrder })
            .range(offset, offset + limit - 1)

        const { data: uploads, error, count } = await query

        if (error) {
            console.error("Error fetching uploads:", error)
            return NextResponse.json(
                { error: "Failed to fetch uploads" },
                { status: 500 }
            )
        }

        // Debug logging
        const anonymousCount = uploads?.filter(u => u.user_id === null).length || 0
        const userCount = uploads?.filter(u => u.user_id !== null).length || 0
        console.log(`[Admin API] Fetched ${uploads?.length || 0} uploads: ${anonymousCount} anonymous, ${userCount} registered users`)

        return NextResponse.json({
            uploads: uploads || [],
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit),
            },
        })
    } catch (error) {
        console.error("Admin uploads error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/admin/uploads
 * Bulk delete uploads by IDs
 */
export async function DELETE(request: NextRequest) {
    // Check admin access
    const { allowed, response: authResponse, userId } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        const body = await request.json()
        const { ids } = body as { ids: string[] }

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: "No upload IDs provided" },
                { status: 400 }
            )
        }

        // Limit bulk operations to 100 at a time
        if (ids.length > 100) {
            return NextResponse.json(
                { error: "Maximum 100 uploads can be deleted at once" },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // Fetch uploads to get R2 keys
        const { data: uploads, error: fetchError } = await supabase
            .from("uploads")
            .select("id, r2_key, file_name")
            .in("id", ids)

        if (fetchError) {
            console.error("Error fetching uploads for deletion:", fetchError)
            return NextResponse.json(
                { error: "Failed to fetch uploads" },
                { status: 500 }
            )
        }

        if (!uploads || uploads.length === 0) {
            return NextResponse.json(
                { error: "No uploads found with provided IDs" },
                { status: 404 }
            )
        }

        let deleted = 0
        let errors = 0
        const deletedIds: string[] = []
        const failedIds: string[] = []

        // Delete each upload
        for (const upload of uploads) {
            try {
                // Delete from R2
                const r2Success = await deleteFromR2(upload.r2_key)

                if (!r2Success) {
                    console.error(`Failed to delete ${upload.r2_key} from R2`)
                    errors++
                    failedIds.push(upload.id)
                    continue
                }

                // Delete from database
                const { error: deleteError } = await supabase
                    .from("uploads")
                    .delete()
                    .eq("id", upload.id)

                if (deleteError) {
                    console.error(`Failed to delete upload ${upload.id}:`, deleteError)
                    errors++
                    failedIds.push(upload.id)
                } else {
                    deleted++
                    deletedIds.push(upload.id)
                }
            } catch (err) {
                console.error(`Error deleting upload ${upload.id}:`, err)
                errors++
                failedIds.push(upload.id)
            }
        }

        // Log admin action
        console.log(`[Admin Action] User ${userId} deleted ${deleted} uploads`)

        return NextResponse.json({
            success: true,
            deleted,
            errors,
            deletedIds,
            failedIds,
            message: `Deleted ${deleted} uploads${errors > 0 ? `, ${errors} failed` : ""}`,
        })
    } catch (error) {
        console.error("Admin bulk delete error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
