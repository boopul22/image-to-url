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
    const toolDict = dict.tools?.photoLinkCreator

    return {
        title: toolDict?.meta?.title || "Photo Link Creator - Create Link for Photo Online | ImageToURL",
        description: toolDict?.meta?.description || "Create a link for your photo instantly. Free online photo link creator - simple tool to turn any photo into a shareable web link.",
        keywords: toolDict?.meta?.keywords || "photo link creator, photo to link converter, photo to link, create photo link, make photo link, generate photo link",
        alternates: {
            canonical: `/${locale}/tools/photo-link-creator`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Photo Link Creator - Create Link for Photo Online",
            description: toolDict?.meta?.description || "Create a link for your photo instantly. Free online photo link creator.",
            url: `/${locale}/tools/photo-link-creator`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Photo Link Creator",
    subtitle: "Create Web Links for Your Photos",
    description: "The simplest way to create a link for any photo. Upload your image and our photo link creator will instantly generate a URL you can share anywhere.",
    features: {
        title: "Photo Link Creator Features",
        items: [
            "Create photo links in 1 click",
            "Always free to use",
            "No registration needed",
            "Works with JPG, PNG, WebP",
            "Links valid for 30 days (Free)",
            "Fastest global hosting",
            "Secure and private",
            "Mobile friendly",
        ],
    },
    howItWorks: {
        title: "How to Create a Link for a Photo",
        steps: [
            {
                title: "Choose Photo",
                description: "Select the photo from your gallery or computer that you want to share.",
            },
            {
                title: "Upload",
                description: "Our tool uploads your photo securely and creates a unique web address.",
            },
            {
                title: "Copy Link",
                description: "Get your photo link instantly. Copy it and paste it wherever you want.",
            },
        ],
    },
    faq: {
        title: "Photo Link Questions",
        items: [
            {
                question: "What does the photo link creator do?",
                answer: "It takes your photo file and puts it on the internet with a unique address (URL), so you can send that link to friends or post it online.",
            },
            {
                question: "Is it free to create photo links?",
                answer: "Yes, our photo link creator is 100% free. You can create as many links as you like.",
            },
            {
                question: "Can I create links for large photos?",
                answer: "Yes, we support high-quality photos up to 10MB in size.",
            },
            {
                question: "Do I need an app to use this?",
                answer: "No, this works directly in your web browser on any phone, tablet, or computer.",
            },
        ],
    },
    relatedTools: {
        title: "Helper Tools",
        tools: [
            { name: "Photo to URL", href: "/tools/photo-to-url", description: "Convert photo to URL" },
            { name: "Picture to Link", href: "/tools/picture-to-link", description: "Convert picture to link" },
            { name: "Upload Image to URL", href: "/tools/upload-image-to-url", description: "Upload image tool" },
        ],
    },
    meta: {
        title: "Photo Link Creator - Create Link for Photo Online | ImageToURL",
        description: "Create a link for your photo instantly. Free online photo link creator.",
        keywords: "photo link creator, photo to link converter, photo to link",
    },
}

export default async function PhotoLinkCreatorPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.photoLinkCreator || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Photo Link Creator"
                description="Create a link for your photo instantly. Free online photo link creator."
                url={`/${locale}/tools/photo-link-creator`}
                featureList={[
                    "Create photo links instantly",
                    "Free service",
                    "No signup needed",
                    "Secure hosting",
                ]}
                keywords={["photo link creator", "photo to link converter", "create photo link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Photo Link Creator", url: `${BASE_URL}/${locale}/tools/photo-link-creator` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
