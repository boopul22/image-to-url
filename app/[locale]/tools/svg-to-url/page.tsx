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
    title: "SVG to URL Converter - Free Vector Image Hosting | ImageToURL",
    description: "Convert SVG vector images to shareable URLs instantly. Free online SVG hosting with perfect scalability. No signup required.",
    keywords: "svg to url, convert svg to url, svg image hosting, svg link generator, vector image to url",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/svg-to-url`,
    },
    openGraph: {
      title: "SVG to URL Converter - Free Vector Image Hosting",
      description: "Convert SVG vector images to shareable URLs instantly with perfect scalability.",
      url: `${BASE_URL}/${locale}/tools/svg-to-url`,
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
  title: "SVG to URL Converter",
  subtitle: "Free Vector Image Hosting",
  description: "Convert your SVG vector images to shareable URLs instantly. Perfect scalability at any size.",
  introduction: {
    title: "The Power of Scalable Vector Graphics",
    paragraphs: [
      "SVG (Scalable Vector Graphics) is the gold standard for logos, icons, and illustrations on the web. Unlike raster images that pixelate when enlarged, SVG files are mathematically defined shapes that render perfectly at any size—from a tiny favicon to a billboard-sized display.",
      "When you convert an SVG to a URL, you're creating a lightweight, universally accessible link to your vector artwork. SVG files are typically just a few kilobytes, meaning incredibly fast load times. Plus, they can be styled with CSS and animated with JavaScript, making them incredibly versatile for web applications.",
      "Designers and developers rely on SVG URLs for brand assets, UI icons, infographics, and interactive graphics. Our converter hosts your SVG on a global CDN, ensuring your vector graphics load instantly for viewers anywhere in the world while maintaining their crisp, scalable quality.",
    ],
  },
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
  useCases: {
    title: "Perfect Use Cases for SVG URLs",
    items: [
      { title: "Logo Hosting", description: "Host company logos that look crisp on any screen—from mobile to 4K displays—without multiple file sizes." },
      { title: "Icon Libraries", description: "Create hosted icon sets for web applications with URLs you can reference across multiple projects." },
      { title: "Infographics", description: "Share detailed charts, diagrams, and data visualizations that remain sharp when users zoom in." },
      { title: "Design System Assets", description: "Host UI components, illustrations, and brand assets as accessible URLs for your design team." },
      { title: "Documentation", description: "Embed technical diagrams, flowcharts, and architectural drawings that scale perfectly in any viewport." },
      { title: "Print Preparation", description: "Share vector artwork with print vendors using direct URLs—no file attachments needed." },
    ],
  },
  tips: {
    title: "Pro Tips for SVG Hosting",
    items: [
      "Optimize SVGs with tools like SVGOMG before uploading—you can often reduce file size by 50% or more.",
      "Remove unnecessary metadata, comments, and editor-specific data from SVG files for cleaner code.",
      "For logos, ensure text is converted to outlines so fonts render correctly without external dependencies.",
      "Use viewBox attributes to make your SVGs responsive—they'll scale perfectly in any container.",
      "Consider URL-encoding simple SVGs for inline use in CSS as data URIs for critical above-the-fold graphics.",
      "Sign in to organize brand assets and icons in folders for easier team access and management.",
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
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "SVG Format - Wikipedia", href: "https://en.wikipedia.org/wiki/SVG", description: "Learn about SVG vector format specifications" },
      { name: "MDN: SVG Tutorial", href: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial", description: "Complete guide to using SVG on the web" },
      { name: "SVGOMG Optimizer", href: "https://jakearchibald.github.io/svgomg/", description: "Online tool to optimize SVG files" },
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
