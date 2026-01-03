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
    title: "PNG to URL Converter – Free Transparent Image Hosting | ImageToURL",
    description:
      "Upload PNG images and convert them into shareable URLs instantly. Free PNG to URL converter with full transparency support, fast CDN hosting, and no signup required.",
    keywords:
      "png to url, png image to url, convert png to link, transparent png url, png hosting online, png link generator, upload png get url",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/png-to-url`,
    },
    openGraph: {
      title: "PNG to URL Converter – Free Online Tool",
      description:
        "Convert PNG images into fast, shareable URLs with full transparency preserved. Free, secure, and instant.",
      url: `${BASE_URL}/${locale}/tools/png-to-url`,
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
  title: "PNG to URL Converter",
  subtitle: "Free Online PNG to URL Tool with Transparency Support",
  description:
    "Easily convert PNG images into shareable URLs in seconds. Ideal for logos, icons, UI assets, and transparent background images. No registration required.",
  features: {
    title: "Why Choose Our PNG to URL Converter?",
    items: [
      "Preserves PNG transparency perfectly",
      "Free online PNG hosting with no signup",
      "Instant URL generation after upload",
      "Optimized high-quality PNG compression",
      "Supports PNG files up to 10MB",
      "Fast global CDN delivery",
      "Secure and private image handling",
      "Perfect for logos, icons, and web assets",
    ],
  },
  howItWorks: {
    title: "How to Convert PNG to URL Online",
    steps: [
      {
        title: "Upload Your PNG Image",
        description:
          "Drag and drop your PNG file or select it from your device. Transparent backgrounds are fully supported.",
      },
      {
        title: "Automatic URL Generation",
        description:
          "Your image is uploaded instantly and hosted on our high-speed CDN with a unique shareable URL.",
      },
      {
        title: "Use or Share the Link",
        description:
          "Embed the PNG URL in websites, apps, HTML, CSS, emails, or share it anywhere online.",
      },
    ],
  },
  faq: {
    title: "PNG to URL – Frequently Asked Questions",
    items: [
      {
        question: "Does this PNG to URL converter keep transparency?",
        answer:
          "Yes. PNG transparency is fully preserved. Transparent backgrounds remain intact when you use the generated URL.",
      },
      {
        question: "Is the PNG to URL tool completely free?",
        answer:
          "Yes, this tool is 100% free. You can upload PNG images up to 10MB without signing up or creating an account.",
      },
      {
        question: "Can I use the PNG URL for websites and apps?",
        answer:
          "Absolutely. The generated PNG URLs work perfectly for websites, mobile apps, HTML, CSS, emails, and design tools.",
      },
      {
        question: "What is the maximum PNG file size allowed?",
        answer:
          "You can upload PNG files up to 10MB. For larger images, we recommend compressing them before upload.",
      },
      {
        question: "How long will my PNG image URL remain active?",
        answer:
          "Anonymous uploads are stored for up to 30 days. Free accounts can keep PNG URLs active for longer periods.",
      },
    ],
  },
  relatedTools: {
    title: "Related Image Tools",
    tools: [
      { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images into shareable URLs" },
      { name: "SVG to URL", href: "/tools/svg-to-url", description: "Upload SVG files and generate URLs" },
      { name: "Bulk Image Upload", href: "/tools/bulk-upload", description: "Upload multiple images and get URLs at once" },
    ],
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "PNG Format - Wikipedia", href: "https://en.wikipedia.org/wiki/PNG", description: "Learn about PNG format specifications and transparency features" },
      { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
      { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/choose-the-right-image-format", description: "Google's guide to choosing the right image format" },
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
        description="Free online tool to convert PNG images into shareable URLs with full transparency and fast CDN hosting."
        url={`/${locale}/tools/png-to-url`}
        featureList={[
          "Convert PNG to URL online",
          "Full transparency preserved",
          "No signup or login required",
          "Supports PNG files up to 10MB",
          "Instant shareable image links",
          "Global CDN for fast loading",
        ]}
        keywords={[
          "png to url",
          "png image hosting",
          "transparent png url",
          "convert png to link",
        ]}
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
