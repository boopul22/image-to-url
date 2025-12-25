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
    const toolDict = dict.tools?.urlToQrCode || defaultToolContent

    return {
        title: toolDict?.meta?.title || "Image URL to QR Code Generator - Free Online Tool | ImageToURL",
        description: toolDict?.meta?.description || "Convert your image URLs to scannable QR codes instantly. Free online QR code generator for image links. Perfect for print materials and sharing.",
        keywords: toolDict?.meta?.keywords || "image url to qr code, qr code generator, url to qr, image link qr code, qr code from url",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/url-to-qr-code`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Image URL to QR Code Generator",
            description: toolDict?.meta?.description || "Convert image URLs to scannable QR codes instantly.",
            url: `/${locale}/tools/url-to-qr-code`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Image URL to QR Code",
    subtitle: "Generate Scannable QR Codes from Image Links",
    description: "Upload an image, get a URL, and instantly generate a QR code that links directly to your image. Perfect for print materials, business cards, and offline-to-online sharing.",
    features: {
        title: "Why Generate QR Codes for Image URLs?",
        items: [
            "Instant QR code generation",
            "High-resolution QR codes",
            "Download as PNG or SVG",
            "Customizable colors",
            "Perfect for print materials",
            "Works on all smartphones",
            "No app required to scan",
            "Free unlimited QR codes",
        ],
    },
    howItWorks: {
        title: "How to Create a QR Code for Your Image",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop any image file. We'll upload it and generate a shareable URL automatically.",
            },
            {
                title: "Generate QR Code",
                description: "A QR code linking to your image URL is generated instantly. Customize colors if desired.",
            },
            {
                title: "Download & Share",
                description: "Download your QR code in PNG or SVG format. Use it in print materials, presentations, or anywhere.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert an image URL to a QR code?",
                answer: "Simply upload your image to get a URL, then click the QR code button. Your QR code is generated instantly and can be downloaded in multiple formats.",
            },
            {
                question: "What formats can I download the QR code in?",
                answer: "You can download QR codes as PNG (for web/print) or SVG (for scalable graphics). Both are high resolution.",
            },
            {
                question: "Can I customize the QR code colors?",
                answer: "Yes! You can customize the foreground and background colors of your QR code to match your branding.",
            },
            {
                question: "Will the QR code stop working?",
                answer: "QR codes link to your image URL. As long as the image URL is active, the QR code will work. Sign in to ensure your images never expire.",
            },
            {
                question: "Can I use the QR code commercially?",
                answer: "Yes, QR codes generated here are free to use for any purpose, including commercial projects.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "QR to URL", href: "/tools/qr-to-url", description: "Upload and host QR code images" },
            { name: "Image to Short URL", href: "/tools/image-to-short-url", description: "Create compact short links" },
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate standard image links" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "QR Code - Wikipedia", href: "https://en.wikipedia.org/wiki/QR_code", description: "Learn about QR code technology and standards" },
            { name: "QRCode.com Official", href: "https://www.qrcode.com/en/", description: "Official QR Code information site" },
            { name: "Web.dev: Image Formats", href: "https://web.dev/articles/choose-the-right-image-format", description: "Best image format guide" },
        ],
    },
    meta: {
        title: "Image URL to QR Code Generator - Free Online Tool | ImageToURL",
        description: "Convert your image URLs to scannable QR codes instantly. Free online QR code generator.",
        keywords: "image url to qr code, qr code generator, url to qr, image link qr code",
    },
}

export default async function UrlToQrCodePage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.urlToQrCode || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Image URL to QR Code Generator"
                description="Convert image URLs to scannable QR codes. Free online tool for generating QR codes from image links."
                url={`/${locale}/tools/url-to-qr-code`}
                featureList={[
                    "Instant QR code generation",
                    "Download as PNG or SVG",
                    "Custom colors",
                    "High resolution",
                    "Free unlimited QR codes",
                    "Works on all devices",
                ]}
                keywords={["image url to qr code", "qr code generator", "url to qr", "qr code from image link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "URL to QR Code", url: `${BASE_URL}/${locale}/tools/url-to-qr-code` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
