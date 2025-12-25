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
        title: "Image to URL Python - Convert Images to URLs in Python | ImageToURL",
        description: "Learn how to convert images to URLs using Python. Code examples for image upload, base64 conversion, and getting image URLs with requests and PIL.",
        keywords: "image to url python, python image to url, image to data url python, python upload image, python image hosting, convert image to url python, python base64 image",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/use-cases/python`,
        },
        openGraph: {
            title: "Image to URL Python - Convert Images in Python",
            description: "Python code examples for uploading images and getting shareable URLs.",
            url: `/${locale}/use-cases/python`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultUseCaseContent = {
    title: "Image to URL in Python",
    subtitle: "Upload & Convert Images with Python",
    description: "Complete guide to working with images and URLs in Python. Upload images to get URLs, convert to base64, and integrate image hosting into your Python applications.",
    benefits: {
        title: "Python Image to URL Solutions",
        items: [
            {
                title: "requests Library",
                description: "Use Python's requests library to upload images via multipart form data and get shareable URLs.",
            },
            {
                title: "Base64 Encoding",
                description: "Python's base64 module makes it easy to encode/decode images for embedding or transmission.",
            },
            {
                title: "PIL/Pillow Integration",
                description: "Process images with Pillow before uploading - resize, compress, convert formats, then upload.",
            },
            {
                title: "Async with aiohttp",
                description: "For high-performance apps, use aiohttp for async image uploads without blocking.",
            },
        ],
    },
    steps: {
        title: "Python Image Upload Examples",
        items: [
            {
                title: "Upload with requests",
                description: "import requests; files = {'file': open('image.jpg', 'rb')}; r = requests.post(url, files=files)",
            },
            {
                title: "Convert to Base64",
                description: "import base64; encoded = base64.b64encode(open('image.jpg', 'rb').read()).decode()",
            },
            {
                title: "Resize with Pillow",
                description: "from PIL import Image; img = Image.open('large.jpg'); img.thumbnail((800, 800)); img.save('small.jpg')",
            },
            {
                title: "Async Upload",
                description: "async with aiohttp.ClientSession() as session: await session.post(url, data=form)",
            },
        ],
    },
    tips: {
        title: "Python Image Tips",
        items: [
            "Use 'with open()' to ensure files are properly closed",
            "Pillow can convert between formats: img.save('output.png')",
            "Compress images before upload: img.save('out.jpg', quality=85)",
            "Handle large files with streaming: requests.post(url, data=generator)",
            "Validate images with Pillow: Image.open(file).verify()",
            "Our API returns JSON - use response.json()['url']",
        ],
    },
    faq: {
        title: "Python Image FAQ",
        items: [
            {
                question: "How do I upload an image and get a URL in Python?",
                answer: "Use the requests library: files = {'file': open('image.jpg', 'rb')}; response = requests.post('https://api.imagetourl.cloud/upload', files=files); url = response.json()['url']",
            },
            {
                question: "How do I convert an image to base64 in Python?",
                answer: "import base64; with open('image.jpg', 'rb') as f: encoded = base64.b64encode(f.read()).decode('utf-8'). Prefix with 'data:image/jpeg;base64,' for data URLs.",
            },
            {
                question: "Can I resize images before uploading in Python?",
                answer: "Yes! Use Pillow: from PIL import Image; img = Image.open('large.jpg'); img.thumbnail((max_width, max_height)); then upload the resized image.",
            },
            {
                question: "Does ImageToURL have a Python SDK?",
                answer: "While we don't have an official SDK yet, our REST API works great with requests or httpx. Simple POST with multipart form data returns your image URL.",
            },
            {
                question: "How do I handle image upload errors in Python?",
                answer: "Check response.status_code and handle exceptions: try: response.raise_for_status() except requests.HTTPError: handle_error(). Our API returns descriptive error messages.",
            },
        ],
    },
    cta: {
        title: "Try Image Upload in Python",
        description: "Get started with our simple API. Just a few lines of Python to upload and get URLs.",
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Python Requests Library", href: "https://requests.readthedocs.io/", description: "HTTP library for Python" },
            { name: "Python.org", href: "https://docs.python.org/3/", description: "Official Python documentation" },
            { name: "Real Python: Images", href: "https://realpython.com/python-requests/", description: "Working with images in Python" },
        ],
    },
}

export default async function PythonPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.python || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Python Image to URL"
                description="Convert images to URLs using Python. Code examples and API integration."
                url={`/${locale}/use-cases/python`}
                featureList={[
                    "requests library examples",
                    "Base64 encoding",
                    "Pillow integration",
                    "Async upload support",
                    "API integration examples",
                ]}
                keywords={["image to url python", "python image upload", "convert image to url python", "python image hosting"]}
            />
            <HowToJsonLd
                name="How to Upload Image and Get URL in Python"
                description="Python code examples for image hosting and URL generation"
                steps={[
                    { name: "Import requests", text: "import requests" },
                    { name: "Open file", text: "files = {'file': open('image.jpg', 'rb')}" },
                    { name: "POST request", text: "response = requests.post(upload_url, files=files)" },
                    { name: "Get URL", text: "image_url = response.json()['url']" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "Python", url: `${BASE_URL}/${locale}/use-cases/python` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
