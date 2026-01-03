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
    const toolDict = dict.tools?.jpegToUrl

    return {
        title: toolDict?.meta?.title || "JPEG to URL Converter - Free Online Tool | ImageToURL",
        description: toolDict?.meta?.description || "Convert JPEG images to shareable URLs instantly. Free online JPEG to URL converter with no signup required. Upload JPEG files up to 10MB and get instant links.",
        keywords: toolDict?.meta?.keywords || "jpeg to url, jpeg image to url, convert jpeg to url, jpeg url converter, jpeg link generator, jpeg image to url converter, jpeg image hosting",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/jpeg-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "JPEG to URL Converter - Free Online Tool",
            description: toolDict?.meta?.description || "Convert JPEG images to shareable URLs instantly.",
            url: `${BASE_URL}/${locale}/tools/jpeg-to-url`,
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
    title: "JPEG to URL Converter",
    subtitle: "Free Online JPEG Image Hosting",
    description: "Convert your JPEG images to shareable URLs instantly. JPEG is the most widely used image format for photographs. No signup required, just upload and share.",
    introduction: {
        title: "JPEG: The Universal Photo Format",
        paragraphs: [
            "JPEG (Joint Photographic Experts Group) has been the standard format for digital photographs since 1992. Its efficient compression makes it ideal for sharing photos online—balancing visual quality with file size in a way that works everywhere, from social media to email to websites.",
            "When you convert a JPEG to a URL, you're creating a permanent, shareable link to your photo hosted on our global CDN. This means anyone you share the link with can view your image instantly in their browser, without downloading attachments or dealing with file size limits.",
            "Whether you're sharing family photos, product images for your online store, or professional photography for your portfolio, JPEG URLs provide the most universally compatible way to make your images accessible online.",
        ],
    },
    features: {
        title: "Why Use Our JPEG to URL Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Full support for JPEG format",
            "Files up to 10MB supported",
            "Instant shareable links",
            "Global CDN for fast delivery",
            "Preserve JPEG quality",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Convert JPEG to URL",
        steps: [
            {
                title: "Upload Your JPEG",
                description: "Drag and drop your JPEG file or click to browse. We accept JPEG files up to 10MB.",
            },
            {
                title: "Get Your URL",
                description: "Your JPEG image is instantly uploaded to our global CDN. A shareable URL is generated automatically.",
            },
            {
                title: "Share Anywhere",
                description: "Copy the URL and use it anywhere - websites, social media, emails, or documents.",
            },
        ],
    },
    useCases: {
        title: "Common JPEG Hosting Scenarios",
        items: [
            { title: "Photo Sharing", description: "Share vacation photos, family pictures, or event images with friends and family via simple links." },
            { title: "E-commerce Products", description: "Host product photos for online marketplaces, listings, and shopping comparisons." },
            { title: "Real Estate Listings", description: "Share property photos with potential buyers or embed in listing platforms." },
            { title: "Portfolio Display", description: "Host photography portfolio images for sharing with clients or on personal websites." },
            { title: "Social Media Content", description: "Create shareable links for photos that work across all social platforms." },
            { title: "Email Newsletters", description: "Embed JPEG photos in email campaigns without attachment size limits." },
        ],
    },
    tips: {
        title: "Tips for JPEG Hosting",
        items: [
            "JPEG is ideal for photographs—use PNG instead for graphics with text or transparency.",
            "Optimize large JPEGs before uploading to reduce file size while maintaining quality.",
            "Use quality settings of 80-90% for web images—visually identical but much smaller.",
            "Name files descriptively for easier organization and searchability in your dashboard.",
            "Sign in for permanent URLs and to organize photos into albums or folders.",
            "For print-quality images, maintain higher resolution and quality settings.",
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert a JPEG image to a URL?",
                answer: "Simply drag and drop your JPEG file onto our upload zone or click to select a file. Your image will be instantly uploaded and you'll receive a shareable URL.",
            },
            {
                question: "What's the difference between JPEG and JPG?",
                answer: "JPEG and JPG are the same format - the only difference is the file extension. JPG is a shortened version due to old Windows limitations. Our converter supports both .jpeg and .jpg files.",
            },
            {
                question: "Is this JPEG to URL converter free?",
                answer: "Yes, our JPEG to URL converter is 100% free. You can upload JPEG images up to 10MB without creating an account.",
            },
            {
                question: "Will converting JPEG to URL reduce image quality?",
                answer: "No! We preserve the original quality of your JPEG images. The URL simply points to your hosted image without any recompression.",
            },
            {
                question: "Can I use the JPEG URL on my website?",
                answer: "Yes! The URLs we generate can be used anywhere - in HTML img tags, CSS backgrounds, social media, emails, and more.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "JPEG Format - Wikipedia", href: "https://en.wikipedia.org/wiki/JPEG", description: "Learn about JPEG compression and format specifications" },
            { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
            { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/choose-the-right-image-format", description: "Google's guide to choosing the right image format" },
        ],
    },
    meta: {
        title: "JPEG to URL Converter - Free Online Tool | ImageToURL",
        description: "Convert JPEG images to shareable URLs instantly. Free online JPEG to URL converter with no signup required.",
        keywords: "jpeg to url, jpeg image to url, convert jpeg to url, jpeg url converter, jpeg link generator",
    },
}

export default async function JpegToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.jpegToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="JPEG to URL Converter"
                description="Convert JPEG images to shareable URLs instantly. Free online image hosting for JPEG format."
                url={`/${locale}/tools/jpeg-to-url`}
                featureList={[
                    "Free JPEG to URL conversion",
                    "No signup required",
                    "Full JPEG format support",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["jpeg to url", "jpeg image hosting", "convert jpeg to url", "jpeg link generator"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "JPEG to URL", url: `${BASE_URL}/${locale}/tools/jpeg-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
