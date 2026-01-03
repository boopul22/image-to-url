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
    const toolDict = dict.tools?.pdfToUrl

    return {
        title: toolDict?.meta?.title || "PDF to URL Converter - Free Online PDF Link Generator | ImageToURL",
        description: toolDict?.meta?.description || "Convert PDF files to shareable URLs instantly. Free online PDF to URL converter - upload your PDF and get an instant link. No signup required. Best free PDF to link converter.",
        keywords: toolDict?.meta?.keywords || "pdf to url, pdf to url converter, convert pdf to url, pdf to link converter, pdf link generator, pdf to url free, pdf to link free, how to convert pdf to url",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/pdf-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "PDF to URL Converter - Free Online Tool",
            description: toolDict?.meta?.description || "Convert PDF files to shareable URLs instantly.",
            url: `${BASE_URL}/${locale}/tools/pdf-to-url`,
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
    title: "PDF to URL Converter",
    subtitle: "Free Online PDF Link Generator",
    description: "Convert your PDF files to shareable URLs instantly. Upload any PDF document and get a direct link that works anywhere - perfect for sharing documents, resumes, reports, and more.",
    features: {
        title: "Why Use Our PDF to URL Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support for PDF files up to 10MB",
            "Instant shareable links",
            "Global CDN for fast delivery",
            "99.9% uptime guarantee",
            "Secure HTTPS links",
            "Links work on any device",
        ],
    },
    howItWorks: {
        title: "How to Convert PDF to URL",
        steps: [
            {
                title: "Upload Your PDF",
                description: "Drag and drop your PDF file or click to browse. We accept PDF documents up to 10MB in size.",
            },
            {
                title: "Get Your URL",
                description: "Your PDF is instantly uploaded to our global CDN. A shareable URL is generated automatically in seconds.",
            },
            {
                title: "Share Anywhere",
                description: "Copy the URL and share it via email, social media, messaging apps, or embed it on websites.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert a PDF to a URL?",
                answer: "Simply drag and drop your PDF file onto our upload zone or click to select a file. Your PDF will be instantly uploaded and you'll receive a shareable URL that you can copy and use anywhere.",
            },
            {
                question: "Is this PDF to URL converter free?",
                answer: "Yes, our PDF to URL converter is 100% free. You can upload PDF files up to 10MB without creating an account. There are no hidden fees or premium features required.",
            },
            {
                question: "How long will my PDF URL stay active?",
                answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep your PDFs indefinitely and manage expiration times according to your needs.",
            },
            {
                question: "Can I share the PDF link in emails and documents?",
                answer: "Absolutely! The URL we generate is a direct link to your PDF. You can paste it in emails, documents, chat messages, or anywhere else that accepts links.",
            },
            {
                question: "Is my PDF secure when uploaded?",
                answer: "Yes, all uploads are encrypted using HTTPS during transit and stored securely. We don't share or sell your files. You can set expiration times to automatically delete files.",
            },
            {
                question: "What's the maximum PDF file size allowed?",
                answer: "You can upload PDF files up to 10MB in size. For larger documents, consider compressing your PDF first or sign in for higher limits.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Image to URL", href: "/", description: "Convert images to URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple files at once" },
            { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "PDF Format - Wikipedia", href: "https://en.wikipedia.org/wiki/PDF", description: "Learn about PDF format specifications" },
            { name: "Adobe PDF Guide", href: "https://www.adobe.com/acrobat/about-adobe-pdf.html", description: "Official Adobe PDF documentation" },
            { name: "MDN: PDF in Web", href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", description: "Working with documents on the web" },
        ],
    },
    meta: {
        title: "PDF to URL Converter - Free Online PDF Link Generator | ImageToURL",
        description: "Convert PDF files to shareable URLs instantly. Free online PDF to URL converter with no signup required.",
        keywords: "pdf to url, pdf to url converter, convert pdf to url, pdf to link converter, pdf link generator",
    },
}

export default async function PdfToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.pdfToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="PDF to URL Converter"
                description="Convert PDF files to shareable URLs instantly. Free online PDF link generator."
                url={`/${locale}/tools/pdf-to-url`}
                featureList={[
                    "Free PDF to URL conversion",
                    "No signup required",
                    "Support for PDF files",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN delivery",
                ]}
                keywords={["pdf to url", "pdf to link", "convert pdf to url", "pdf link generator"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "PDF to URL", url: `${BASE_URL}/${locale}/tools/pdf-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
