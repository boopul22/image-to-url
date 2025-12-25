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
    const toolDict = dict.tools?.webpToUrl

    return {
        title: toolDict?.meta?.title || "WebP to URL Converter - Free Online Tool | ImageToURL",
        description: toolDict?.meta?.description || "Convert WebP images to shareable URLs instantly. Free online WebP to URL converter with no signup required. Upload WebP files up to 10MB and get instant links.",
        keywords: toolDict?.meta?.keywords || "webp to url, webp image to url, convert webp to url, webp url converter, webp link generator, image url to webp, webp image hosting",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/webp-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "WebP to URL Converter - Free Online Tool",
            description: toolDict?.meta?.description || "Convert WebP images to shareable URLs instantly.",
            url: `/${locale}/tools/webp-to-url`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "WebP to URL Converter",
    subtitle: "Free Online WebP Image Hosting",
    description: "Convert your WebP images to shareable URLs instantly. WebP offers superior compression for faster loading times. No signup required, just upload and share.",
    features: {
        title: "Why Use Our WebP to URL Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Full support for WebP format",
            "Files up to 10MB supported",
            "Instant shareable links",
            "Global CDN for fast delivery",
            "Preserve WebP quality and transparency",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Convert WebP to URL",
        steps: [
            {
                title: "Upload Your WebP",
                description: "Drag and drop your WebP file or click to browse. We accept WebP files up to 10MB with full quality preservation.",
            },
            {
                title: "Get Your URL",
                description: "Your WebP image is instantly uploaded to our global CDN. A shareable URL is generated automatically.",
            },
            {
                title: "Share Anywhere",
                description: "Copy the URL and use it anywhere - websites, social media, emails, or documents. WebP delivers faster loading.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert a WebP image to a URL?",
                answer: "Simply drag and drop your WebP file onto our upload zone or click to select a file. Your image will be instantly uploaded and you'll receive a shareable URL.",
            },
            {
                question: "What are the benefits of WebP format?",
                answer: "WebP offers 25-35% smaller file sizes compared to JPEG and PNG while maintaining similar quality. This means faster loading times for websites and lower bandwidth usage.",
            },
            {
                question: "Is this WebP to URL converter free?",
                answer: "Yes, our WebP to URL converter is 100% free. You can upload WebP images up to 10MB without creating an account.",
            },
            {
                question: "Does the WebP URL preserve transparency?",
                answer: "Yes! Unlike JPEG, WebP supports transparency. Our converter preserves all WebP features including transparency and animation.",
            },
            {
                question: "Can I use WebP URLs on older browsers?",
                answer: "While WebP is supported by all modern browsers, some older browsers may not display it. Consider also hosting a JPG or PNG version for maximum compatibility.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "WebP Format - Wikipedia", href: "https://en.wikipedia.org/wiki/WebP", description: "Learn about WebP format and its advantages" },
            { name: "Google WebP Developer", href: "https://developers.google.com/speed/webp", description: "Official WebP documentation from Google" },
            { name: "Can I Use: WebP", href: "https://caniuse.com/webp", description: "Browser support for WebP format" },
        ],
    },
    meta: {
        title: "WebP to URL Converter - Free Online Tool | ImageToURL",
        description: "Convert WebP images to shareable URLs instantly. Free online WebP to URL converter with no signup required.",
        keywords: "webp to url, webp image to url, convert webp to url, webp url converter, webp link generator",
    },
}

export default async function WebpToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.webpToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="WebP to URL Converter"
                description="Convert WebP images to shareable URLs instantly. Free online image hosting for WebP format."
                url={`/${locale}/tools/webp-to-url`}
                featureList={[
                    "Free WebP to URL conversion",
                    "No signup required",
                    "Full WebP format support",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["webp to url", "webp image hosting", "convert webp to url", "webp link generator"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "WebP to URL", url: `${BASE_URL}/${locale}/tools/webp-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
