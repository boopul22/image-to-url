import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/admin-middleware"

export const dynamic = "force-dynamic"

/**
 * GET /api/admin/stats
 * Fetch admin statistics
 */
export async function GET() {
    // Check admin access
    const { allowed, response: authResponse } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        const supabase = await createClient()

        // Get total uploads count
        const { count: totalUploads, error: uploadsError } = await supabase
            .from("uploads")
            .select("*", { count: "exact", head: true })

        if (uploadsError) {
            console.error("Error fetching uploads count:", uploadsError)
        }

        // Get active uploads count
        const { count: activeUploads, error: activeError } = await supabase
            .from("uploads")
            .select("*", { count: "exact", head: true })
            .eq("status", "active")

        if (activeError) {
            console.error("Error fetching active uploads count:", activeError)
        }

        // Get total storage used (sum of file sizes)
        const { data: storageData, error: storageError } = await supabase
            .from("uploads")
            .select("file_size")

        let totalStorage = 0
        if (!storageError && storageData) {
            totalStorage = storageData.reduce((acc, upload) => acc + (upload.file_size || 0), 0)
        }

        // Get unique users count (users who uploaded)
        const { data: usersData, error: usersError } = await supabase
            .from("uploads")
            .select("user_id")
            .not("user_id", "is", null)

        let uniqueUsers = 0
        if (!usersError && usersData) {
            const userIds = new Set(usersData.map((u) => u.user_id))
            uniqueUsers = userIds.size
        }

        // Get anonymous uploads count
        const { count: anonymousUploads, error: anonError } = await supabase
            .from("uploads")
            .select("*", { count: "exact", head: true })
            .is("user_id", null)

        if (anonError) {
            console.error("Error fetching anonymous uploads count:", anonError)
        }

        // Get uploads by file type
        const { data: typeData, error: typeError } = await supabase
            .from("uploads")
            .select("file_type")

        const uploadsByType: Record<string, number> = {}
        if (!typeError && typeData) {
            typeData.forEach((upload) => {
                const type = upload.file_type || "unknown"
                uploadsByType[type] = (uploadsByType[type] || 0) + 1
            })
        }

        // Get recent uploads (last 24 hours)
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)

        const { count: recentUploads, error: recentError } = await supabase
            .from("uploads")
            .select("*", { count: "exact", head: true })
            .gte("created_at", oneDayAgo.toISOString())

        if (recentError) {
            console.error("Error fetching recent uploads count:", recentError)
        }

        return NextResponse.json({
            totalUploads: totalUploads || 0,
            activeUploads: activeUploads || 0,
            totalStorage,
            uniqueUsers,
            anonymousUploads: anonymousUploads || 0,
            recentUploads: recentUploads || 0,
            uploadsByType,
        })
    } catch (error) {
        console.error("Admin stats error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
