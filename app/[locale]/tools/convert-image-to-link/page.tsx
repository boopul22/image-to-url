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
    const toolDict = dict.tools?.convertImageToLink

    return {
        title: toolDict?.meta?.title || "Convert Image to Link - Free Image to URL Converter Online | ImageToURL",
        description: toolDict?.meta?.description || "Convert any image to a shareable link instantly. Free online tool to convert images to URLs. No signup required. Best image to link converter online.",
        keywords: toolDict?.meta?.keywords || "convert image to link, image to link, convert image to url, image convert to link, image to link converter, image converter to link, make image into link",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/convert-image-to-link`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Convert Image to Link - Free Online Tool",
            description: toolDict?.meta?.description || "Convert any image to a shareable link instantly.",
            url: `${BASE_URL}/${locale}/tools/convert-image-to-link`,
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
    title: "Convert Image to Link",
    subtitle: "Free Online Image to URL Converter",
    description: "Convert any image to a shareable link in seconds. Upload JPG, PNG, GIF, or any image format and get an instant URL that works everywhere.",
    introduction: {
        title: "The Easiest Way to Convert Images to Shareable Links",
        paragraphs: [
            "Converting an image to a link is essential for modern digital communication. Whether you need to share a product photo in an email, embed a graphic on a website, or send an image through a messaging app without file size limits, having a direct URL makes everything simpler and more accessible.",
            "Our image to link converter instantly uploads your files to a secure cloud infrastructure and generates a permanent web address. Unlike email attachments that clutter inboxes or file transfers that expire, your image link remains accessible and can be shared across any platform—from social media to professional documents.",
            "This service is perfect for marketers embedding visuals in campaigns, developers integrating images into applications, or anyone who needs to share images without the hassle of file management. The conversion process takes seconds and requires no technical expertise or account creation.",
        ],
    },
    features: {
        title: "Why Use Our Image to Link Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support all image formats (JPG, PNG, GIF, WebP, SVG)",
            "Files up to 10MB supported",
            "Instant link generation",
            "Global CDN for fast delivery worldwide",
            "99.9% uptime guarantee",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Convert an Image to a Link",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop your image or click to browse. We support all popular formats including JPG, PNG, GIF, WebP, and SVG.",
            },
            {
                title: "Image is Converted",
                description: "Your image is instantly uploaded to our global CDN. A direct link is generated automatically in seconds.",
            },
            {
                title: "Copy & Share Your Link",
                description: "Copy the generated link and use it anywhere - websites, social media, emails, documents, and more.",
            },
        ],
    },
    useCases: {
        title: "Popular Ways to Use Image Links",
        items: [
            { title: "Email Newsletters", description: "Embed image links in marketing emails to bypass attachment limits and ensure visuals display correctly across all email clients." },
            { title: "Forum Posts & Comments", description: "Share images on Reddit, Stack Overflow, Discord, and other communities where direct uploads may not be supported." },
            { title: "Website & Blog Content", description: "Use image links in HTML img tags or Markdown syntax to add visuals to your web pages without managing file storage." },
            { title: "Online Marketplaces", description: "Add product photos to listings on eBay, Craigslist, Facebook Marketplace, and other selling platforms." },
            { title: "Customer Support", description: "Share screenshots and visual explanations with support teams or customers to resolve issues faster." },
            { title: "Collaborative Documents", description: "Insert image links into Google Docs, Notion pages, or project management tools like Trello and Asana." },
        ],
    },
    tips: {
        title: "Tips for Better Image Links",
        items: [
            "Compress large images before uploading to improve loading speed for viewers—aim for under 500KB when possible.",
            "Use meaningful filenames to keep track of your images when managing multiple uploads.",
            "Test your image link in a private browser window to confirm it loads correctly before sharing publicly.",
            "Sign in to get permanent links and organize your images into folders for easier management.",
            "For images with text, use PNG format to maintain crisp edges and readability.",
            "Consider the privacy of your images—links can be accessed by anyone who has them.",
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert an image to a link?",
                answer: "Simply upload your image using our converter. Your image will be hosted on our cloud, and you'll receive a shareable link that you can copy and use anywhere.",
            },
            {
                question: "Is this image to link converter free?",
                answer: "Yes, our service is completely free. Convert any image to a link without creating an account or paying anything.",
            },
            {
                question: "What does converting an image to a link mean?",
                answer: "When you convert an image to a link, we host your image on our servers and give you a URL (web address) that points to it. Anyone can view your image using this link.",
            },
            {
                question: "How do I make an image into a link?",
                answer: "Use our image to link converter - just upload your image and we'll generate a shareable link instantly. It's fast, free, and requires no technical knowledge.",
            },
            {
                question: "Can I use the image link on my website?",
                answer: "Absolutely! The links we generate are direct image URLs that work perfectly in HTML img tags, CSS, Markdown, and anywhere else that accepts image URLs.",
            },
            {
                question: "How long does the image link stay active?",
                answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep your images indefinitely and manage when they expire.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate image links" },
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG to URLs" },
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG to URLs" },
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
        title: "Convert Image to Link - Free Image to URL Converter Online | ImageToURL",
        description: "Convert any image to a shareable link instantly. Free online image to link converter with no signup.",
        keywords: "convert image to link, image to link, image convert to link, image to link converter",
    },
}

export default async function ConvertImageToLinkPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.convertImageToLink || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Convert Image to Link"
                description="Convert any image to a shareable link instantly. Free online image to URL converter."
                url={`/${locale}/tools/convert-image-to-link`}
                featureList={[
                    "Free image to link conversion",
                    "No signup required",
                    "Support all image formats",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["convert image to link", "image to link", "image converter to link", "make image into link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Convert Image to Link", url: `${BASE_URL}/${locale}/tools/convert-image-to-link` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
