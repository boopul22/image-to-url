import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { ToolPageTemplate } from "@/components/tool-page-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imagetourl.cloud"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: "PNG to URL Converter - Free Online Tool | ImageToURL",
    description: "Convert PNG images to shareable URLs instantly. Free online PNG to URL converter with transparent image support. No signup required.",
    keywords: "png to url, convert png to url, png image to url converter, png link generator, transparent png hosting",
    alternates: {
      canonical: `/${locale}/tools/png-to-url`,
    },
    openGraph: {
      title: "PNG to URL Converter - Free Online Tool",
      description: "Convert PNG images to shareable URLs instantly with transparent image support.",
      url: `/${locale}/tools/png-to-url`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
    },
  }
}

const defaultToolContent = {
  title: "PNG to URL Converter",
  subtitle: "Free Online PNG Image Hosting with Transparency Support",
  description: "Convert your PNG images to shareable URLs instantly. Perfect for logos, icons, and images with transparent backgrounds.",
  features: {
    title: "Why Use Our PNG to URL Converter?",
    items: [
      "Full transparency support preserved",
      "100% free with no hidden costs",
      "No account or signup required",
      "High-quality PNG compression",
      "Files up to 10MB supported",
      "Instant shareable links",
      "Global CDN for fast delivery",
      "Perfect for logos and icons",
    ],
  },
  howItWorks: {
    title: "How to Convert PNG to URL",
    steps: [
      {
        title: "Upload Your PNG",
        description: "Drag and drop your PNG file or click to browse. Transparency is fully preserved.",
      },
      {
        title: "Get Your URL",
        description: "Your PNG is instantly uploaded to our global CDN. A shareable URL is generated automatically.",
      },
      {
        title: "Share Anywhere",
        description: "Use the URL in websites, apps, or documents. Transparent backgrounds work perfectly.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does the PNG to URL converter preserve transparency?",
        answer: "Yes! Our converter fully preserves PNG transparency. Your transparent backgrounds will remain intact in the hosted image.",
      },
      {
        question: "Is this PNG to URL converter free?",
        answer: "Yes, our PNG to URL converter is 100% free. Upload PNG images up to 10MB without creating an account.",
      },
      {
        question: "Can I use PNG URLs for my website logo?",
        answer: "Absolutely! PNG URLs work great for logos, icons, and any images that need transparent backgrounds in HTML or CSS.",
      },
      {
        question: "What's the maximum PNG file size?",
        answer: "You can upload PNG files up to 10MB. For larger files, consider compressing them first.",
      },
      {
        question: "How long will my PNG URL stay active?",
        answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep your images indefinitely.",
      },
    ],
  },
  relatedTools: {
    title: "Related Tools",
    tools: [
      { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
      { name: "SVG to URL", href: "/tools/svg-to-url", description: "Convert SVG files to URLs" },
      { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
    ],
  },
}

export default async function PngToUrlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.pngToUrl || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="PNG to URL Converter"
        description="Convert PNG images to shareable URLs with full transparency support. Free online image hosting."
        url={`/${locale}/tools/png-to-url`}
        featureList={[
          "Free PNG to URL conversion",
          "Full transparency support",
          "No signup required",
          "Up to 10MB file size",
          "Instant shareable links",
          "Global CDN delivery",
        ]}
        keywords={["png to url", "convert png to url", "png hosting", "transparent png url"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "PNG to URL", url: `${BASE_URL}/${locale}/tools/png-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
