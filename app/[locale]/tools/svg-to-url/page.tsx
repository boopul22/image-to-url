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
    title: "SVG to URL Converter - Free Vector Image Hosting | ImageToURL",
    description: "Convert SVG vector images to shareable URLs instantly. Free online SVG hosting with perfect scalability. No signup required.",
    keywords: "svg to url, convert svg to url, svg image hosting, svg link generator, vector image to url",
    alternates: {
      canonical: `/${locale}/tools/svg-to-url`,
    },
    openGraph: {
      title: "SVG to URL Converter - Free Vector Image Hosting",
      description: "Convert SVG vector images to shareable URLs instantly with perfect scalability.",
      url: `/${locale}/tools/svg-to-url`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
    },
  }
}

const defaultToolContent = {
  title: "SVG to URL Converter",
  subtitle: "Free Vector Image Hosting",
  description: "Convert your SVG vector images to shareable URLs instantly. Perfect scalability at any size.",
  features: {
    title: "Why Use Our SVG to URL Converter?",
    items: [
      "Perfect scalability preserved",
      "Ideal for logos and icons",
      "100% free with no hidden costs",
      "No account or signup required",
      "Small file sizes maintained",
      "Works at any resolution",
      "Global CDN for fast delivery",
      "HTML and CSS compatible",
    ],
  },
  howItWorks: {
    title: "How to Convert SVG to URL",
    steps: [
      {
        title: "Upload Your SVG",
        description: "Drag and drop your SVG file or click to browse. Vector quality is fully preserved.",
      },
      {
        title: "Get Your URL",
        description: "Your SVG is instantly uploaded to our global CDN. A shareable URL is generated.",
      },
      {
        title: "Use Anywhere",
        description: "Embed in HTML, use in CSS, or link directly. Scales perfectly at any size.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Will my SVG remain scalable?",
        answer: "Yes! SVG files are vector-based and remain perfectly scalable at any size when hosted with us.",
      },
      {
        question: "Can I use SVG URLs in HTML?",
        answer: "Absolutely! Use the URL in img tags, object tags, or even inline. SVGs work great on websites.",
      },
      {
        question: "Is SVG hosting free?",
        answer: "Yes, our SVG to URL converter is 100% free. Upload SVG files without creating an account.",
      },
      {
        question: "Are interactive SVGs supported?",
        answer: "Static SVGs work perfectly. For interactive SVGs with JavaScript, inline embedding is recommended.",
      },
      {
        question: "What's the maximum SVG file size?",
        answer: "You can upload SVG files up to 10MB, though most SVGs are much smaller.",
      },
    ],
  },
  relatedTools: {
    title: "Related Tools",
    tools: [
      { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
      { name: "HTML Images", href: "/use-cases/html", description: "Image URLs for HTML & CSS" },
      { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
    ],
  },
}

export default async function SvgToUrlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.svgToUrl || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="SVG to URL Converter"
        description="Convert SVG vector images to shareable URLs with perfect scalability. Free online SVG hosting."
        url={`/${locale}/tools/svg-to-url`}
        featureList={[
          "Free SVG to URL conversion",
          "Perfect vector scalability",
          "No signup required",
          "Ideal for logos and icons",
          "HTML and CSS compatible",
          "Global CDN delivery",
        ]}
        keywords={["svg to url", "vector image hosting", "convert svg to url", "svg link"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "SVG to URL", url: `${BASE_URL}/${locale}/tools/svg-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
