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
    const toolDict = dict.tools?.imageToDataUrl || defaultToolContent

    return {
        title: toolDict?.meta?.title || "Image to Data URL Converter - Base64 Encoder | ImageToURL",
        description: toolDict?.meta?.description || "Convert images to Data URLs (base64) for embedding directly in HTML, CSS, or JavaScript. Free online tool, no upload required.",
        keywords: toolDict?.meta?.keywords || "image to data url, base64 image converter, data uri generator, embed image base64, inline image",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/image-to-data-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Image to Data URL Converter - Base64 Encoder",
            description: toolDict?.meta?.description || "Convert images to Data URLs for embedding in code.",
            url: `${BASE_URL}/${locale}/tools/image-to-data-url`,
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
    title: "Image to Data URL",
    subtitle: "Convert Images to Base64 Data URIs",
    description: "Convert images to Data URLs (base64 encoded) that can be embedded directly in HTML, CSS, or JavaScript. No external hosting needed - the image data is included inline.",
    features: {
        title: "Why Use Data URLs?",
        items: [
            "Embed images directly in code",
            "No external HTTP requests",
            "Faster page loads for small images",
            "Works in HTML, CSS, and JS",
            "Perfect for email signatures",
            "No server hosting required",
            "Privacy - no tracking",
            "Works offline",
        ],
    },
    howItWorks: {
        title: "How to Convert Image to Data URL",
        steps: [
            {
                title: "Upload Your Image",
                description: "Drag and drop any image file. We support JPG, PNG, GIF, WebP, SVG, and more.",
            },
            {
                title: "Get Data URL",
                description: "Your image is converted to a base64-encoded Data URL. This contains the entire image data inline.",
            },
            {
                title: "Copy & Use",
                description: "Copy the Data URL and use it directly in img src, CSS background-image, or JavaScript.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "What is a Data URL?",
                answer: "A Data URL (or Data URI) is a way to embed file content directly in a URL string using base64 encoding. Instead of linking to an external file, the file data is included inline.",
            },
            {
                question: "When should I use Data URLs?",
                answer: "Data URLs are ideal for small images (under 10KB), email signatures, single-file HTML documents, and when you want to reduce HTTP requests.",
            },
            {
                question: "Are Data URLs good for large images?",
                answer: "No, Data URLs increase file size by ~33% due to base64 encoding. For large images, use regular hosted URLs instead.",
            },
            {
                question: "How do I use a Data URL in HTML?",
                answer: "Simply use the Data URL as the src attribute: <img src=\"data:image/png;base64,...\" />. The browser will decode and display the image.",
            },
            {
                question: "Can I use Data URLs in CSS?",
                answer: "Yes! Use it in background-image: url('data:image/png;base64,...'); This is great for small icons and patterns.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Base64 to URL", href: "/tools/base64-to-url", description: "Convert base64 to hosted URL" },
            { name: "Image Embed Code", href: "/tools/image-embed-code", description: "Get HTML embed snippets" },
            { name: "Image Link Generator", href: "/tools/image-link-generator", description: "Generate hosted image links" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "MDN: Data URLs", href: "https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data", description: "Understanding data URIs in web development" },
            { name: "Base64 Encoding - Wikipedia", href: "https://en.wikipedia.org/wiki/Base64", description: "Learn about Base64 encoding" },
            { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/image-optimization", description: "When to use data URLs vs regular URLs" },
        ],
    },
    meta: {
        title: "Image to Data URL Converter - Base64 Encoder | ImageToURL",
        description: "Convert images to Data URLs (base64) for embedding directly in HTML, CSS, or JavaScript.",
        keywords: "image to data url, base64 image converter, data uri generator, embed image base64",
    },
}

export default async function ImageToDataUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.imageToDataUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Image to Data URL Converter"
                description="Convert images to base64 Data URLs for embedding directly in HTML, CSS, or JavaScript code."
                url={`/${locale}/tools/image-to-data-url`}
                featureList={[
                    "Base64 encoding",
                    "Data URL generation",
                    "Works in HTML/CSS/JS",
                    "No hosting required",
                    "Offline compatible",
                    "All image formats supported",
                ]}
                keywords={["image to data url", "base64 converter", "data uri", "inline image"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Image to Data URL", url: `${BASE_URL}/${locale}/tools/image-to-data-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
