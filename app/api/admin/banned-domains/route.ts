import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/admin-middleware"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * GET /api/admin/banned-domains
 * List all banned email domains
 */
export async function GET() {
    const { allowed, response: authResponse } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        const supabase = createAdminClient()
        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase environment variables not configured" },
                { status: 500 }
            )
        }

        const { data, error } = await supabase
            .from("banned_email_domains")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching banned domains:", error)
            // If table doesn't exist yet, return empty list
            if (error.code === "42P01") {
                return NextResponse.json({ domains: [] })
            }
            return NextResponse.json(
                { error: `Failed to fetch banned domains: ${error.message}` },
                { status: 500 }
            )
        }

        return NextResponse.json({ domains: data })
    } catch (error) {
        console.error("Admin banned domains error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

/**
 * POST /api/admin/banned-domains
 * Add a new banned email domain
 */
export async function POST(request: NextRequest) {
    const { allowed, response: authResponse, userId } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        const body = await request.json()
        const { domain, reason } = body as { domain: string; reason?: string }

        if (!domain || typeof domain !== "string") {
            return NextResponse.json(
                { error: "Domain is required" },
                { status: 400 }
            )
        }

        // Normalize and validate domain format
        const normalizedDomain = domain.trim().toLowerCase()
        const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/
        if (!domainRegex.test(normalizedDomain)) {
            return NextResponse.json(
                { error: "Invalid domain format. Example: tempmail.com" },
                { status: 400 }
            )
        }

        const supabase = createAdminClient()
        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase environment variables not configured" },
                { status: 500 }
            )
        }

        const { data, error } = await supabase
            .from("banned_email_domains")
            .insert({
                domain: normalizedDomain,
                reason: reason || null,
                created_by: userId || null,
            })
            .select()
            .single()

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json(
                    { error: "This domain is already banned" },
                    { status: 409 }
                )
            }
            console.error("Error adding banned domain:", error)
            return NextResponse.json(
                { error: `Failed to add banned domain: ${error.message}` },
                { status: 500 }
            )
        }

        console.log(`[Admin Action] User ${userId} banned domain: ${normalizedDomain}`)
        return NextResponse.json({ domain: data }, { status: 201 })
    } catch (error) {
        console.error("Admin add banned domain error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/admin/banned-domains
 * Remove a banned domain by ID
 */
export async function DELETE(request: NextRequest) {
    const { allowed, response: authResponse, userId } = await requireAdmin()
    if (!allowed) return authResponse

    try {
        const body = await request.json()
        const { id } = body as { id: string }

        if (!id || typeof id !== "string") {
            return NextResponse.json(
                { error: "Domain ID is required" },
                { status: 400 }
            )
        }

        const supabase = createAdminClient()
        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase environment variables not configured" },
                { status: 500 }
            )
        }

        const { data, error } = await supabase
            .from("banned_email_domains")
            .delete()
            .eq("id", id)
            .select()
            .single()

        if (error) {
            console.error("Error deleting banned domain:", error)
            return NextResponse.json(
                { error: `Failed to delete banned domain: ${error.message}` },
                { status: 500 }
            )
        }

        if (!data) {
            return NextResponse.json(
                { error: "Domain not found" },
                { status: 404 }
            )
        }

        console.log(`[Admin Action] User ${userId} unbanned domain: ${data.domain}`)
        return NextResponse.json({ success: true, domain: data })
    } catch (error) {
        console.error("Admin delete banned domain error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
