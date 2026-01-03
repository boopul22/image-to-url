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
            url: `${BASE_URL}/${locale}/tools/url-to-qr-code`,
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
    title: "Image URL to QR Code",
    subtitle: "Generate Scannable QR Codes from Image Links",
    description: "Upload an image, get a URL, and instantly generate a QR code that links directly to your image. Perfect for print materials, business cards, and offline-to-online sharing.",
    introduction: {
        title: "Bridge Print and Digital with Image QR Codes",
        paragraphs: [
            "QR codes transform any printed material into a gateway to digital content. By generating a QR code from your image URL, you enable anyone with a smartphone to instantly access your photos, graphics, or visual content—no typing, no searching, just scan and view.",
            "This is particularly powerful for portfolios, product catalogs, and marketing materials. A photographer can add a QR code to a business card linking to their portfolio. A retailer can put QR codes on shelf tags showing detailed product images. An artist can include codes on gallery labels linking to high-resolution artwork.",
            "Our tool combines image hosting with QR generation in one seamless workflow. Upload your image, get a permanent URL, and generate a customizable QR code—all in seconds. Download your QR code in print-ready PNG or scalable SVG format for any use case.",
        ],
    },
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
    useCases: {
        title: "Where to Use Image QR Codes",
        items: [
            { title: "Business Cards", description: "Add a QR code linking to your portfolio, headshot, or company logo." },
            { title: "Product Packaging", description: "Include QR codes that show product images, usage guides, or assembly instructions." },
            { title: "Art Galleries", description: "Place QR codes next to artwork that link to high-resolution images or purchase pages." },
            { title: "Real Estate Signs", description: "Let potential buyers scan to see property photos without visiting websites." },
            { title: "Restaurant Menus", description: "Link to food photos that entice customers with visual menu items." },
            { title: "Educational Materials", description: "Add QR codes to textbooks linking to diagrams, charts, or visual examples." },
        ],
    },
    tips: {
        title: "QR Code Generation Tips",
        items: [
            "Use SVG format for print materials—it scales perfectly to any size without pixelation.",
            "Test your QR code at the intended print size before mass production.",
            "Maintain at least 2cm (0.8in) size for reliable scanning at typical distances.",
            "Sign in before generating QR codes to ensure your image URL never expires.",
            "Choose colors with high contrast—dark codes on light backgrounds work best.",
            "For outdoor use, consider weather-resistant printing and UV-stable inks.",
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
