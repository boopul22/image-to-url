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
    const toolDict = dict.tools?.pictureUrlMaker

    return {
        title: toolDict?.meta?.title || "Picture URL Maker - Make URL for Picture Online | ImageToURL",
        description: toolDict?.meta?.description || "Make a URL for any picture instantly. Free online picture URL maker - upload, get a link, and share. Best tool to turn a picture into a link.",
        keywords: toolDict?.meta?.keywords || "picture url maker, picture url generator, picture link maker, picture into link, make picture url, create picture url, picture address maker",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/picture-url-maker`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Picture URL Maker - Make URL for Picture Online",
            description: toolDict?.meta?.description || "Make a URL for any picture instantly. Free online picture URL maker.",
            url: `/${locale}/tools/picture-url-maker`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Picture URL Maker",
    subtitle: "Make Any Picture Into a Link",
    description: "Need a URL for a picture? Our picture URL maker handles it in seconds. Just upload your file and we'll create a direct link you can use anywhere.",
    features: {
        title: "Picture URL Maker Features",
        items: [
            "Make picture URLs instantly",
            "Turn pictures into links for free",
            "No account required",
            "Supports high-res pictures",
            "Shareable short links",
            "Use in HTML, CSS, Forums",
            "Fast upload speed",
            "Secure cloud storage",
        ],
    },
    howItWorks: {
        title: "How to Make a Picture URL",
        steps: [
            {
                title: "Select Picture",
                description: "Choose the picture file you want to make a URL for.",
            },
            {
                title: "Upload",
                description: "Our secure server accepts the file and stores it online.",
            },
            {
                title: "Get URL",
                description: "We instantly make a unique URL for your picture that you can copy.",
            },
        ],
    },
    faq: {
        title: "Picture URL Questions",
        items: [
            {
                question: "How do I make a URL for a picture?",
                answer: "Use this Picture URL Maker. Upload your picture, and we'll automatically generate the web address (URL) for it.",
            },
            {
                question: "Is this tool free?",
                answer: "Yes, it is completely free to make URLs for your pictures using our tool.",
            },
            {
                question: "Can I turn a picture into a link for Instagram?",
                answer: "You can create a link here and share it in your bio or messages. Instagram posts don't support clickable links in captions directly.",
            },
            {
                question: "Format support?",
                answer: "We support all common formats: JPG, PNG, GIF, WebP, and more.",
            },
        ],
    },
    relatedTools: {
        title: "Other Tools",
        tools: [
            { name: "Picture to Link", href: "/tools/picture-to-link", description: "Convert picture to link" },
            { name: "Convert Picture to URL", href: "/tools/convert-picture-to-url", description: "Picture conversion tool" },
            { name: "Create Image URL", href: "/tools/create-image-url", description: "Create image URL" },
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
        title: "Picture URL Maker - Make URL for Picture Online | ImageToURL",
        description: "Make a URL for any picture instantly. Free online picture URL maker.",
        keywords: "picture url maker, picture url generator, picture into link",
    },
}

export default async function PictureUrlMakerPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.pictureUrlMaker || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Picture URL Maker"
                description="Make a URL for any picture instantly. Free online picture URL maker."
                url={`/${locale}/tools/picture-url-maker`}
                featureList={[
                    "Make picture URLs instantly",
                    "Free tool",
                    "No signup needed",
                    "Secure hosting",
                ]}
                keywords={["picture url maker", "picture link maker", "picture into link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Picture URL Maker", url: `${BASE_URL}/${locale}/tools/picture-url-maker` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
