import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { ToolPageTemplate } from "@/components/tool-page-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imagetourl.cloud"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.imageToShortUrl || defaultToolContent

    return {
        title: toolDict?.meta?.title || "Image to Short URL - Create Compact Shareable Links | ImageToURL",
        description: toolDict?.meta?.description || "Convert your images to short, compact URLs. Get tiny shareable links that are perfect for social media, SMS, and more. Free online tool.",
        keywords: toolDict?.meta?.keywords || "image to short url, short url generator, image short link, compact image url, tiny image url",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/image-to-short-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Image to Short URL - Create Compact Shareable Links",
            description: toolDict?.meta?.description || "Convert your images to short, compact URLs instantly.",
            url: `${BASE_URL}/${locale}/tools/image-to-short-url`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          alt: "ImageToURL - Free Image Hosting",
        },
      ],
        },
    }
}

const defaultToolContent = {
    title: "Image to Short URL",
    subtitle: "Create Compact Shareable Links",
    description: "Convert your images to short, compact URLs that are easy to share. Perfect for social media, SMS, emails, and anywhere character count matters.",
    introduction: {
        title: "When Every Character Counts",
        paragraphs: [
            "Some contexts demand brevity. Twitter bios have character limits. SMS messages get split if too long. Business cards have limited space. QR codes get harder to scan as URLs get longer. Our short URL generator creates compact links that fit anywhere.",
            "A typical image URL might be 60-100 characters. Our short URLs are under 30. That's the difference between a tweet with room for commentary and one that's just a link. Between a QR code that scans reliably at small sizes and one that fails. Between easy-to-type and error-prone.",
            "Short URLs aren't just about saving space—they're about making images more shareable. People are more likely to share a link they can actually type if needed. More likely to trust a clean, short URL than a long, cryptic one. More likely to fit your image into their message without sacrificing their own words.",
        ],
    },
    features: {
        title: "Why Use Short Image URLs?",
        items: [
            "Compact URLs under 30 characters",
            "Perfect for Twitter/X and SMS",
            "Easy to remember and type",
            "No expiration on short links",
            "Click tracking and analytics",
            "Custom short codes available",
            "QR code generation included",
            "Works with all image formats",
        ],
    },
    howItWorks: {
        title: "How to Get a Short Image URL",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop any image file or click to browse. We support JPG, PNG, GIF, WebP, and more.",
            },
            {
                title: "Get Short URL",
                description: "Your image is uploaded and a compact short URL is generated automatically. Much shorter than regular URLs!",
            },
            {
                title: "Share Anywhere",
                description: "Use your short URL in tweets, text messages, QR codes, or anywhere space is limited.",
            },
        ],
    },
    useCases: {
        title: "Perfect For Short URLs",
        items: [
            { title: "Twitter/X Posts", description: "Maximize your tweet content by using compact image links that leave room for your message." },
            { title: "SMS Marketing", description: "Keep text messages under character limits while still including visual content." },
            { title: "Business Cards", description: "Print QR codes that link to portfolios or headshots with URLs short enough to type manually." },
            { title: "Podcast Show Notes", description: "Include easy-to-read image links that listeners can type without errors." },
            { title: "Print Materials", description: "Add short URLs to flyers, posters, and brochures that people can easily enter in browsers." },
            { title: "Verbal Sharing", description: "Share image links verbally in podcasts, videos, or presentations." },
        ],
    },
    tips: {
        title: "Short URL Best Practices",
        items: [
            "Sign in to create custom short codes that match your brand or content.",
            "Use click tracking to measure engagement on shared short URLs.",
            "Test short URLs before printing on physical materials—typos are expensive to fix.",
            "Combine short URLs with QR codes for the best of both worlds.",
            "For mission-critical links, sign in to ensure they never expire.",
            "Check analytics regularly to understand which shared images get the most engagement.",
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How short are the generated URLs?",
                answer: "Our short URLs are typically under 30 characters, making them perfect for platforms with character limits like Twitter/X or SMS messages.",
            },
            {
                question: "Do short URLs expire?",
                answer: "Short URLs for signed-in users never expire. Anonymous short URLs remain active for 30 days.",
            },
            {
                question: "Can I customize my short URL?",
                answer: "Yes! Signed-in users can create custom short codes for their images, making URLs even more memorable.",
            },
            {
                question: "Is there click tracking?",
                answer: "Yes, all short URLs include basic analytics so you can see how many times your image has been viewed.",
            },
            {
                question: "What image formats are supported?",
                answer: "We support all major image formats including JPG, PNG, GIF, WebP, SVG, and more.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate standard image links" },
            { name: "QR Code Generator", href: "/tools/url-to-qr-code", description: "Create QR codes from URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/image-optimization", description: "Google's guide to optimizing images for the web" },
            { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
            { name: "Cloudflare: What is a CDN?", href: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", description: "Understanding content delivery networks" },
        ],
    },
    meta: {
        title: "Image to Short URL - Create Compact Shareable Links | ImageToURL",
        description: "Convert your images to short, compact URLs. Get tiny shareable links perfect for social media and SMS.",
        keywords: "image to short url, short url generator, image short link, compact image url",
    },
}

export default async function ImageToShortUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.imageToShortUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Image to Short URL"
                description="Convert images to compact, shareable short URLs. Free online tool for creating tiny image links."
                url={`/${locale}/tools/image-to-short-url`}
                featureList={[
                    "Short URL generation",
                    "Compact links under 30 chars",
                    "Click tracking",
                    "Custom short codes",
                    "No expiration",
                    "All image formats supported",
                ]}
                keywords={["image to short url", "short url generator", "image short link", "tiny url"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Image to Short URL", url: `${BASE_URL}/${locale}/tools/image-to-short-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
