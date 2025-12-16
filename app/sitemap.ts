import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/lib/i18n/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://imagetourl.cloud'

// Define all public routes that should be indexed
const publicRoutes = [
    '', // Homepage
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
