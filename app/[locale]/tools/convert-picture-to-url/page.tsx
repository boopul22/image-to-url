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
    const toolDict = dict.tools?.convertPictureToUrl

    return {
        title: toolDict?.meta?.title || "Convert Picture to URL - Free Online Converter | ImageToURL",
        description: toolDict?.meta?.description || "Convert any picture to a URL link easily. Free online tool to turn picture to URL. Supports JPG, PNG, GIF & more. No download involved.",
        keywords: toolDict?.meta?.keywords || "convert picture to url, turn picture to url, change picture to url, picture to url converter, convert image to url link, online picture converter",
        alternates: {
            canonical: `/${locale}/tools/convert-picture-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Convert Picture to URL - Free Online Converter",
            description: toolDict?.meta?.description || "Convert any picture to a URL link easily. Free online tool.",
            url: `/${locale}/tools/convert-picture-to-url`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Convert Picture to URL",
    subtitle: "Turn Your Pictures into Shareable Links",
    description: "Easily convert your picture files (JPG, PNG, etc.) into web URLs. Our free converter provides a quick way to host your pictures and get a link to share.",
    features: {
        title: "Converter Features",
        items: [
            "Convert picture to URL instantly",
            "100% Free online tool",
            "No registration or software needed",
            "Secure and anonymous",
            "Keep original quality",
            "Share on any platform",
            "Fast global servers",
            "Simple drag & drop interface",
        ],
    },
    howItWorks: {
        title: "How to Convert a Picture to URL",
        steps: [
            {
                title: "Upload Picture",
                description: "Select the picture you want to convert from your device.",
            },
            {
                title: "Convert",
                description: "The tool automatically uploads and converts your file to a hosted link.",
            },
            {
                title: "Get Link",
                description: "Copy your new picture URL and share it instantly.",
            },
        ],
    },
    faq: {
        title: "Conversion FAQs",
        items: [
            {
                question: "How do I convert a picture to a URL?",
                answer: "Simply upload your picture to this page. We handle the rest and provide you with a URL link immediately.",
            },
            {
                question: "Is it free to convert pictures to URLs?",
                answer: "Yes, our service is completely free for all users.",
            },
            {
                question: "Can I convert multiple pictures?",
                answer: "Yes! Use our Bulk Upload tool if you have many pictures to convert at once.",
            },
            {
                question: "How long does the link last?",
                answer: "Anonymous links last for 30 days. Accounts (free) can keep them permanently.",
            },
        ],
    },
    relatedTools: {
        title: "Similar Tools",
        tools: [
            { name: "Picture URL Maker", href: "/tools/picture-url-maker", description: "Make picture URLs" },
            { name: "Photo Link Creator", href: "/tools/photo-link-creator", description: "Create photo links" },
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate image links" },
        ],
    },
    meta: {
        title: "Convert Picture to URL - Free Online Converter | ImageToURL",
        description: "Convert any picture to a URL link easily. Free online tool to turn picture to URL.",
        keywords: "convert picture to url, turn picture to url, change picture to url",
    },
}

export default async function ConvertPictureToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.convertPictureToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Convert Picture to URL"
                description="Convert any picture to a URL link easily. Free online tool."
                url={`/${locale}/tools/convert-picture-to-url`}
                featureList={[
                    "Instant picture conversion",
                    "Free online tool",
                    "No signup required",
                    "Secure hosting",
                ]}
                keywords={["convert picture to url", "turn picture to url", "picture to url converter"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Convert Picture to URL", url: `${BASE_URL}/${locale}/tools/convert-picture-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
