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
    const toolDict = dict.tools?.convertImageToLink

    return {
        title: toolDict?.meta?.title || "Convert Image to Link - Free Image to URL Converter Online | ImageToURL",
        description: toolDict?.meta?.description || "Convert any image to a shareable link instantly. Free online tool to convert images to URLs. No signup required. Best image to link converter online.",
        keywords: toolDict?.meta?.keywords || "convert image to link, image to link, convert image to url, image convert to link, image to link converter, image converter to link, make image into link",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/convert-image-to-link`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Convert Image to Link - Free Online Tool",
            description: toolDict?.meta?.description || "Convert any image to a shareable link instantly.",
            url: `/${locale}/tools/convert-image-to-link`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Convert Image to Link",
    subtitle: "Free Online Image to URL Converter",
    description: "Convert any image to a shareable link in seconds. Upload JPG, PNG, GIF, or any image format and get an instant URL that works everywhere.",
    features: {
        title: "Why Use Our Image to Link Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support all image formats (JPG, PNG, GIF, WebP, SVG)",
            "Files up to 10MB supported",
            "Instant link generation",
            "Global CDN for fast delivery worldwide",
            "99.9% uptime guarantee",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Convert an Image to a Link",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop your image or click to browse. We support all popular formats including JPG, PNG, GIF, WebP, and SVG.",
            },
            {
                title: "Image is Converted",
                description: "Your image is instantly uploaded to our global CDN. A direct link is generated automatically in seconds.",
            },
            {
                title: "Copy & Share Your Link",
                description: "Copy the generated link and use it anywhere - websites, social media, emails, documents, and more.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert an image to a link?",
                answer: "Simply upload your image using our converter. Your image will be hosted on our cloud, and you'll receive a shareable link that you can copy and use anywhere.",
            },
            {
                question: "Is this image to link converter free?",
                answer: "Yes, our service is completely free. Convert any image to a link without creating an account or paying anything.",
            },
            {
                question: "What does converting an image to a link mean?",
                answer: "When you convert an image to a link, we host your image on our servers and give you a URL (web address) that points to it. Anyone can view your image using this link.",
            },
            {
                question: "How do I make an image into a link?",
                answer: "Use our image to link converter - just upload your image and we'll generate a shareable link instantly. It's fast, free, and requires no technical knowledge.",
            },
            {
                question: "Can I use the image link on my website?",
                answer: "Absolutely! The links we generate are direct image URLs that work perfectly in HTML img tags, CSS, Markdown, and anywhere else that accepts image URLs.",
            },
            {
                question: "How long does the image link stay active?",
                answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep your images indefinitely and manage when they expire.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate image links" },
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG to URLs" },
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG to URLs" },
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
        title: "Convert Image to Link - Free Image to URL Converter Online | ImageToURL",
        description: "Convert any image to a shareable link instantly. Free online image to link converter with no signup.",
        keywords: "convert image to link, image to link, image convert to link, image to link converter",
    },
}

export default async function ConvertImageToLinkPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.convertImageToLink || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Convert Image to Link"
                description="Convert any image to a shareable link instantly. Free online image to URL converter."
                url={`/${locale}/tools/convert-image-to-link`}
                featureList={[
                    "Free image to link conversion",
                    "No signup required",
                    "Support all image formats",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["convert image to link", "image to link", "image converter to link", "make image into link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Convert Image to Link", url: `${BASE_URL}/${locale}/tools/convert-image-to-link` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
