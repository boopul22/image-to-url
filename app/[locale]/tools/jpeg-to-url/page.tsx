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
    const toolDict = dict.tools?.jpegToUrl

    return {
        title: toolDict?.meta?.title || "JPEG to URL Converter - Free Online Tool | ImageToURL",
        description: toolDict?.meta?.description || "Convert JPEG images to shareable URLs instantly. Free online JPEG to URL converter with no signup required. Upload JPEG files up to 10MB and get instant links.",
        keywords: toolDict?.meta?.keywords || "jpeg to url, jpeg image to url, convert jpeg to url, jpeg url converter, jpeg link generator, jpeg image to url converter, jpeg image hosting",
        alternates: {
            canonical: `/${locale}/tools/jpeg-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "JPEG to URL Converter - Free Online Tool",
            description: toolDict?.meta?.description || "Convert JPEG images to shareable URLs instantly.",
            url: `/${locale}/tools/jpeg-to-url`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "JPEG to URL Converter",
    subtitle: "Free Online JPEG Image Hosting",
    description: "Convert your JPEG images to shareable URLs instantly. JPEG is the most widely used image format for photographs. No signup required, just upload and share.",
    features: {
        title: "Why Use Our JPEG to URL Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Full support for JPEG format",
            "Files up to 10MB supported",
            "Instant shareable links",
            "Global CDN for fast delivery",
            "Preserve JPEG quality",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Convert JPEG to URL",
        steps: [
            {
                title: "Upload Your JPEG",
                description: "Drag and drop your JPEG file or click to browse. We accept JPEG files up to 10MB.",
            },
            {
                title: "Get Your URL",
                description: "Your JPEG image is instantly uploaded to our global CDN. A shareable URL is generated automatically.",
            },
            {
                title: "Share Anywhere",
                description: "Copy the URL and use it anywhere - websites, social media, emails, or documents.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert a JPEG image to a URL?",
                answer: "Simply drag and drop your JPEG file onto our upload zone or click to select a file. Your image will be instantly uploaded and you'll receive a shareable URL.",
            },
            {
                question: "What's the difference between JPEG and JPG?",
                answer: "JPEG and JPG are the same format - the only difference is the file extension. JPG is a shortened version due to old Windows limitations. Our converter supports both .jpeg and .jpg files.",
            },
            {
                question: "Is this JPEG to URL converter free?",
                answer: "Yes, our JPEG to URL converter is 100% free. You can upload JPEG images up to 10MB without creating an account.",
            },
            {
                question: "Will converting JPEG to URL reduce image quality?",
                answer: "No! We preserve the original quality of your JPEG images. The URL simply points to your hosted image without any recompression.",
            },
            {
                question: "Can I use the JPEG URL on my website?",
                answer: "Yes! The URLs we generate can be used anywhere - in HTML img tags, CSS backgrounds, social media, emails, and more.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
        ],
    },
    meta: {
        title: "JPEG to URL Converter - Free Online Tool | ImageToURL",
        description: "Convert JPEG images to shareable URLs instantly. Free online JPEG to URL converter with no signup required.",
        keywords: "jpeg to url, jpeg image to url, convert jpeg to url, jpeg url converter, jpeg link generator",
    },
}

export default async function JpegToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.jpegToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="JPEG to URL Converter"
                description="Convert JPEG images to shareable URLs instantly. Free online image hosting for JPEG format."
                url={`/${locale}/tools/jpeg-to-url`}
                featureList={[
                    "Free JPEG to URL conversion",
                    "No signup required",
                    "Full JPEG format support",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["jpeg to url", "jpeg image hosting", "convert jpeg to url", "jpeg link generator"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "JPEG to URL", url: `${BASE_URL}/${locale}/tools/jpeg-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
