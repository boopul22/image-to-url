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
    const toolDict = dict.tools?.createImageUrl

    return {
        title: toolDict?.meta?.title || "Create Image URL - Make Image into Link Online | ImageToURL",
        description: toolDict?.meta?.description || "Easily create image URL links online. Make an image into a link to share on websites, email, or social media. Free tool to generate image links instantly.",
        keywords: toolDict?.meta?.keywords || "create image url, make image url, generate image url, make image into link, make an image url, create image link, how to make image url",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/create-image-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Create Image URL - Make Image into Link Online",
            description: toolDict?.meta?.description || "Easily create image URL links online. Make an image into a link instantly.",
            url: `/${locale}/tools/create-image-url`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Create Image URL",
    subtitle: "Make Any Image into a Shareable Link",
    description: "Need to create a URL for an image? Our simple tool allows you to upload pictures and instantly make them into web links that you can share anywhere.",
    features: {
        title: "Why Create Image URLs With Us?",
        items: [
            "Instantly create image links",
            "Make images into links for free",
            "No account needed",
            "Supports all major formats",
            "Permanent or temporary links",
            "Secure and private",
            "Works on mobile and desktop",
            "High-speed global access",
        ],
    },
    howItWorks: {
        title: "How to Create an Image URL",
        steps: [
            {
                title: "Upload",
                description: "Select the photo or picture you want to create a URL for.",
            },
            {
                title: "Create",
                description: "Wait a second while we process and make your image into a link.",
            },
            {
                title: "Share",
                description: "Copy the created URL and share it wherever you need.",
            },
        ],
    },
    faq: {
        title: "Questions About Creating Image URLs",
        items: [
            {
                question: "How do I create a URL for an image?",
                answer: "It's easy! Just upload your file to our 'Create Image URL' tool, and we will automatically host it and give you a link.",
            },
            {
                question: "Can I make an image into a link for free?",
                answer: "Yes, our service is 100% free. You can create URLs for as many images as you need without paying.",
            },
            {
                question: "How to make an image URL for HTML?",
                answer: "The links we create are direct URLs. You can paste them directly into the 'src' attribute of an HTML <img> tag.",
            },
            {
                question: " Does this work for screenshots?",
                answer: "Absolutely. You can create links for screenshots, photos, drawings, or any other image file types.",
            },
        ],
    },
    relatedTools: {
        title: "Related Image Tools",
        tools: [
            { name: "URL Generator for Image", href: "/tools/url-generator-for-image", description: "Generate image URLs" },
            { name: "Upload Image to URL", href: "/tools/upload-image-to-url", description: "Upload to get links" },
            { name: "Photo to URL", href: "/tools/photo-to-url", description: "Convert photos to links" },
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
        title: "Create Image URL - Make Image into Link Online | ImageToURL",
        description: "Easily create image URL links online. Make an image into a link to share on websites.",
        keywords: "create image url, make image url, generate image url",
    },
}

export default async function CreateImageUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.createImageUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Create Image URL"
                description="Easily create image URL links online. Make an image into a link instantly."
                url={`/${locale}/tools/create-image-url`}
                featureList={[
                    "Create image links instantly",
                    "Free to use",
                    "No signup required",
                    "Secure hosting",
                ]}
                keywords={["create image url", "make image url", "make image into link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Create Image URL", url: `${BASE_URL}/${locale}/tools/create-image-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
