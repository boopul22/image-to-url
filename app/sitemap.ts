import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/lib/i18n/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://imagetourl.cloud'

// Define all public routes that should be indexed
const publicRoutes = [
    '', // Homepage
    // Tool pages
    '/tools/jpg-to-url',
    '/tools/jpeg-to-url',
    '/tools/png-to-url',
    '/tools/gif-to-url',
    '/tools/svg-to-url',
    '/tools/webp-to-url',
    '/tools/base64-to-url',
    '/tools/bulk-upload',
    '/tools/qr-to-url',
    '/tools/image-link-generator',
    '/tools/free-image-hosting',
    // Platform use case pages
    '/use-cases/discord',
    '/use-cases/telegram',
    '/use-cases/html',
    '/use-cases/fantasy-sports',
    '/use-cases/espn-fantasy',
    '/use-cases/minecraft',
    '/use-cases/roblox',
    '/use-cases/vrchat',
    // Developer use case pages
    '/use-cases/javascript',
    '/use-cases/python',
    '/use-cases/react',
    '/use-cases/nodejs',
    // Info pages
    '/about',
    '/pricing',
    '/privacy',
    '/terms',
    '/cookies',
]

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = []

    // Generate entries for each route and locale
    for (const route of publicRoutes) {
        for (const locale of locales) {
            const url = `${BASE_URL}/${locale}${route}`

            // Create language alternates for this route
            const languages: Record<string, string> = {}
            for (const altLocale of locales) {
                languages[altLocale] = `${BASE_URL}/${altLocale}${route}`
            }
            // Add x-default pointing to default locale
            languages['x-default'] = `${BASE_URL}/${defaultLocale}${route}`

            entries.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: locale === defaultLocale ? 1.0 : 0.8,
                alternates: {
                    languages,
                },
            })
        }
    }

    return entries
}
