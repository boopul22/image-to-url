import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * POST /api/auth/check-domain
 * Public endpoint: checks if an email's domain is banned
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = body as { email: string }

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            )
        }

        // Extract domain from email
        const atIndex = email.lastIndexOf("@")
        if (atIndex === -1) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        const domain = email.slice(atIndex + 1).toLowerCase().trim()

        if (!domain) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        const supabase = createAdminClient()
        if (!supabase) {
            // If admin client isn't configured, allow by default
            return NextResponse.json({ allowed: true })
        }

        const { data, error } = await supabase
            .from("banned_email_domains")
            .select("id")
            .eq("domain", domain)
            .maybeSingle()

        if (error) {
            console.error("Error checking banned domain:", error)
            // On error, allow signup to avoid blocking legitimate users
            return NextResponse.json({ allowed: true })
        }

        if (data) {
            return NextResponse.json({
                allowed: false,
                message: "Registration with this email domain is not allowed.",
            })
        }

        return NextResponse.json({ allowed: true })
    } catch (error) {
        console.error("Check domain error:", error)
        // On error, allow signup to avoid blocking legitimate users
        return NextResponse.json({ allowed: true })
    }
}
