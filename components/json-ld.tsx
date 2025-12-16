import type { Locale } from '@/lib/i18n/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://imagetourl.cloud'

interface JsonLdProps {
    locale: Locale
    title: string
    description: string
}

// WebApplication Schema for the image hosting tool
export function WebApplicationJsonLd({ locale, title, description }: JsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description: description,
        url: `${BASE_URL}/${locale}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '2.0',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        featureList: [
            'Free image hosting',
            'No signup required',
            'Global CDN delivery',
            'Support for JPG, PNG, GIF, SVG, WebP',
            'Up to 10MB file size',
            'Instant shareable links',
            'Custom expiration times',
            '99.9% uptime guarantee',
        ],
        author: {
            '@type': 'Organization',
            name: 'ImageToURL',
            url: BASE_URL,
        },
        provider: {
            '@type': 'Organization',
            name: 'ImageToURL',
            url: BASE_URL,
        },
        inLanguage: locale,
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// Organization Schema for brand identity
export function OrganizationJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ImageToURL',
        alternateName: 'ImageToURL Cloud',
        url: BASE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/android-chrome-512x512.png`,
            width: 512,
            height: 512,
        },
        description: 'Free image hosting service that converts images to shareable URLs instantly. Powered by global CDN for fast, secure, and reliable image delivery.',
        foundingDate: '2023',
        sameAs: [
            // Add social media profiles here when available
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// WebSite Schema for site-level information
export function WebSiteJsonLd({ locale }: { locale: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ImageToURL',
        alternateName: 'Image to URL Converter',
        url: BASE_URL,
        inLanguage: locale,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/${locale}?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// Breadcrumb Schema for navigation
interface BreadcrumbItem {
    name: string
    url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// FAQ Schema for FAQ sections
interface FAQItem {
    question: string
    answer: string
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// SoftwareApplication Schema for tool pages
interface SoftwareApplicationProps {
    locale: string
    name: string
    description: string
    url: string
    featureList: string[]
    keywords?: string[]
}

export function SoftwareApplicationJsonLd({
    locale,
    name,
    description,
    url,
    featureList,
    keywords,
}: SoftwareApplicationProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: name,
        description: description,
        url: `${BASE_URL}${url}`,
        applicationCategory: 'UtilitiesApplication',
        applicationSubCategory: 'Image Converter',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        featureList: featureList,
        keywords: keywords?.join(', '),
        author: {
            '@type': 'Organization',
            name: 'ImageToURL',
            url: BASE_URL,
        },
        provider: {
            '@type': 'Organization',
            name: 'ImageToURL',
            url: BASE_URL,
        },
        inLanguage: locale,
        isAccessibleForFree: true,
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// HowTo Schema for use-case pages
interface HowToStep {
    name: string
    text: string
}

export function HowToJsonLd({
    name,
    description,
    steps,
}: {
    name: string
    description: string
    steps: HowToStep[]
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: name,
        description: description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
