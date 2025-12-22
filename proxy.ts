import { type NextRequest, NextResponse } from "next/server"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { updateSession } from "@/lib/supabase/middleware"

function getLocale(request: NextRequest): string {
  // Check if locale is in pathname
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameLocale) return pathnameLocale

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(",")[0].split("-")[0].toLowerCase()

    if (locales.includes(browserLocale)) {
      return browserLocale
    }
  }

  return defaultLocale
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Handle root path with rewrite (keeps URL as /) for better SEO
  if (pathname === '/') {
    const locale = getLocale(request)
    return NextResponse.rewrite(new URL(`/${locale}`, request.url))
  }

  // Handle other paths without locale - redirect to add locale prefix
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  // Update Supabase session
  const { supabaseResponse, user } = await updateSession(request)

  // Protect dashboard routes
  if (pathname.includes("/dashboard")) {
    if (!user) {
      const locale = pathname.split("/")[1] || defaultLocale
      const redirectUrl = new URL(`/${locale}/auth/login`, request.url)
      redirectUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
}
