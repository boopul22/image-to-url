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
    const toolDict = dict.tools?.pictureToLink

    return {
        title: toolDict?.meta?.title || "Picture to Link Converter - Free Online Picture URL Generator | ImageToURL",
        description: toolDict?.meta?.description || "Convert pictures to shareable links instantly. Free online picture to link converter - upload any picture and get an instant URL. No signup required.",
        keywords: toolDict?.meta?.keywords || "picture to link, picture to link converter, picture link maker, picture to url, convert picture to url, picture url, turn picture to url, how to turn a picture into a link",
        alternates: {
            canonical: `/${locale}/tools/picture-to-link`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Picture to Link Converter - Free Online Tool",
            description: toolDict?.meta?.description || "Convert pictures to shareable links instantly.",
            url: `/${locale}/tools/picture-to-link`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Picture to Link Converter",
    subtitle: "Free Online Picture URL Generator",
    description: "Convert your pictures to shareable links instantly. Upload any picture and get a direct URL that works anywhere - websites, social media, emails, documents, and more.",
    features: {
        title: "Why Use Our Picture to Link Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support all picture formats (JPG, PNG, GIF, WebP)",
            "Files up to 10MB supported",
            "Instant link generation",
            "Global CDN for fast delivery worldwide",
            "99.9% uptime guarantee",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Turn a Picture into a Link",
        steps: [
            {
                title: "Upload Your Picture",
                description: "Drag and drop your picture or click to browse. We support all common picture formats including JPG, PNG, GIF, and WebP.",
            },
            {
                title: "Get Your Picture Link",
                description: "Your picture is instantly uploaded to our global CDN. A shareable link is generated automatically in seconds.",
            },
            {
                title: "Use Your Link Anywhere",
                description: "Copy the link and use it anywhere - embed in websites, share in chats, or add to documents and presentations.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I turn a picture into a link?",
                answer: "Simply upload your picture using our converter. Once uploaded, you'll instantly receive a shareable link that you can copy and paste anywhere.",
            },
            {
                question: "Is this picture to link converter free?",
                answer: "Yes, our picture to link converter is completely free. Upload pictures up to 10MB without creating an account.",
            },
            {
                question: "What is a picture URL?",
                answer: "A picture URL is a web link that points directly to your picture hosted online. Anyone with this link can view your picture in their browser.",
            },
            {
                question: "How do I convert a picture to a URL?",
                answer: "Just drag and drop your picture into our converter. We'll upload it to our cloud servers and give you a shareable URL instantly.",
            },
            {
                question: "Can I make a picture into a link for free?",
                answer: "Absolutely! Our service is 100% free. Upload any picture and get a shareable link without any charges or signup.",
            },
            {
                question: "Where can I use the picture link?",
                answer: "Picture links can be used anywhere - websites, forums, social media, emails, chat apps, documents, presentations, and more.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Photo to URL", href: "/tools/photo-to-url", description: "Convert photos to URLs" },
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate image links" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple pictures at once" },
        ],
    },
    meta: {
        title: "Picture to Link Converter - Free Online Picture URL Generator | ImageToURL",
        description: "Convert pictures to shareable links instantly. Free online picture to link converter with no signup required.",
        keywords: "picture to link, picture to link converter, picture link maker, turn picture into a link",
    },
}

export default async function PictureToLinkPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.pictureToLink || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Picture to Link Converter"
                description="Convert pictures to shareable links instantly. Free online picture URL generator."
                url={`/${locale}/tools/picture-to-link`}
                featureList={[
                    "Free picture to link conversion",
                    "No signup required",
                    "Support all picture formats",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["picture to link", "picture link converter", "picture url generator", "turn picture into link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Picture to Link", url: `${BASE_URL}/${locale}/tools/picture-to-link` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
