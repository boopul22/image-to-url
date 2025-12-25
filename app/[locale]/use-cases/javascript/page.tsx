import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { UseCaseTemplate } from "@/components/use-case-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd, HowToJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imagetourl.cloud"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params

    return {
        title: "Image to URL JavaScript - Convert Images to URLs in JS | ImageToURL",
        description: "Learn how to convert images to URLs using JavaScript. Code examples for image to URL conversion, base64 to URL, and uploading images to get URLs in Node.js and browsers.",
        keywords: "image to url javascript, convert image to url javascript, image url javascript, base64 image to url javascript, javascript image upload, image to data url javascript, image url to blob javascript",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/use-cases/javascript`,
        },
        openGraph: {
            title: "Image to URL JavaScript - Convert Images in JS",
            description: "JavaScript code examples for converting images to URLs and working with image data.",
            url: `/${locale}/use-cases/javascript`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultUseCaseContent = {
    title: "Image to URL in JavaScript",
    subtitle: "Convert, Upload & Manage Images with JS",
    description: "Everything you need to work with images and URLs in JavaScript. From converting files to URLs, handling base64, to uploading images programmatically.",
    benefits: {
        title: "JavaScript Image to URL Solutions",
        items: [
            {
                title: "File to Data URL",
                description: "Use FileReader to convert uploaded images to data URLs (base64) for previews and local processing.",
            },
            {
                title: "Upload to Get URL",
                description: "Send images to our API and receive shareable URLs that work anywhere on the web.",
            },
            {
                title: "Base64 Conversion",
                description: "Convert between base64 strings and blob/file objects. Handle encoded image data efficiently.",
            },
            {
                title: "Blob URL Creation",
                description: "Create temporary object URLs from blobs for image previews without server uploads.",
            },
        ],
    },
    steps: {
        title: "Common JavaScript Image Operations",
        items: [
            {
                title: "Convert File to Data URL",
                description: "const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => console.log(reader.result);",
            },
            {
                title: "Create Blob URL",
                description: "const blobUrl = URL.createObjectURL(file); // Use for previews, revoke when done",
            },
            {
                title: "Upload to ImageToURL",
                description: "const formData = new FormData(); formData.append('file', file); fetch('/api/upload', { method: 'POST', body: formData });",
            },
            {
                title: "Base64 to Blob",
                description: "fetch(dataUrl).then(r => r.blob()); // Convert base64 data URL to blob",
            },
        ],
    },
    tips: {
        title: "JavaScript Image Tips",
        items: [
            "Use URL.createObjectURL() for quick previews without base64 overhead",
            "Always call URL.revokeObjectURL() to free memory when done",
            "FileReader is async - use promises or async/await for cleaner code",
            "Validate file types: file.type.startsWith('image/')",
            "Compress images client-side before upload to save bandwidth",
            "Our API returns direct URLs - no additional processing needed",
        ],
    },
    faq: {
        title: "JavaScript Image FAQ",
        items: [
            {
                question: "How do I convert an image to URL in JavaScript?",
                answer: "You can use FileReader.readAsDataURL() for base64 data URLs, URL.createObjectURL() for temporary blob URLs, or upload to an image hosting service like ImageToURL to get a permanent shareable URL.",
            },
            {
                question: "What's the difference between data URL and blob URL?",
                answer: "Data URLs contain the entire image as base64 text and are portable but large. Blob URLs are temporary references that only work in the current session but are more memory-efficient.",
            },
            {
                question: "How do I upload an image and get a URL using JavaScript?",
                answer: "Create a FormData object, append your file, and POST to an upload API. ImageToURL's API returns a direct URL: fetch('/api/upload', { method: 'POST', body: formData }).then(r => r.json())",
            },
            {
                question: "Can I convert base64 to a file URL in JavaScript?",
                answer: "Yes! Convert base64 to blob first: fetch(base64String).then(r => r.blob()), then upload the blob to get a permanent URL, or use URL.createObjectURL(blob) for a temporary URL.",
            },
            {
                question: "Does ImageToURL have a JavaScript API?",
                answer: "Yes, our API accepts multipart form data uploads and returns JSON with the image URL. Works with fetch, axios, or any HTTP client.",
            },
        ],
    },
    cta: {
        title: "Try Our Image Upload API",
        description: "Get started with our simple API. Upload images and get URLs in your JavaScript apps.",
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Node.js Documentation", href: "https://nodejs.org/docs/", description: "Official Node.js documentation" },
            { name: "MDN: Fetch API", href: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API", description: "Modern way to make HTTP requests" },
            { name: "Web.dev: Images", href: "https://web.dev/articles/image-optimization", description: "Image optimization best practices" },
        ],
    },
}

export default async function JavaScriptPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.javascript || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="JavaScript Image to URL"
                description="Convert images to URLs using JavaScript. Code examples and API integration."
                url={`/${locale}/use-cases/javascript`}
                featureList={[
                    "File to data URL conversion",
                    "Upload to get permanent URLs",
                    "Base64 handling",
                    "Blob URL creation",
                    "API integration examples",
                ]}
                keywords={["image to url javascript", "javascript image upload", "convert image to url js", "base64 image javascript"]}
            />
            <HowToJsonLd
                name="How to Convert Image to URL in JavaScript"
                description="JavaScript code examples for image to URL conversion"
                steps={[
                    { name: "Get File", text: "Get the image file from input or drag-drop" },
                    { name: "Create FormData", text: "const formData = new FormData(); formData.append('file', file);" },
                    { name: "Upload", text: "fetch('/api/upload', { method: 'POST', body: formData })" },
                    { name: "Get URL", text: "Parse the response to get your image URL" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "JavaScript", url: `${BASE_URL}/${locale}/use-cases/javascript` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
