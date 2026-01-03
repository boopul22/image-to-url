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
    introduction: {
        title: "Upload Images and Receive Instant URLs",
        paragraphs: [
            "Uploading an image to get a URL is the fastest way to make your local files accessible online. Whether the image is on your computer, phone, or tablet, our upload tool accepts it and provides a web-ready link in seconds. No email attachments, no cloud storage setup—just direct, usable URLs.",
            "When you upload an image, we store it on our global server network optimized for speed and reliability. The URL we generate is a direct link to your image, meaning it can be embedded in websites, shared in messages, or used anywhere that accepts image addresses. Your original image quality is preserved.",
            "This tool is designed for both technical and non-technical users. Developers appreciate the clean URLs for web projects, while everyday users love how easy it is to share images without dealing with file size limits or download prompts. Upload once, share the link everywhere.",
        ],
    },
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
    useCases: {
        title: "Image Upload Use Cases",
        items: [
            { title: "Quick File Sharing", description: "Upload images to get URLs for fast sharing when you need to send visuals without email attachments or file transfer apps." },
            { title: "Embedding in CMS Platforms", description: "Upload images to get URLs for WordPress, Squarespace, Wix, or other website builders that accept external image links." },
            { title: "API & App Testing", description: "Developers can upload test images to get URLs for testing image displays, API integrations, or mobile app development." },
            { title: "Chat & Messaging", description: "Upload images to share in Slack, Teams, Discord, or other chat platforms with direct links instead of file uploads." },
            { title: "Backup & Archiving", description: "Upload important images to create secondary copies accessible via URL from anywhere in the world." },
            { title: "Social Media Scheduling", description: "Upload images to get URLs for scheduling tools like Buffer, Hootsuite, or Later that need image links." },
        ],
    },
    tips: {
        title: "Image Upload Tips",
        items: [
            "Ensure your internet connection is stable before uploading large images to avoid failed uploads.",
            "Use the drag-and-drop feature for faster uploads—just drag your image onto the upload zone.",
            "The progress bar shows upload status—wait for it to complete before copying the URL.",
            "For multiple images, use our bulk upload feature to upload several files at once.",
            "Sign in to keep your uploaded images permanently and organize them with folders.",
            "Check that your image displays correctly in the preview before sharing the URL.",
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
