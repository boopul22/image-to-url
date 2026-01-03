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
    const toolDict = dict.tools?.freeImageHosting

    return {
        title: toolDict?.meta?.title || "Free Image Hosting - Upload Images & Get URLs | ImageToURL",
        description: toolDict?.meta?.description || "Free image hosting with instant URL generation. Upload photos and get shareable links in seconds. No signup required. Best free photo hosting service with global CDN.",
        keywords: toolDict?.meta?.keywords || "free image hosting, free photo hosting, upload image free, image hosting no signup, free image upload, host image free, free picture hosting, image hosting service free",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/free-image-hosting`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Free Image Hosting - Upload & Share",
            description: toolDict?.meta?.description || "Free image hosting with instant URL generation. No signup required.",
            url: `${BASE_URL}/${locale}/tools/free-image-hosting`,
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
    title: "Free Image Hosting",
    subtitle: "Upload Images & Get Instant URLs",
    description: "Host your images for free with our reliable image hosting service. Upload any photo and get a shareable URL instantly. No signup, no hidden fees, just simple image hosting.",
    introduction: {
        title: "Reliable Free Image Hosting for Everyone",
        paragraphs: [
            "Free image hosting provides a simple solution to one of the internet's most common needs: sharing images online. Whether you're a blogger, developer, small business owner, or casual user, having reliable hosting means your images are always accessible when you need them—without paying monthly fees or managing complex infrastructure.",
            "Our free hosting service stores your images on a global content delivery network (CDN), ensuring fast loading times for viewers anywhere in the world. Unlike social media platforms that compress your uploads or file-sharing services with download limits, we preserve your image quality and provide direct URLs that work everywhere.",
            "With no registration required for basic use, you can start hosting images immediately. Power users can create a free account for additional features like permanent storage, folder organization, and upload history. We're committed to keeping core hosting features free forever.",
        ],
    },
    features: {
        title: "Why Choose Our Free Image Hosting?",
        items: [
            "100% free forever",
            "No account or signup required",
            "Support all formats (JPG, PNG, GIF, WebP, SVG)",
            "Up to 10MB per file",
            "Instant shareable URLs",
            "Global CDN for fast worldwide delivery",
            "99.9% uptime guarantee",
            "Secure HTTPS hosting",
        ],
    },
    howItWorks: {
        title: "How Free Image Hosting Works",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop any image file or click to browse. We accept JPG, PNG, GIF, WebP, and SVG files.",
            },
            {
                title: "Image Gets Hosted",
                description: "Your image is instantly stored on our global CDN network with multiple edge locations worldwide.",
            },
            {
                title: "Share Your URL",
                description: "Copy your image URL and use it anywhere. Your image is now hosted and accessible from anywhere in the world.",
            },
        ],
    },
    useCases: {
        title: "Who Uses Free Image Hosting",
        items: [
            { title: "Bloggers & Writers", description: "Host header images, inline graphics, and featured photos for blog posts without paying for expensive hosting plans." },
            { title: "Online Sellers", description: "Upload product photos for eBay, Etsy, Poshmark, and Facebook Marketplace listings with reliable, free hosting." },
            { title: "Forum Users & Communities", description: "Share images on Reddit, Discord, gaming forums, and hobby communities where direct uploads may be limited." },
            { title: "Developers & Designers", description: "Host mockups, screenshots, and assets for projects, portfolios, and documentation without cluttering your server." },
            { title: "Teachers & Students", description: "Include images in online assignments, study materials, presentations, and educational resources." },
            { title: "Small Businesses", description: "Host logos, team photos, and marketing images for websites, email campaigns, and social media without added costs." },
        ],
    },
    tips: {
        title: "Free Image Hosting Tips",
        items: [
            "Compress images before uploading—smaller files load faster and won't count against any fair-use limits.",
            "Use the bulk upload feature to host multiple images at once for large projects or photo galleries.",
            "Create a free account to prevent your images from expiring after 30 days.",
            "Organize your hosted images with folders to easily find them later when you have many uploads.",
            "Check your image dimensions before uploading—hosting doesn't resize, so upload the size you actually need.",
            "For mission-critical images, keep a backup of the original files on your local device.",
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "Is this image hosting really free?",
                answer: "Yes! ImageToURL offers completely free image hosting. Upload images up to 10MB without any signup. We're supported by optional premium features for power users.",
            },
            {
                question: "Do I need to create an account?",
                answer: "No account is required for basic image hosting. Simply upload your image and get a shareable URL instantly. Sign in only if you want to manage your uploads.",
            },
            {
                question: "How long are my images hosted?",
                answer: "Anonymous uploads are hosted for 30 days. Create a free account to host images indefinitely with custom expiration options.",
            },
            {
                question: "What makes your hosting different from Imgur or ImgBB?",
                answer: "We focus on simplicity and speed. No ads, no compression, just fast hosting with a global CDN. Your images are served from edge locations worldwide for minimal latency.",
            },
            {
                question: "Can I use hosted images on my website or blog?",
                answer: "Absolutely! Our image URLs work perfectly for websites, blogs, forums, emails, and social media. Direct linking is fully supported.",
            },
            {
                question: "Is there a limit on how many images I can host?",
                answer: "Anonymous users can upload 5 images per day. Sign in for free to get unlimited uploads with no daily restrictions.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Host multiple images at once" },
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate shareable links" },
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Web.dev: Image Best Practices", href: "https://web.dev/articles/image-optimization", description: "Google's comprehensive guide to web images" },
            { name: "MDN: Web Images", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Learn how to use images effectively on the web" },
            { name: "Cloudflare: CDN Benefits", href: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", description: "Understanding CDN for faster image delivery" },
        ],
    },
    meta: {
        title: "Free Image Hosting - Upload Images & Get URLs | ImageToURL",
        description: "Free image hosting with instant URL generation. Upload photos and get shareable links in seconds. No signup required.",
        keywords: "free image hosting, free photo hosting, upload image free, image hosting no signup, host image free",
    },
}

export default async function FreeImageHostingPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.freeImageHosting || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Free Image Hosting"
                description="Free image hosting service. Upload photos and get instant shareable URLs."
                url={`/${locale}/tools/free-image-hosting`}
                featureList={[
                    "Free image hosting",
                    "No signup required",
                    "Support all image formats",
                    "Up to 10MB file size",
                    "Instant shareable URLs",
                    "Global CDN delivery",
                ]}
                keywords={["free image hosting", "free photo hosting", "upload image free", "image hosting"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Free Image Hosting", url: `${BASE_URL}/${locale}/tools/free-image-hosting` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
