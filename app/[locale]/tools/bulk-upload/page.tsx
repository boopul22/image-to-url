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

  return {
    title: "Bulk Image Upload - Upload Multiple Images to URL | ImageToURL",
    description: "Upload multiple images at once and get shareable URLs. Free bulk image to URL converter. No signup required.",
    keywords: "bulk image upload, multiple image to url, batch image upload, bulk image hosting, multiple image converter",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/bulk-upload`,
    },
    openGraph: {
      title: "Bulk Image Upload - Upload Multiple Images to URL",
      description: "Upload multiple images at once and get shareable URLs instantly.",
      url: `${BASE_URL}/${locale}/tools/bulk-upload`,
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
  title: "Bulk Image Upload",
  subtitle: "Upload Multiple Images at Once",
  description: "Upload multiple images simultaneously and get shareable URLs for each. Save time with batch uploads.",
  features: {
    title: "Why Use Our Bulk Upload Tool?",
    items: [
      "Upload multiple images at once",
      "Get individual URLs for each",
      "100% free with no hidden costs",
      "No account required",
      "All formats supported",
      "Files up to 10MB each",
      "Fast parallel uploading",
      "Copy all URLs at once",
    ],
  },
  howItWorks: {
    title: "How Bulk Upload Works",
    steps: [
      {
        title: "Select Multiple Images",
        description: "Drag and drop multiple images or click to select several files at once.",
      },
      {
        title: "Automatic Upload",
        description: "All images upload in parallel for maximum speed. Watch the progress for each file.",
      },
      {
        title: "Get All URLs",
        description: "Copy individual URLs or all URLs at once. Perfect for galleries and batch processing.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How many images can I upload at once?",
        answer: "You can upload multiple images in one batch. Each file can be up to 10MB. Sign in for higher limits.",
      },
      {
        question: "What image formats are supported?",
        answer: "We support JPG, PNG, GIF, SVG, and WebP formats. All formats can be uploaded together in bulk.",
      },
      {
        question: "Is bulk upload free?",
        answer: "Yes! Our bulk upload feature is completely free. No signup required for basic usage.",
      },
      {
        question: "Can I copy all URLs at once?",
        answer: "Yes, after uploading you can copy all URLs to clipboard with one click, or copy them individually.",
      },
      {
        question: "How long are bulk uploaded images stored?",
        answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep images indefinitely.",
      },
    ],
  },
  relatedTools: {
    title: "Related Tools",
    tools: [
      { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
      { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
      { name: "GIF to URL", href: "/tools/gif-to-url", description: "Convert GIF images to URLs" },
    ],
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/image-optimization", description: "Google's guide to optimizing images for the web" },
      { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
      { name: "Cloudflare: Image CDN", href: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", description: "Understanding CDN for faster image delivery" },
    ],
  },
}

export default async function BulkUploadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.bulkUpload || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Bulk Image Upload"
        description="Upload multiple images at once and get shareable URLs. Free batch image hosting."
        url={`/${locale}/tools/bulk-upload`}
        featureList={[
          "Upload multiple images at once",
          "Individual URLs for each image",
          "No signup required",
          "All formats supported",
          "Fast parallel uploading",
          "Global CDN delivery",
        ]}
        keywords={["bulk image upload", "multiple image to url", "batch upload", "bulk image hosting"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "Bulk Upload", url: `${BASE_URL}/${locale}/tools/bulk-upload` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
