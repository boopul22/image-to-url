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
    const toolDict = dict.tools?.convertPictureToUrl

    return {
        title: toolDict?.meta?.title || "Convert Picture to URL - Free Online Converter | ImageToURL",
        description: toolDict?.meta?.description || "Convert any picture to a URL link easily. Free online tool to turn picture to URL. Supports JPG, PNG, GIF & more. No download involved.",
        keywords: toolDict?.meta?.keywords || "convert picture to url, turn picture to url, change picture to url, picture to url converter, convert image to url link, online picture converter",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/convert-picture-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Convert Picture to URL - Free Online Converter",
            description: toolDict?.meta?.description || "Convert any picture to a URL link easily. Free online tool.",
            url: `${BASE_URL}/${locale}/tools/convert-picture-to-url`,
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
    title: "Convert Picture to URL",
    subtitle: "Turn Your Pictures into Shareable Links",
    description: "Easily convert your picture files (JPG, PNG, etc.) into web URLs. Our free converter provides a quick way to host your pictures and get a link to share.",
    introduction: {
        title: "Why Convert Pictures to URLs?",
        paragraphs: [
            "In today's connected world, sharing pictures quickly and efficiently is more important than ever. Converting a picture to a URL eliminates the need for bulky email attachments, file transfer apps, or complicated cloud sharing setups. With a simple link, anyone can view your picture instantly in their browser.",
            "Our picture to URL converter works with all common image formats and sizes up to 10MB. The moment you upload, your picture is stored securely on our global network and a unique web address is created. This URL can be pasted anywhere—text messages, social posts, emails, or documents.",
            "Whether you're sharing family vacation photos, sending product images to clients, or posting visuals in online communities, converting pictures to URLs streamlines the process. No apps to install, no accounts required, just fast and reliable picture sharing.",
        ],
    },
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
    useCases: {
        title: "When to Convert Pictures to URLs",
        items: [
            { title: "Sharing on Messaging Apps", description: "Send picture links through WhatsApp, Telegram, or SMS without compressing or losing quality like standard photo sharing." },
            { title: "Creating Visual Portfolios", description: "Build online portfolios by embedding picture URLs in personal websites, Behance profiles, or LinkedIn posts." },
            { title: "Real Estate Listings", description: "Add property photos to rental listings, MLS databases, or real estate marketing materials with reliable hosted links." },
            { title: "Event Invitations", description: "Include venue photos, maps, or event graphics in digital invitations and RSVP pages." },
            { title: "Technical Documentation", description: "Embed diagrams, flowcharts, and reference images in technical specs, API docs, or training materials." },
            { title: "Social Proof & Reviews", description: "Share before/after photos, testimonials with images, or visual proof in review platforms and comments." },
        ],
    },
    tips: {
        title: "Picture Conversion Tips",
        items: [
            "Crop and resize your pictures before uploading to reduce file size and improve loading times.",
            "Use JPG format for photographs to get smaller file sizes with good quality.",
            "Use PNG format when you need transparency or have text/graphics in your picture.",
            "Copy the URL immediately after conversion—bookmark your dashboard to find it later if needed.",
            "For sensitive pictures, consider who might access the link before sharing publicly.",
            "Create a free account to organize your converted pictures and access them from any device.",
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
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/image-optimization", description: "Google's guide to optimizing images for the web" },
            { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
            { name: "Cloudflare: What is a CDN?", href: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", description: "Understanding content delivery networks" },
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
