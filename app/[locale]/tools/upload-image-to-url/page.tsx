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
    const toolDict = dict.tools?.uploadImageToUrl

    return {
        title: toolDict?.meta?.title || "Upload Image to URL - Get Link for Image | ImageToURL",
        description: toolDict?.meta?.description || "Upload any image and get a URL instantly. Free image hosting tool to upload image to web link. Simple, fast, and no registration needed.",
        keywords: toolDict?.meta?.keywords || "upload image to url, upload image url, upload image get url, upload image and get url, upload image to get url, image uploader, host image online",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/upload-image-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Upload Image to URL - Get Link for Image",
            description: toolDict?.meta?.description || "Upload any image and get a URL instantly. Free image hosting tool.",
            url: `${BASE_URL}/${locale}/tools/upload-image-to-url`,
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
    title: "Upload Image to URL",
    subtitle: "Upload Photos and Get Instant Links",
    description: "Simply upload your image to get a URL. Our tool hosts your uploaded images and provides direct links for sharing on the web, social media, or anywhere else.",
    features: {
        title: "Fast & Free Image Upload",
        items: [
            "Upload image to URL in seconds",
            "Completely free hosting",
            "No sign-up required",
            "Secure and reliable",
            "Bulk upload supported",
            "Shareable direct links",
            "Supports high quality images",
            "Instant access anywhere",
        ],
    },
    howItWorks: {
        title: "How to Upload and Get a URL",
        steps: [
            {
                title: "Upload Image",
                description: "Drag & drop or select the image file you want to upload.",
            },
            {
                title: "Processing",
                description: "Our server securely processes and stores your image instantly.",
            },
            {
                title: "Get URL",
                description: "Receive your unique image URL immediately after upload finishes.",
            },
        ],
    },
    faq: {
        title: "Upload Questions",
        items: [
            {
                question: "How do I upload an image to get a URL?",
                answer: "Just use the upload box on this page. Once your file is uploaded, a URL is generated automatically for you to use.",
            },
            {
                question: "Is uploading images free?",
                answer: "Yes, you can upload images to get URLs for free. We don't charge for standard hosting.",
            },
            {
                question: "How long is the uploaded image kept?",
                answer: "Images uploaded anonymously are kept for 30 days. If you need permanent hosting, you can create a free account.",
            },
            {
                question: "Can I upload multiple images?",
                answer: "Yes, you can use our Bulk Upload feature to upload multiple images at once and get URLs for all of them.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images" },
            { name: "Create Image URL", href: "/tools/create-image-url", description: "Make image into link" },
            { name: "Free Image Hosting", href: "/tools/free-image-hosting", description: "Host images for free" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/image-optimization", description: "Google's guide to image optimization for the web" },
            { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
            { name: "Cloudflare: CDN Guide", href: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", description: "Learn how CDNs deliver images faster" },
        ],
    },
    meta: {
        title: "Upload Image to URL - Get Link for Image | ImageToURL",
        description: "Upload any image and get a URL instantly. Free image hosting tool.",
        keywords: "upload image to url, upload image get url, upload image to get url",
    },
}

export default async function UploadImageToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.uploadImageToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Upload Image to URL"
                description="Upload any image and get a URL instantly. Free image hosting tool."
                url={`/${locale}/tools/upload-image-to-url`}
                featureList={[
                    "Instant upload",
                    "Get URL immediately",
                    "Free hosting",
                    "No signup needed",
                ]}
                keywords={["upload image to url", "upload image get url", "upload image to web link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Upload Image to URL", url: `${BASE_URL}/${locale}/tools/upload-image-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
