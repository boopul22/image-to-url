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
        title: "Image URL in React & Next.js - Display & Upload Images | ImageToURL",
        description: "Learn how to work with image URLs in React and Next.js. Handle image uploads, display remote images, fix 'image url not working' errors, and optimize images.",
        keywords: "image url react, react image upload, next js image url, image url not working in react, react image from url, display image from url react, react native image url",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/use-cases/react`,
        },
        openGraph: {
            title: "Image URL in React & Next.js - Display & Upload",
            description: "React and Next.js code examples for working with image URLs.",
            url: `/${locale}/use-cases/react`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultUseCaseContent = {
    title: "Image URLs in React & Next.js",
    subtitle: "Display, Upload & Optimize Images",
    description: "Complete guide to working with image URLs in React and Next.js applications. From displaying remote images to handling uploads and fixing common issues.",
    benefits: {
        title: "React Image URL Solutions",
        items: [
            {
                title: "Display Remote Images",
                description: "Use <img src={url} /> or Next.js Image component to display images from URLs with proper optimization.",
            },
            {
                title: "Handle Uploads",
                description: "Create file upload components that send images to our API and get shareable URLs back.",
            },
            {
                title: "Fix Loading Issues",
                description: "Solve common 'image not working' errors with proper CORS headers, domains, and error handling.",
            },
            {
                title: "Optimize Performance",
                description: "Use Next.js Image component with external URLs for automatic optimization and lazy loading.",
            },
        ],
    },
    steps: {
        title: "React Image Examples",
        items: [
            {
                title: "Display from URL",
                description: "<img src={imageUrl} alt='Description' onError={(e) => e.target.src = fallback} />",
            },
            {
                title: "Next.js Image",
                description: "<Image src={url} width={500} height={300} alt='...' /> // Add domain to next.config.js",
            },
            {
                title: "Upload Component",
                description: "const handleUpload = async (file) => { const formData = new FormData(); formData.append('file', file); ... }",
            },
            {
                title: "Preview Before Upload",
                description: "const preview = URL.createObjectURL(file); // Remember to revoke when unmounting",
            },
        ],
    },
    tips: {
        title: "React Image Tips",
        items: [
            "Add external domains to next.config.js for Next.js Image optimization",
            "Use onError handler to show fallback images when URLs fail",
            "Create object URLs for instant previews: URL.createObjectURL(file)",
            "Clean up object URLs in useEffect cleanup: URL.revokeObjectURL(url)",
            "Use loading='lazy' for images below the fold",
            "ImageToURL's CDN URLs work directly in React - no CORS issues",
        ],
    },
    faq: {
        title: "React Image FAQ",
        items: [
            {
                question: "Why is my image URL not working in React?",
                answer: "Common causes: CORS restrictions, incorrect URL format, or the image server blocking requests. ImageToURL's URLs include proper CORS headers and work directly in React apps.",
            },
            {
                question: "How do I use external images in Next.js?",
                answer: "Add the domain to next.config.js: images: { remotePatterns: [{ hostname: 'cdn.imagetourl.cloud' }] }. Then use the Next.js Image component.",
            },
            {
                question: "How do I upload an image in React and get a URL?",
                answer: "Create a form with file input, capture the file in onChange, create FormData, POST to our API, and store the returned URL in state to display.",
            },
            {
                question: "Can I preview an image before uploading in React?",
                answer: "Yes! Use URL.createObjectURL(file) to create a temporary preview URL. Remember to call URL.revokeObjectURL() when the component unmounts or the file changes.",
            },
            {
                question: "How do I handle image load errors in React?",
                answer: "Use the onError prop: <img src={url} onError={(e) => { e.target.src = '/fallback.png'; }} />. Consider using a state variable to track load status.",
            },
        ],
    },
    cta: {
        title: "Upload Images from Your React App",
        description: "Integrate our image hosting into your React or Next.js application in minutes.",
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "React Documentation", href: "https://react.dev/", description: "Official React documentation" },
            { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Working with images on the web" },
            { name: "Next.js Image Optimization", href: "https://nextjs.org/docs/app/building-your-application/optimizing/images", description: "Optimizing images in React/Next.js" },
        ],
    },
}

export default async function ReactPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.react || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="React Image to URL"
                description="Work with image URLs in React and Next.js applications."
                url={`/${locale}/use-cases/react`}
                featureList={[
                    "Display remote images",
                    "Handle file uploads",
                    "Next.js Image optimization",
                    "Error handling",
                    "Preview before upload",
                ]}
                keywords={["image url react", "react image upload", "next js image url", "react image from url"]}
            />
            <HowToJsonLd
                name="How to Upload and Display Images in React"
                description="React code examples for image handling and URL management"
                steps={[
                    { name: "Create Input", text: "<input type='file' onChange={handleFileChange} accept='image/*' />" },
                    { name: "Preview", text: "setPreview(URL.createObjectURL(file))" },
                    { name: "Upload", text: "const response = await fetch('/api/upload', { method: 'POST', body: formData })" },
                    { name: "Display", text: "<img src={imageUrl} alt='Uploaded image' />" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "React", url: `${BASE_URL}/${locale}/use-cases/react` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
