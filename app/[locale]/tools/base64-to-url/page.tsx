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
    title: "Base64 to URL Converter - Convert Base64 Images | ImageToURL",
    description: "Convert Base64 encoded images to shareable URLs. Free online Base64 image decoder and hosting. No signup required.",
    keywords: "base64 to url, base64 image to url, convert base64 to url, base64 decoder, image base64 converter",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/base64-to-url`,
    },
    openGraph: {
      title: "Base64 to URL Converter - Convert Base64 Images",
      description: "Convert Base64 encoded images to shareable URLs instantly.",
      url: `${BASE_URL}/${locale}/tools/base64-to-url`,
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
  title: "Base64 to URL Converter",
  subtitle: "Convert Base64 Images to Shareable Links",
  description: "Convert Base64 encoded images to clean, shareable URLs. Perfect for developers working with data URIs.",
  introduction: {
    title: "Why Convert Base64 to Hosted URLs?",
    paragraphs: [
      "Base64 encoding is a common technique for embedding images directly in HTML, CSS, or JSON—but it comes with significant drawbacks. Those long strings of characters bloat your files, can't be cached separately by browsers, and make your code harder to read and maintain.",
      "Converting Base64 images to hosted URLs solves all these problems. A 10KB image that becomes a 13KB Base64 string in your code is replaced by a 50-character URL that loads from a fast CDN. Your HTML shrinks, your pages load faster, and browsers can cache images independently from your code.",
      "Our converter is built for developers who need to clean up legacy code, optimize build sizes, or simply want a cleaner separation between content and code. Upload any Base64-encoded image—whether PNG, JPG, GIF, or WebP—and get a production-ready URL in seconds.",
    ],
  },
  features: {
    title: "Why Use Our Base64 to URL Converter?",
    items: [
      "Converts data URIs to clean URLs",
      "Supports all image formats",
      "100% free with no hidden costs",
      "No account or signup required",
      "Perfect for developers",
      "Reduces HTML/CSS file size",
      "Global CDN for fast delivery",
      "Instant URL generation",
    ],
  },
  howItWorks: {
    title: "How to Convert Base64 to URL",
    steps: [
      {
        title: "Upload Your Image",
        description: "Upload the image file (we convert it from any format) or paste Base64 data directly.",
      },
      {
        title: "Get Your URL",
        description: "Your image is decoded and uploaded to our CDN. A clean URL replaces the long Base64 string.",
      },
      {
        title: "Use Everywhere",
        description: "Replace bloated Base64 strings in your code with clean, fast-loading URLs.",
      },
    ],
  },
  useCases: {
    title: "When to Convert Base64 to URLs",
    items: [
      { title: "Legacy Code Cleanup", description: "Replace inline Base64 images in old codebases to reduce bundle sizes and improve maintainability." },
      { title: "Build Optimization", description: "Move assets out of JavaScript bundles to enable better caching and faster initial page loads." },
      { title: "API Response Slimming", description: "Convert Base64 images in JSON responses to URL references for faster API performance." },
      { title: "Email Template Fixes", description: "Replace Base64 images that break in some email clients with hosted URLs for reliable rendering." },
      { title: "CMS Migration", description: "Extract embedded images from content during platform migrations to proper hosted storage." },
      { title: "Performance Audits", description: "Identify and externalize inline images flagged by Lighthouse or PageSpeed Insights." },
    ],
  },
  tips: {
    title: "Developer Best Practices",
    items: [
      "Base64 increases file size by ~33%—only use inline encoding for images under 2KB where HTTP overhead matters.",
      "Use our bulk upload if you have multiple Base64 images to convert—process them all at once.",
      "Check your build tools for automatic Base64 inlining that might be counterproductive for larger assets.",
      "Consider SVG sprites instead of Base64 for icon systems—they're more flexible and often smaller.",
      "After converting, update all references in your code and test thoroughly before deploying.",
      "Sign in to organize converted assets and maintain a mapping between old Base64 and new URLs.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is Base64 image encoding?",
        answer: "Base64 is a way to encode binary image data as text. It's often used to embed images directly in HTML/CSS but creates very long strings.",
      },
      {
        question: "Why convert Base64 to URL?",
        answer: "Base64 images bloat your HTML/CSS files. Converting to URLs reduces file size, improves caching, and speeds up page loads.",
      },
      {
        question: "What Base64 formats are supported?",
        answer: "We support Base64 encoded JPG, PNG, GIF, WebP, and SVG images. Just upload and we'll convert it.",
      },
      {
        question: "Is this tool free for developers?",
        answer: "Yes! Our Base64 to URL converter is 100% free. No API keys or signups required.",
      },
      {
        question: "Can I use this for production websites?",
        answer: "Absolutely! Our CDN is production-ready with 99.9% uptime and global edge locations.",
      },
    ],
  },
  relatedTools: {
    title: "Related Tools",
    tools: [
      { name: "HTML Images", href: "/use-cases/html", description: "Image URLs for HTML & CSS" },
      { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
      { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
    ],
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "Base64 - Wikipedia", href: "https://en.wikipedia.org/wiki/Base64", description: "Learn about Base64 encoding" },
      { name: "MDN: Data URLs", href: "https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data", description: "Understanding data URIs in web development" },
      { name: "Web.dev: Image Best Practices", href: "https://web.dev/articles/image-optimization", description: "Why URLs are better than Base64 for images" },
    ],
  },
}

export default async function Base64ToUrlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.base64ToUrl || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Base64 to URL Converter"
        description="Convert Base64 encoded images to shareable URLs. Free online Base64 decoder."
        url={`/${locale}/tools/base64-to-url`}
        featureList={[
          "Free Base64 to URL conversion",
          "Supports all image formats",
          "No signup required",
          "Perfect for developers",
          "Reduces file size",
          "Global CDN delivery",
        ]}
        keywords={["base64 to url", "base64 image converter", "data uri to url", "base64 decoder"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "Base64 to URL", url: `${BASE_URL}/${locale}/tools/base64-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
