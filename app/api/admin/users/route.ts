import { NextResponse } from "next/server"
import { createAdminClient, createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/admin-middleware"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * GET /api/admin/users
 * Fetch list of users who have uploads (for filter dropdown)
 */
export async function GET() {
    // Check admin access
    const { allowed, response: authResponse } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        // Prefer admin client to list all registered users (requires service role key)
        const admin = createAdminClient()
        if (admin) {
            const perPage = 1000
            let page = 1
            const allUsers: { id: string; email?: string | null; phone?: string | null }[] = []

            while (true) {
                const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
                if (error) {
                    console.error("Error listing users via admin API:", error)
                    return NextResponse.json(
                        { error: "Failed to fetch users" },
                        { status: 500 }
                    )
                }

                const users = data?.users || []
                allUsers.push(...users)

                if (users.length < perPage) break
                page += 1
            }

            const users = allUsers.map((user, index) => ({
                id: user.id,
                email: user.email || user.phone || `User ${index + 1} (${user.id.slice(0, 8)}...)`,
            }))

            return NextResponse.json({ users })
        }

        // Fallback: derive users from uploads table if admin client isn't configured
        const supabase = await createClient()
        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase environment variables not configured" },
                { status: 500 }
            )
        }

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

        const userIds = [...new Set(uploads?.map((u) => u.user_id).filter(Boolean))]

        const users = userIds.map((id, index) => ({
            id: id as string,
            email: `User ${index + 1} (${String(id).slice(0, 8)}...)`,
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
