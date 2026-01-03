import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { getAlternateLinks } from "@/lib/i18n/get-alternate-links"
import { ToolPageTemplate } from "@/components/tool-page-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imagetourl.cloud"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const languages = getAlternateLinks("/tools/jpg-to-url", locale)

  return {
    title: "JPG to URL Converter - Free Online Tool | ImageToURL",
    description: "Convert JPG images to shareable URLs instantly. Free online JPG to URL converter with no signup required. Upload JPEG files up to 10MB and get instant links.",
    keywords: "jpg to url, jpeg to url, convert jpg to url, jpg image to url converter, jpg link generator",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/jpg-to-url`,
      languages,
    },
    openGraph: {
      title: "JPG to URL Converter - Free Online Tool",
      description: "Convert JPG images to shareable URLs instantly.",
      url: `${BASE_URL}/${locale}/tools/jpg-to-url`,
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



// Default content for tool pages (used when translations not available)
const defaultToolContent = {
  title: "JPG to URL Converter",
  subtitle: "Free Online JPEG Image Hosting",
  description: "Convert your JPG and JPEG images to shareable URLs instantly. No signup required, just upload and share.",
  introduction: {
    title: "Understanding JPG to URL Conversion",
    paragraphs: [
      "JPG (Joint Photographic Experts Group) is the most widely used image format on the web, known for its excellent compression of photographs and complex images. When you need to share a JPG image online, converting it to a URL allows you to embed it anywhere—from websites and emails to social media posts and documents.",
      "Our free JPG to URL converter instantly uploads your JPEG files to a global content delivery network (CDN), generating a permanent, shareable link. Unlike temporary file-sharing services, these URLs are designed for reliability and speed, with edge servers ensuring fast loading times for viewers worldwide.",
      "Whether you're a blogger embedding product photos, a developer testing image displays, or simply sharing memories with friends, converting your JPG to a URL is the most efficient way to make your images accessible online without dealing with file attachments or size limits.",
    ],
  },
  features: {
    title: "Why Use Our JPG to URL Converter?",
    items: [
      "100% free with no hidden costs",
      "No account or signup required",
      "Support for JPG and JPEG formats",
      "Files up to 10MB supported",
      "Instant shareable links",
      "Global CDN for fast delivery",
      "99.9% uptime guarantee",
      "Secure HTTPS links",
    ],
  },
  howItWorks: {
    title: "How to Convert JPG to URL",
    steps: [
      {
        title: "Upload Your JPG",
        description: "Drag and drop your JPG file or click to browse. We accept JPG and JPEG files up to 10MB.",
      },
      {
        title: "Get Your URL",
        description: "Your image is instantly uploaded to our global CDN. A shareable URL is generated automatically.",
      },
      {
        title: "Share Anywhere",
        description: "Copy the URL and use it anywhere - websites, social media, emails, or documents.",
      },
    ],
  },
  useCases: {
    title: "Common Use Cases for JPG URLs",
    items: [
      { title: "Website Development", description: "Embed product images, portfolio photos, or blog illustrations directly in HTML without worrying about hosting infrastructure." },
      { title: "Email Marketing", description: "Include reliable image links in email newsletters without hitting attachment limits or broken inline images." },
      { title: "Social Media Sharing", description: "Share high-quality photos with direct links that preview correctly across all major platforms." },
      { title: "Documentation & Wikis", description: "Add screenshots, diagrams, and visual aids to README files, help docs, and internal wikis." },
      { title: "E-commerce Listings", description: "Host product images for listings on multiple marketplaces like eBay, Etsy, or Amazon." },
      { title: "Fantasy Sports & Gaming", description: "Create custom team logos and avatars for ESPN, Yahoo Fantasy, Discord, and gaming platforms." },
    ],
  },
  tips: {
    title: "Pro Tips for JPG Hosting",
    items: [
      "Optimize your JPG before uploading to reduce file size without visible quality loss—tools like TinyJPG can help.",
      "Use descriptive filenames for better organization when managing multiple images in your dashboard.",
      "Sign in to keep your image URLs permanent and gain access to expiration controls and folder organization.",
      "For images requiring transparent backgrounds, use PNG format instead—JPG doesn't support transparency.",
      "Consider WebP format for even smaller file sizes while maintaining quality on modern browsers.",
      "Test your image URLs in an incognito window to ensure they're publicly accessible before sharing.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How do I convert a JPG image to a URL?",
        answer: "Simply drag and drop your JPG file onto our upload zone or click to select a file. Your image will be instantly uploaded and you'll receive a shareable URL.",
      },
      {
        question: "Is this JPG to URL converter free?",
        answer: "Yes, our JPG to URL converter is 100% free. You can upload JPG images up to 10MB without creating an account.",
      },
      {
        question: "What's the difference between JPG and JPEG?",
        answer: "JPG and JPEG are the same format - JPG is just a shorter file extension. Our converter supports both .jpg and .jpeg files.",
      },
      {
        question: "How long will my JPG URL stay active?",
        answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep your images indefinitely and manage expiration times.",
      },
      {
        question: "Can I use the JPG URL on my website?",
        answer: "Yes! The URLs we generate can be used anywhere - in HTML img tags, CSS backgrounds, social media, emails, and more.",
      },
      {
        question: "Does converting JPG to URL compress or reduce image quality?",
        answer: "No, we preserve your original image quality exactly as uploaded. There's no re-compression or quality loss during the conversion process. Your JPG will look identical to the original file.",
      },
      {
        question: "Can I convert multiple JPG files to URLs at once?",
        answer: "Yes! Use our Bulk Upload tool to upload multiple JPG images simultaneously. You'll receive individual URLs for each file and can copy all URLs at once for easy sharing.",
      },
      {
        question: "Are the JPG URLs SEO-friendly for my website?",
        answer: "Yes, our URLs are clean and end with proper image extensions. They include appropriate Content-Type headers and are served from fast CDN infrastructure, which helps with page load speed—an important SEO factor.",
      },
    ],
  },
  relatedTools: {
    title: "Related Tools",
    tools: [
      { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
      { name: "GIF to URL", href: "/tools/gif-to-url", description: "Convert animated GIFs to URLs" },
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
    title: "JPG to URL Converter - Free Online Tool | ImageToURL",
    description: "Convert JPG images to shareable URLs instantly. Free online JPG to URL converter with no signup required.",
    keywords: "jpg to url, jpeg to url, convert jpg to url, jpg image to url converter",
  },
}

export default async function JpgToUrlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="JPG to URL Converter"
        description="Convert JPG and JPEG images to shareable URLs instantly. Free online image hosting."
        url={`/${locale}/tools/jpg-to-url`}
        featureList={[
          "Free JPG to URL conversion",
          "No signup required",
          "Support for JPG and JPEG formats",
          "Up to 10MB file size",
          "Instant shareable links",
          "Global CDN delivery",
        ]}
        keywords={["jpg to url", "jpeg to url", "convert jpg to url", "jpg image hosting"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "JPG to URL", url: `${BASE_URL}/${locale}/tools/jpg-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
