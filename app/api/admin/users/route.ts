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

        // Fallback: derive users from uploads table using stored user_email
        console.warn("[Admin Users] SUPABASE_SERVICE_ROLE_KEY not set — falling back to uploads table for user list")
        const supabase = await createClient()
        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase environment variables not configured" },
                { status: 500 }
            )
        }

        const { data: uploads, error: uploadsError } = await supabase
            .from("uploads")
            .select("user_id, user_email")
            .not("user_id", "is", null) as { data: { user_id: string; user_email: string | null }[] | null; error: unknown }

        if (uploadsError) {
            console.error("Error fetching user IDs:", uploadsError)
            return NextResponse.json(
                { error: "Failed to fetch users" },
                { status: 500 }
            )
        }

        // Deduplicate by user_id, prefer rows that have an email
        const userMap = new Map<string, string>()
        for (const u of uploads || []) {
            if (u.user_id && !userMap.has(u.user_id)) {
                userMap.set(u.user_id, u.user_email || `User (${String(u.user_id).slice(0, 8)}...)`)
            } else if (u.user_id && u.user_email && !userMap.get(u.user_id)?.includes("@")) {
                // Upgrade from fallback label to real email if found
                userMap.set(u.user_id, u.user_email)
            }
        }

        const users = Array.from(userMap.entries()).map(([id, email]) => ({
            id,
            email,
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
