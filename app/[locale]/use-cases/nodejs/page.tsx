import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { UseCaseTemplate } from "@/components/use-case-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd, HowToJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imagetourl.cloud"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params

    return {
        title: "Image to URL Node.js - Upload & Convert Images | ImageToURL",
        description: "Learn how to upload images and get URLs using Node.js. Code examples for image to base64 conversion, file uploads with multer, and API integration.",
        keywords: "image url to base64 nodejs, nodejs image upload, node image to url, image to base64 nodejs, convert image url to base64 nodejs, node js image hosting, nodejs upload image api",
        alternates: {
            canonical: `/${locale}/use-cases/nodejs`,
        },
        openGraph: {
            title: "Image to URL Node.js - Upload & Convert",
            description: "Node.js code examples for image uploads, base64 conversion, and URL generation.",
            url: `/${locale}/use-cases/nodejs`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultUseCaseContent = {
    title: "Image to URL in Node.js",
    subtitle: "Server-Side Image Processing & Uploads",
    description: "Complete guide to handling images in Node.js. Upload images to get URLs, convert between formats, work with base64, and build image processing APIs.",
    benefits: {
        title: "Node.js Image Solutions",
        items: [
            {
                title: "File Uploads with Multer",
                description: "Use multer middleware to handle multipart uploads, then forward images to our API for hosting.",
            },
            {
                title: "Base64 Conversion",
                description: "Convert image URLs to base64 or vice versa. Perfect for embedding images or processing data URIs.",
            },
            {
                title: "Image Processing",
                description: "Use Sharp or Jimp to resize, compress, and convert images before uploading for optimal delivery.",
            },
            {
                title: "API Integration",
                description: "Build your own image upload endpoint that uses ImageToURL as the backend for reliable hosting.",
            },
        ],
    },
    steps: {
        title: "Node.js Image Examples",
        items: [
            {
                title: "Upload with Fetch",
                description: "const formData = new FormData(); formData.append('file', fs.createReadStream('image.jpg')); await fetch(url, { method: 'POST', body: formData });",
            },
            {
                title: "Convert URL to Base64",
                description: "const resp = await fetch(imageUrl); const buffer = await resp.buffer(); const base64 = buffer.toString('base64');",
            },
            {
                title: "Multer Middleware",
                description: "const upload = multer({ storage: multer.memoryStorage() }); app.post('/upload', upload.single('file'), handler);",
            },
            {
                title: "Process with Sharp",
                description: "await sharp(input).resize(800, 600).jpeg({ quality: 80 }).toBuffer();",
            },
        ],
    },
    tips: {
        title: "Node.js Image Tips",
        items: [
            "Use streams for large files to avoid memory issues",
            "Sharp is faster than Jimp for image processing",
            "Set file size limits in multer to prevent abuse",
            "Use form-data package for multipart requests in Node.js < 18",
            "Node.js 18+ has native fetch and FormData support",
            "Our API accepts both buffers and streams",
        ],
    },
    faq: {
        title: "Node.js Image FAQ",
        items: [
            {
                question: "How do I convert an image URL to base64 in Node.js?",
                answer: "Fetch the image, get it as a buffer, then encode: const resp = await fetch(url); const buffer = Buffer.from(await resp.arrayBuffer()); const base64 = buffer.toString('base64');",
            },
            {
                question: "How do I upload an image from Node.js to get a URL?",
                answer: "Use node-fetch with form-data or native fetch in Node 18+: const form = new FormData(); form.append('file', fs.createReadStream('img.jpg')); await fetch(uploadUrl, { method: 'POST', body: form });",
            },
            {
                question: "How do I handle image uploads in Express?",
                answer: "Use multer middleware: const upload = multer(); app.post('/upload', upload.single('image'), (req, res) => { /* req.file contains the upload */ });",
            },
            {
                question: "Should I process images before uploading?",
                answer: "Yes! Use Sharp to resize and compress: await sharp(file).resize(1200).jpeg({ quality: 85 }).toBuffer(). This reduces storage costs and improves load times.",
            },
            {
                question: "Can I download an image from a URL in Node.js?",
                answer: "Yes! Use fetch to get the image, then save with fs: const resp = await fetch(url); const buffer = Buffer.from(await resp.arrayBuffer()); fs.writeFileSync('image.jpg', buffer);",
            },
        ],
    },
    cta: {
        title: "Build Image Features with Node.js",
        description: "Integrate our image hosting API into your Node.js backend. Simple, reliable, and scalable.",
    },
}

export default async function NodejsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.nodejs || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Node.js Image to URL"
                description="Upload and convert images to URLs using Node.js. Server-side image processing examples."
                url={`/${locale}/use-cases/nodejs`}
                featureList={[
                    "File uploads with Multer",
                    "Base64 conversion",
                    "Image processing with Sharp",
                    "API integration",
                    "Stream handling",
                ]}
                keywords={["node image to url", "nodejs image upload", "image to base64 nodejs", "node js image hosting"]}
            />
            <HowToJsonLd
                name="How to Upload Image and Get URL in Node.js"
                description="Node.js code examples for image hosting and URL generation"
                steps={[
                    { name: "Install Dependencies", text: "npm install node-fetch form-data" },
                    { name: "Create FormData", text: "const form = new FormData(); form.append('file', fs.createReadStream('image.jpg'));" },
                    { name: "Upload", text: "const response = await fetch(uploadUrl, { method: 'POST', body: form });" },
                    { name: "Get URL", text: "const { url } = await response.json();" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "Node.js", url: `${BASE_URL}/${locale}/use-cases/nodejs` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
