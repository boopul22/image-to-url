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
    const toolDict = dict.tools?.imageEmbedCode || defaultToolContent

    return {
        title: toolDict?.meta?.title || "Image Embed Code Generator - HTML, BBCode, Markdown | ImageToURL",
        description: toolDict?.meta?.description || "Generate embed codes for your images in HTML, BBCode, Markdown, and more. Copy-paste ready code snippets for websites, forums, and documentation.",
        keywords: toolDict?.meta?.keywords || "image embed code, html image code, bbcode image, markdown image, embed image generator",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/image-embed-code`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Image Embed Code Generator",
            description: toolDict?.meta?.description || "Generate embed codes for images in multiple formats.",
            url: `${BASE_URL}/${locale}/tools/image-embed-code`,
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
    title: "Image Embed Code Generator",
    subtitle: "Get Ready-to-Use Code Snippets",
    description: "Upload an image and get instant embed codes in HTML, BBCode, Markdown, and more. Perfect for websites, forums, GitHub, and documentation.",
    introduction: {
        title: "Embed Images Anywhere with Ready-Made Code",
        paragraphs: [
            "Different platforms require different code formats for embedding images. A website needs HTML, a forum post needs BBCode, a GitHub README needs Markdown. Our embed code generator gives you all these formats instantly from a single image upload.",
            "Instead of manually writing code or hunting for the right syntax, simply upload your image and copy the exact code you need. We provide properly formatted snippets with correct attributes, escaping, and best practices built in—no typos, no broken tags.",
            "Whether you're updating documentation, posting to forums, adding images to your website, or formatting a README, our tool eliminates the friction between having an image and embedding it correctly. Upload once, get code for every platform.",
        ],
    },
    features: {
        title: "Embed Formats Available",
        items: [
            "HTML <img> tag",
            "HTML with link wrapper",
            "BBCode for forums",
            "Markdown for GitHub/docs",
            "CSS background-image",
            "Direct URL link",
            "Thumbnail with link",
            "Responsive HTML code",
        ],
    },
    howItWorks: {
        title: "How to Get Image Embed Code",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop any image file or click to browse. All major formats supported.",
            },
            {
                title: "Choose Format",
                description: "Select the embed format you need - HTML, BBCode, Markdown, CSS, or others.",
            },
            {
                title: "Copy & Embed",
                description: "Click to copy the generated code and paste it directly into your website, forum, or document.",
            },
        ],
    },
    useCases: {
        title: "Where to Use Embed Codes",
        items: [
            { title: "Website Development", description: "Get HTML img tags with proper alt text and dimensions for SEO-friendly image embedding." },
            { title: "Forum Posts", description: "Copy BBCode for phpBB, vBulletin, and other popular forum platforms." },
            { title: "GitHub Documentation", description: "Use Markdown format for README files, wikis, and issue descriptions." },
            { title: "Email Signatures", description: "Get HTML that works in email clients for professional image-based signatures." },
            { title: "CMS Content", description: "Paste HTML or Markdown into WordPress, Ghost, Notion, and other content platforms." },
            { title: "CSS Backgrounds", description: "Get CSS background-image code for headers, hero sections, and design elements." },
        ],
    },
    tips: {
        title: "Embed Code Best Practices",
        items: [
            "Always include alt text for accessibility—our HTML includes a placeholder you can customize.",
            "Use responsive HTML for images that need to scale with their container on different devices.",
            "For forums, test your BBCode in a preview before posting to ensure it renders correctly.",
            "Markdown syntax varies slightly between platforms—test in your target site first.",
            "CSS background images don't have alt text—use them for decorative images only.",
            "Sign in to ensure your embed codes continue working permanently without expiration.",
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "What embed formats do you support?",
                answer: "We generate code for HTML, BBCode (for forums), Markdown (for GitHub, Reddit, docs), CSS background-image, and direct URL links.",
            },
            {
                question: "How do I embed an image in HTML?",
                answer: "Upload your image, copy the HTML code (e.g., <img src=\"url\" alt=\"description\">), and paste it into your HTML file.",
            },
            {
                question: "What is BBCode?",
                answer: "BBCode is a markup language used in forums and message boards. We generate [img]url[/img] format that works on most forums.",
            },
            {
                question: "How do I embed images in Markdown?",
                answer: "Use our Markdown format: ![alt text](image-url). This works in GitHub README files, Reddit, and many documentation sites.",
            },
            {
                question: "Can I get responsive embed code?",
                answer: "Yes! We provide responsive HTML code that automatically adjusts to container width while maintaining aspect ratio.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate direct image links" },
            { name: "Image to Data URL", href: "/tools/image-to-data-url", description: "Embed images as base64" },
            { name: "URL to QR Code", href: "/tools/url-to-qr-code", description: "Generate QR codes from URLs" },
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
        title: "Image Embed Code Generator - HTML, BBCode, Markdown | ImageToURL",
        description: "Generate embed codes for your images in HTML, BBCode, Markdown, and more formats.",
        keywords: "image embed code, html image code, bbcode image, markdown image, embed generator",
    },
}

export default async function ImageEmbedCodePage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.imageEmbedCode || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Image Embed Code Generator"
                description="Generate ready-to-use embed codes for images in HTML, BBCode, Markdown, and more formats."
                url={`/${locale}/tools/image-embed-code`}
                featureList={[
                    "HTML embed code",
                    "BBCode for forums",
                    "Markdown for docs",
                    "CSS background-image",
                    "Responsive HTML",
                    "Copy with one click",
                ]}
                keywords={["image embed code", "html image", "bbcode", "markdown image", "embed generator"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Image Embed Code", url: `${BASE_URL}/${locale}/tools/image-embed-code` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
