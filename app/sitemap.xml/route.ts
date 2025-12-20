import { NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/config'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://imagetourl.cloud'

// Protected routes that should be excluded from the sitemap
const EXCLUDED_ROUTES = ['/admin', '/auth', '/dashboard']

function isPublicRoute(route: string): boolean {
    for (const excluded of EXCLUDED_ROUTES) {
        if (route === excluded || route.startsWith(excluded + '/')) {
            return false
        }
    }
    return true
}

function pathToRoute(dirPath: string, baseDir: string): string {
    const relativePath = path.relative(baseDir, dirPath)
    if (!relativePath || relativePath === '.') {
        return ''
    }
    return '/' + relativePath.split(path.sep).join('/')
}

function walkDirectory(dir: string, baseDir: string): string[] {
    const routes: string[] = []
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
        if (entry.name.startsWith('.')) continue

        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            routes.push(...walkDirectory(fullPath, baseDir))
        } else if (entry.name === 'page.tsx') {
            const route = pathToRoute(dir, baseDir)
            routes.push(route)
        }
    }

    return routes
}

function scanPublicRoutes(baseDir: string): string[] {
    if (!fs.existsSync(baseDir)) {
        throw new Error(`Directory not found: ${baseDir}`)
    }

    const allRoutes = walkDirectory(baseDir, baseDir)
    const publicRoutes = allRoutes.filter(isPublicRoute)
    publicRoutes.sort()

    return publicRoutes
}

const publicRoutes = scanPublicRoutes(
    path.join(process.cwd(), 'app', '[locale]')
)

export async function GET() {
    const urls: string[] = []

    // Generate entries for each route and locale
    for (const route of publicRoutes) {
        for (const locale of locales) {
            const url = `${BASE_URL}/${locale}${route}`
            const priority = locale === defaultLocale ? 1.0 : 0.8
            const changefreq = 'weekly'
            const lastmod = new Date().toISOString()

            // Create language alternates
            const alternates = locales.map(altLocale =>
                `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${BASE_URL}/${altLocale}${route}" />`
            ).join('\n')

            urls.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${defaultLocale}${route}" />
  </url>`)
        }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
