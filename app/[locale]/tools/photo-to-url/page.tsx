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
    const toolDict = dict.tools?.photoToUrl

    return {
        title: toolDict?.meta?.title || "Photo to URL Converter - Free Online Photo Link Generator | ImageToURL",
        description: toolDict?.meta?.description || "Convert photos to shareable URLs instantly. Free online photo to URL converter - upload any photo and get an instant link. No signup required. Best free photo to link converter.",
        keywords: toolDict?.meta?.keywords || "photo to url, photo to url converter, photo url generator, photo link generator, convert photo to url, turn photo into url, photo to link, get photo url",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/photo-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Photo to URL Converter - Free Online Tool",
            description: toolDict?.meta?.description || "Convert photos to shareable URLs instantly.",
            url: `${BASE_URL}/${locale}/tools/photo-to-url`,
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
    title: "Photo to URL Converter",
    subtitle: "Free Online Photo Link Generator",
    description: "Convert your photos to shareable URLs instantly. Upload any photo and get a direct link that works anywhere - websites, social media, emails, messaging apps, and more.",
    features: {
        title: "Why Use Our Photo to URL Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support all photo formats (JPG, PNG, HEIC, WebP)",
            "Files up to 10MB supported",
            "Instant shareable links",
            "Global CDN for fast delivery worldwide",
            "99.9% uptime guarantee",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Convert a Photo to URL",
        steps: [
            {
                title: "Upload Your Photo",
                description: "Drag and drop your photo or click to browse. We support all popular photo formats including JPG, PNG, HEIC, and WebP.",
            },
            {
                title: "Get Your Photo URL",
                description: "Your photo is instantly uploaded to our global CDN. A shareable URL is generated automatically in seconds.",
            },
            {
                title: "Share Your Photo Link",
                description: "Copy the URL and use it anywhere - embed in websites, share on social media, or send via email and chat.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I get a URL for my photo?",
                answer: "Simply upload your photo using our converter. Your photo will be instantly uploaded to our cloud and you'll receive a shareable URL that you can copy and use anywhere.",
            },
            {
                question: "Is this photo to URL converter free?",
                answer: "Yes, our photo to URL converter is completely free. Upload photos up to 10MB without creating an account or paying anything.",
            },
            {
                question: "What is a photo URL?",
                answer: "A photo URL is a web address (link) that points directly to your photo hosted online. Anyone with the URL can view your photo in their browser.",
            },
            {
                question: "How do I turn a photo into a link?",
                answer: "Use our photo to URL converter - just upload your photo and we'll generate a shareable link instantly. No technical knowledge required.",
            },
            {
                question: "How do I create a photo URL for free?",
                answer: "Our service is 100% free. Simply drag and drop your photo, and you'll instantly get a shareable URL. No signup or payment required.",
            },
            {
                question: "Can I use the photo URL on social media?",
                answer: "Absolutely! The photo URLs we generate work on all social media platforms, websites, forums, and anywhere else that accepts image links.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG photos to URLs" },
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple photos at once" },
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
        title: "Photo to URL Converter - Free Online Photo Link Generator | ImageToURL",
        description: "Convert photos to shareable URLs instantly. Free online photo to URL converter with no signup required.",
        keywords: "photo to url, photo to url converter, photo url generator, photo link generator, turn photo into url",
    },
}

export default async function PhotoToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.photoToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Photo to URL Converter"
                description="Convert photos to shareable URLs instantly. Free online photo link generator."
                url={`/${locale}/tools/photo-to-url`}
                featureList={[
                    "Free photo to URL conversion",
                    "No signup required",
                    "Support all photo formats",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["photo to url", "photo link generator", "photo url generator", "turn photo into url"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Photo to URL", url: `${BASE_URL}/${locale}/tools/photo-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
