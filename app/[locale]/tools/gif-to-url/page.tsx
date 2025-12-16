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
    title: "GIF to URL Converter - Free Animated GIF Hosting | ImageToURL",
    description: "Convert animated GIFs to shareable URLs instantly. Free online GIF hosting with full animation support. No signup required.",
    keywords: "gif to url, animated gif to url, convert gif to url, gif image hosting, gif link generator",
    alternates: {
      canonical: `/${locale}/tools/gif-to-url`,
    },
    openGraph: {
      title: "GIF to URL Converter - Free Animated GIF Hosting",
      description: "Convert animated GIFs to shareable URLs instantly with full animation support.",
      url: `/${locale}/tools/gif-to-url`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
    },
  }
}

const defaultToolContent = {
  title: "GIF to URL Converter",
  subtitle: "Free Animated GIF Hosting",
  description: "Convert your animated GIFs to shareable URLs instantly. Full animation support with no quality loss.",
  features: {
    title: "Why Use Our GIF to URL Converter?",
    items: [
      "Full animation preserved",
      "No quality loss on upload",
      "100% free with no hidden costs",
      "No account or signup required",
      "Files up to 10MB supported",
      "Perfect for memes and reactions",
      "Discord and social media ready",
      "Fast global CDN delivery",
    ],
  },
  howItWorks: {
    title: "How to Convert GIF to URL",
    steps: [
      {
        title: "Upload Your GIF",
        description: "Drag and drop your animated GIF or click to browse. All frames are preserved.",
      },
      {
        title: "Get Your URL",
        description: "Your GIF is instantly uploaded to our global CDN. Animation plays perfectly from the URL.",
      },
      {
        title: "Share Anywhere",
        description: "Use in Discord, social media, forums, or websites. Animation works everywhere.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Will my GIF animation be preserved?",
        answer: "Yes! We preserve all animation frames and timing. Your GIF will play exactly as intended.",
      },
      {
        question: "Can I use GIF URLs in Discord?",
        answer: "Absolutely! Our GIF URLs work perfectly in Discord, showing animated previews in chat.",
      },
      {
        question: "Is there a file size limit for GIFs?",
        answer: "You can upload GIFs up to 10MB. For larger animated images, consider optimizing them first.",
      },
      {
        question: "Does the converter reduce GIF quality?",
        answer: "No, we preserve the original quality and all animation frames of your GIF.",
      },
      {
        question: "How long are GIF URLs active?",
        answer: "Anonymous uploads last 30 days. Sign in for free to keep GIFs indefinitely.",
      },
    ],
  },
  relatedTools: {
    title: "Related Tools",
    tools: [
      { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
      { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Convert JPG images to URLs" },
      { name: "Discord Images", href: "/use-cases/discord", description: "Image hosting for Discord" },
    ],
  },
}

export default async function GifToUrlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.gifToUrl || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="GIF to URL Converter"
        description="Convert animated GIFs to shareable URLs with full animation support. Free online GIF hosting."
        url={`/${locale}/tools/gif-to-url`}
        featureList={[
          "Free GIF to URL conversion",
          "Full animation support",
          "No quality loss",
          "Up to 10MB file size",
          "Discord compatible",
          "Global CDN delivery",
        ]}
        keywords={["gif to url", "animated gif hosting", "convert gif to url", "gif link"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "GIF to URL", url: `${BASE_URL}/${locale}/tools/gif-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
