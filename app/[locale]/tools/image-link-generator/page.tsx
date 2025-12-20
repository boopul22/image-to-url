import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { ToolPageTemplate } from "@/components/tool-page-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imagetourl.cloud"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.imageLinkGenerator

    return {
        title: toolDict?.meta?.title || "Image Link Generator - Free Photo URL Creator | ImageToURL",
        description: toolDict?.meta?.description || "Generate shareable image links instantly. Free image link generator - upload any photo and create a URL. No signup required. Best free image to link converter online.",
        keywords: toolDict?.meta?.keywords || "image link generator, photo link generator, create image link, image to link, generate image url, free image link, photo url generator, image url creator, image to link generator free",
        alternates: {
            canonical: `/${locale}/tools/image-link-generator`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Image Link Generator - Free Photo URL Creator",
            description: toolDict?.meta?.description || "Generate shareable image links instantly. Free online tool.",
            url: `/${locale}/tools/image-link-generator`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Image Link Generator",
    subtitle: "Create Shareable Photo URLs Instantly",
    description: "Generate shareable links for any image in seconds. Upload your photo and get an instant URL that works anywhere - websites, social media, emails, and more.",
    features: {
        title: "Why Use Our Image Link Generator?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support all image formats (JPG, PNG, GIF, WebP, SVG)",
            "Files up to 10MB supported",
            "Instant link generation",
            "Global CDN for fast delivery worldwide",
            "Links work everywhere",
            "Secure HTTPS URLs",
        ],
    },
    howItWorks: {
        title: "How to Generate an Image Link",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop any image or click to browse. We support JPG, PNG, GIF, WebP, and SVG files up to 10MB.",
            },
            {
                title: "Get Your Link",
                description: "Your image is instantly uploaded to our global CDN. A shareable link is generated automatically in seconds.",
            },
            {
                title: "Use It Anywhere",
                description: "Copy the link and paste it wherever you need - HTML, Markdown, social media, emails, or documents.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I create a link for my image?",
                answer: "Simply upload your image using our tool. Once uploaded, you'll instantly receive a shareable URL that you can copy and use anywhere.",
            },
            {
                question: "Is the image link generator free?",
                answer: "Yes, our image link generator is completely free. Upload any image up to 10MB and get an instant shareable link without creating an account.",
            },
            {
                question: "What image formats can I generate links for?",
                answer: "Our generator supports all popular formats including JPG, JPEG, PNG, GIF, WebP, and SVG. Each file can be up to 10MB.",
            },
            {
                question: "Can I use generated links on my website?",
                answer: "Absolutely! The links are direct image URLs that work perfectly in HTML img tags, CSS, Markdown, and anywhere else that accepts image URLs.",
            },
            {
                question: "How long do the image links stay active?",
                answer: "Anonymous uploads stay active for 30 days. Sign in for free to keep your links permanently and manage expiration times.",
            },
            {
                question: "Can I generate links for multiple images at once?",
                answer: "Yes! Check out our Bulk Upload tool to generate links for multiple images simultaneously. Perfect for batch image hosting.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Generate links for multiple images" },
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
        ],
    },
    meta: {
        title: "Image Link Generator - Free Photo URL Creator | ImageToURL",
        description: "Generate shareable image links instantly. Free online image link generator with no signup required.",
        keywords: "image link generator, photo link generator, create image link, image to link, generate image url",
    },
}

export default async function ImageLinkGeneratorPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.imageLinkGenerator || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Image Link Generator"
                description="Generate shareable image links instantly. Free online photo URL creator."
                url={`/${locale}/tools/image-link-generator`}
                featureList={[
                    "Free image link generation",
                    "No signup required",
                    "Support all image formats",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["image link generator", "photo link generator", "create image link", "image to link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Image Link Generator", url: `${BASE_URL}/${locale}/tools/image-link-generator` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
