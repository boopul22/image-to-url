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
    const toolDict = dict.tools?.urlGeneratorForImage

    return {
        title: toolDict?.meta?.title || "URL Generator for Image - Make URL for Image Online | ImageToURL",
        description: toolDict?.meta?.description || "Best URL generator for image files. Turn any picture into a link instantly. Free online URL maker for images - upload and get your link.",
        keywords: toolDict?.meta?.keywords || "url generator for image, url maker for image, url creator for image, url image converter, make url for image, generate url for image, image address generator",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/url-generator-for-image`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "URL Generator for Image - Make URL for Image Online",
            description: toolDict?.meta?.description || "Turn any picture into a link instantly. Free online URL maker for images.",
            url: `${BASE_URL}/${locale}/tools/url-generator-for-image`,
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
    title: "URL Generator for Image",
    subtitle: "Turn Your Images into Shareable Links",
    description: "The easiest way to get a URL for your image. Our free URL generator for images lets you upload photos and instantly get a direct link to share anywhere.",
    features: {
        title: "Best URL Generator Features",
        items: [
            "Instant URL generation for any image",
            "100% Free to use",
            "No registration required",
            "Supports JPG, PNG, GIF, WebP",
            "Secure image hosting",
            "Fastest way to get an image address",
            "Direct links for HTML & CSS",
            "Mobile friendly tool",
        ],
    },
    howItWorks: {
        title: "How to Generate a URL for an Image",
        steps: [
            {
                title: "Select Image",
                description: "Choose the image you want to convert to a URL from your device.",
            },
            {
                title: "Auto-Generate",
                description: "Our tool automatically uploads your file and generates a unique URL.",
            },
            {
                title: "Copy Link",
                description: "Copy your new image URL and use it on websites, forums, or social media.",
            },
        ],
    },
    faq: {
        title: "Common Questions",
        items: [
            {
                question: "What is a URL generator for image?",
                answer: "A URL generator for image is a tool that takes a file from your computer or phone and creates a web link (URL) for it, allowing you to share the picture online.",
            },
            {
                question: "How do I make a URL for an image?",
                answer: "Simply upload your photo to our tool. We host it and provide you with a unique URL that points directly to your image.",
            },
            {
                question: "Is this URL maker for image free?",
                answer: "Yes, it is completely free to generate URLs for your images. There are no hidden fees.",
            },
            {
                question: "Can I use the generated URL in HTML?",
                answer: "Yes! The URL we generate is a direct link, perfect for use in HTML <img> tags or CSS background properties.",
            },
        ],
    },
    relatedTools: {
        title: "More Image Tools",
        tools: [
            { name: "Create Image URL", href: "/tools/create-image-url", description: "Create URLs for your photos" },
            { name: "Upload Image to URL", href: "/tools/upload-image-to-url", description: "Upload to get a link" },
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "General image link tool" },
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
        title: "URL Generator for Image - Make URL for Image Online | ImageToURL",
        description: "Best URL generator for image files. Turn any picture into a link instantly.",
        keywords: "url generator for image, url maker for image, url creator for image",
    },
}

export default async function UrlGeneratorForImagePage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.urlGeneratorForImage || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="URL Generator for Image"
                description="Turn any picture into a link instantly. Free online URL maker for images."
                url={`/${locale}/tools/url-generator-for-image`}
                featureList={[
                    "Instant URL generation",
                    "Free image hosting",
                    "Direct image links",
                    "No signup needed",
                ]}
                keywords={["url generator for image", "url maker for image", "make url for image"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "URL Generator for Image", url: `${BASE_URL}/${locale}/tools/url-generator-for-image` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
