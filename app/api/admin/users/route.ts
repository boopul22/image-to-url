import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/admin-middleware"

export const dynamic = "force-dynamic"

/**
 * GET /api/admin/users
 * Fetch list of users who have uploads (for filter dropdown)
 */
export async function GET() {
    // Check admin access
    const { allowed, response: authResponse } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        // Regular client - admin can see all uploads via RLS policy
        const supabase = await createClient()

        // Get unique user IDs from uploads table
        const { data: uploads, error: uploadsError } = await supabase
            .from("uploads")
            .select("user_id")
            .not("user_id", "is", null)

        if (uploadsError) {
            console.error("Error fetching user IDs:", uploadsError)
            return NextResponse.json(
                { error: "Failed to fetch users" },
                { status: 500 }
            )
        }

        // Get unique user IDs
        const userIds = [...new Set(uploads?.map(u => u.user_id).filter(Boolean))]

        // Return users with just IDs (short version for display)
        const users = userIds.map((id, index) => ({
            id: id,
            email: `User ${index + 1} (${id?.slice(0, 8)}...)`
        }))

        return NextResponse.json({ users })
    } catch (error) {
        console.error("Admin users error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
