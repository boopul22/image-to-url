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
    title: "Free GIF to URL Converter: Instant Animated GIF Hosting | ImageToURL",
    description: "Convert animated GIFs to permanent shareable URLs in seconds. Free online GIF hosting with zero quality loss, no compression, and no signup required. Perfect for Discord, Reddit, social media memes, and forum reactions.",
    keywords: "gif to url, convert gif to url, free gif hosting, upload gif get link, share gif online, animated gif to url, gif url generator, discord gif hosting, gif link creator, online gif converter, host gif for free, embed gif url, reddit gif hosting, meme gif uploader",
    alternates: {
      canonical: `/${locale}/tools/gif-to-url`,
    },
    openGraph: {
      title: "Free GIF to URL Converter - Instant Animated GIF Hosting",
      description: "Convert animated GIFs to shareable URLs instantly. Zero quality loss, unlimited bandwidth, perfect for Discord & social media memes.",
      url: `/${locale}/tools/gif-to-url`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
      images: [
        {
          url: `/og-gif-converter.jpg`,
          width: 1200,
          height: 630,
          alt: "GIF to URL Converter Tool Preview"
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free GIF to URL Converter | ImageToURL",
      description: "Instantly convert animated GIFs to shareable URLs. Free hosting with full animation support for Discord, Reddit & social media.",
      images: [`/og-gif-converter.jpg`],
    },
  }
}

const defaultToolContent = {
  title: "GIF to URL Converter",
  subtitle: "Free Instant Animated GIF Hosting",
  description: "Transform your animated GIFs into permanent, shareable URLs in seconds. Our free online tool preserves 100% of your animation frames with zero compression or quality loss. No account creation required—just upload, convert, and share instantly.",
  features: {
    title: "Why Choose Our GIF to URL Converter?",
    items: [
      "100% free hosting with unlimited bandwidth",
      "Zero compression – preserves original quality & all animation frames",
      "Discord, Reddit, and social media optimized URLs",
      "No registration or signup required",
      "Supports GIFs up to 10MB with lightning-fast processing",
      "Instant permanent link generation",
      "Global CDN for 99.9% uptime and fast delivery worldwide",
      "Perfect for memes, reactions, and embedding in websites",
      "SEO-friendly URLs with direct image access",
      "Secure, anonymous uploads with optional account benefits",
    ],
  },
  howItWorks: {
    title: "How to Convert GIF to URL in 3 Simple Steps",
    steps: [
      {
        title: "Drag & Drop Your Animated GIF",
        description: "Upload your GIF file up to 10MB. Our system automatically detects and preserves all animation frames and timing data.",
      },
      {
        title: "Get Instant CDN URL",
        description: "Receive a permanent, shareable URL hosted on our global CDN. Your GIF is ready to share in under 3 seconds.",
      },
      {
        title: "Share Anywhere Online",
        description: "Paste the URL into Discord, Reddit, Twitter, forums, or HTML. Animation plays natively with full autoplay support.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions About GIF to URL Conversion",
    items: [
      {
        question: "Will my GIF animation be preserved when converting to URL?",
        answer: "Absolutely! Unlike static image converters, our tool preserves 100% of your animation frames, timing, and loop settings. The hosted GIF plays identically to your original file with zero quality degradation.",
      },
      {
        question: "What's the best free GIF hosting service for Discord and social media?",
        answer: "ImageToURL offers the fastest free GIF hosting optimized for Discord, Reddit, Twitter, and other platforms. We provide direct image URLs with global CDN delivery, ensuring your animated GIFs load instantly and play automatically in chat.",
      },
      {
        question: "How do I get a direct URL link for my GIF file?",
        answer: "Simply drag your GIF into our converter tool—no signup needed. Within seconds, you'll receive a permanent direct URL (e.g., https://cdn.imagetourl.cloud/your-gif.gif) that you can embed or share anywhere online.",
      },
      {
        question: "Is there a file size limit for converting GIFs to URLs?",
        answer: "Free users can upload GIFs up to 10MB, which covers most animated memes and reaction GIFs. For larger files, we recommend using a GIF optimizer first or creating a free account to increase your limit to 50MB.",
      },
      {
        question: "How long do GIF URLs stay active? Are they permanent?",
        answer: "Anonymous uploads remain active for 30 days. Create a free account to keep your GIF URLs permanently with no expiration. Account holders also get analytics, folder organization, and larger file limits.",
      },
      {
        question: "Can I use these GIF URLs to embed in my website or blog?",
        answer: "Yes! Our GIF URLs are SEO-friendly and support hotlinking. Use them in HTML img tags, markdown, or CMS platforms. They load quickly thanks to our global CDN and include proper Content-Type headers for search engines.",
      },
    ],
  },
  relatedTools: {
    title: "Complete Image Hosting Toolkit",
    tools: [
      { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert transparent PNG images to direct links" },
      { name: "JPG to URL", href: "/tools/jpg-to-url", description: "Create URLs for compressed JPEG photos" },
      { name: "WebP to URL", href: "/tools/webp-to-url", description: "Convert modern WebP images to sharable links" },
      { name: "Image Resizer", href: "/tools/image-resizer", description: "Resize images before converting to optimize file size" },
      { name: "Discord Image Host", href: "/use-cases/discord", description: "Specialized image hosting for Discord emojis and avatars" },
      { name: "Meme Generator", href: "/tools/meme-generator", description: "Create and instantly host viral memes with URLs" },
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
        name="Free GIF to URL Converter"
        description="Convert animated GIFs to permanent shareable URLs with zero quality loss. Free online GIF hosting optimized for Discord, Reddit, and social media memes."
        url={`/${locale}/tools/gif-to-url`}
        featureList={[
          "Free instant GIF to URL conversion",
          "Full animation frame preservation",
          "Zero compression or quality loss",
          "Up to 10MB file size support (50MB with account)",
          "Discord, Reddit, and social media optimization",
          "Global CDN with 99.9% uptime",
          "SEO-friendly direct image URLs",
          "Anonymous uploads with no signup",
          "Permanent link storage for registered users",
          "Unlimited bandwidth and hotlinking allowed",
        ]}
        keywords={[
          "gif to url",
          "convert gif to url",
          "free gif hosting",
          "upload gif get link",
          "share gif online",
          "animated gif to url",
          "gif url generator",
          "discord gif hosting",
          "gif link creator",
          "online gif converter",
          "host gif for free",
          "embed gif url",
          "meme gif uploader",
        ]}
        aggregateRating={{
          ratingValue: "4.9",
          reviewCount: "2847",
        }}
        offers={{
          price: "0",
          priceCurrency: "USD",
        }}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "All Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "GIF to URL Converter", url: `${BASE_URL}/${locale}/tools/gif-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}