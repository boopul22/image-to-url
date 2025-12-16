import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export interface AdminCheckResult {
    isAdmin: boolean
    user: { id: string; email: string } | null
    error?: string
}

/**
 * Check if the current user has admin privileges
 * Admin status is stored in user metadata as `is_admin: true`
 */
export async function checkAdminAccess(): Promise<AdminCheckResult> {
    try {
        const supabase = await createClient()

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
            return {
                isAdmin: false,
                user: null,
                error: "Not authenticated",
            }
        }

        // Check if user has admin role in metadata
        const isAdmin = user.user_metadata?.is_admin === true

        return {
            isAdmin,
            user: { id: user.id, email: user.email || "" },
            error: isAdmin ? undefined : "Not authorized as admin",
        }
    } catch (error) {
        console.error("Admin check error:", error)
        return {
            isAdmin: false,
            user: null,
            error: "Failed to verify admin status",
        }
    }
}

/**
 * Middleware-style function to protect admin API routes
 * Returns a NextResponse with 401/403 if not authorized
 */
export async function requireAdmin(): Promise<{
    allowed: boolean
    response?: NextResponse
    userId?: string
}> {
    const { isAdmin, user, error } = await checkAdminAccess()

    if (!user) {
        return {
            allowed: false,
            response: NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            ),
        }
    }

    if (!isAdmin) {
        return {
            allowed: false,
            response: NextResponse.json(
                { error: "Forbidden: Admin access required" },
                { status: 403 }
            ),
        }
    }

    return {
        allowed: true,
        userId: user.id,
    }
}
