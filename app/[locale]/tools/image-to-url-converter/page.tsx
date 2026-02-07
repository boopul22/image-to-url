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
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.["image-to-url-converter"] || defaultToolContent
  const languages = getAlternateLinks("/tools/image-to-url-converter", locale)

  return {
    title: toolDict.meta.title,
    description: toolDict.meta.description,
    keywords: toolDict.meta.keywords,
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/image-to-url-converter`,
      languages,
    },
    openGraph: {
      title: toolDict.meta.title,
      description: toolDict.meta.description,
      url: `${BASE_URL}/${locale}/tools/image-to-url-converter`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          alt: "Image to URL Converter - Free Online Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: toolDict.meta.title,
      description: toolDict.meta.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  }
}

const defaultToolContent = {
  title: "Image to URL Converter",
  subtitle: "Best Free Image to URL Converter — Convert Images to Links Instantly",
  description: "The #1 free image to URL converter online. Upload any JPG, PNG, GIF, SVG, or WebP image and get a shareable URL in seconds. No signup, no watermarks, no limits — powered by a global CDN.",
  introduction: {
    title: "Why Use an Image to URL Converter?",
    paragraphs: [
      "An image to URL converter transforms your local image files into publicly accessible web links. Whether you have a product photo, a screenshot, a meme, or a design mockup — our image to URL converter uploads it to the cloud and gives you a clean, permanent URL that works everywhere on the internet.",
      "Most people search for an image to URL converter when they need to embed an image in a website, share it in an email without attachments, post it on forums, or use it in documentation. ImageToURL is built specifically for this — it's the fastest, simplest, and most reliable image to URL converter available online.",
      "What sets our image to URL converter apart? Zero signup friction, zero cost, and zero quality loss. Your images are served from 200+ CDN edge locations worldwide, ensuring anyone who clicks your link sees the image load instantly. Developers, marketers, students, sellers — millions use our image to URL converter every month.",
    ],
  },
  features: {
    title: "Image to URL Converter Features",
    items: [
      "Free image to URL converter — always free, no premium plans",
      "No registration needed — convert image to URL anonymously",
      "All formats supported: JPG, JPEG, PNG, GIF, SVG, WebP",
      "10MB max file size per image upload",
      "Convert image to URL in under 2 seconds",
      "200+ global CDN edge servers for instant loading",
      "All image URLs are HTTPS-secured",
      "99.9% uptime — URLs that never break",
      "Short, clean URLs perfect for sharing anywhere",
      "Bulk image to URL converter for multiple files",
    ],
  },
  howItWorks: {
    title: "How Does the Image to URL Converter Work?",
    steps: [
      {
        title: "Step 1: Choose Your Image",
        description: "Drag and drop your image into the image to URL converter above, or click to select a file from your device. Works with JPG, PNG, GIF, SVG, and WebP up to 10MB.",
      },
      {
        title: "Step 2: Automatic Conversion",
        description: "The image to URL converter uploads your file to our global CDN and generates a unique, permanent URL — the entire process takes less than 2 seconds.",
      },
      {
        title: "Step 3: Copy Your Image URL",
        description: "Click the copy button to grab your new image URL. Paste it into websites, emails, social media, documents, code, or anywhere you need it.",
      },
    ],
  },
  useCases: {
    title: "When Do You Need an Image to URL Converter?",
    items: [
      { title: "Building Websites", description: "Every web developer needs an image to URL converter. Host images for HTML pages, CSS stylesheets, React components, and static sites without configuring your own storage bucket or CDN." },
      { title: "Sending Emails & Newsletters", description: "Email clients break inline attachments. Use our image to URL converter to create reliable image links that render perfectly in Gmail, Outlook, Apple Mail, Yahoo, and every newsletter platform." },
      { title: "Posting on Social Media", description: "Need a direct image link for Twitter, Discord, Reddit, or Facebook? Our image to URL converter gives you URLs that auto-preview with the correct thumbnail on every platform." },
      { title: "Selling Products Online", description: "eBay, Etsy, Amazon, and Shopify sellers use our image to URL converter to host product images across multiple marketplaces without paying for separate image hosting." },
      { title: "Writing Documentation", description: "Add visual guides to GitHub READMEs, Confluence pages, Notion wikis, and Markdown docs using URLs from our image to URL converter — no complex image pipeline needed." },
      { title: "Sharing in Chat & Forums", description: "Share images on Slack, WhatsApp, Telegram, Reddit, Stack Overflow, and Discord. The image to URL converter creates links that embed inline automatically." },
    ],
  },
  tips: {
    title: "Image to URL Converter Tips & Best Practices",
    items: [
      "Compress images before using the image to URL converter — smaller files mean faster URLs. Try TinyPNG, Squoosh, or ImageOptim.",
      "Pick the right format for your needs: JPG for photographs, PNG for transparency, GIF for animation, SVG for vector graphics, WebP for smallest file size.",
      "Create a free account to unlock permanent image URLs, folder organization, and custom expiry settings in the image to URL converter.",
      "Converting many images? Use our bulk image to URL converter mode to upload and get URLs for multiple files in one go.",
      "Verify your image URL works by opening it in an incognito/private browser window before sharing publicly.",
      "Name your files descriptively before uploading to the image to URL converter — makes it easier to find them later in your dashboard.",
    ],
  },
  faq: {
    title: "Image to URL Converter — Frequently Asked Questions",
    items: [
      {
        question: "What exactly is an image to URL converter?",
        answer: "An image to URL converter is a web tool that takes an image file from your device, uploads it to online storage, and returns a public URL (web link) pointing to that image. You can then use this URL to display the image on websites, share it via email, embed it in documents, or post it on social media. ImageToURL is a free image to URL converter that does this instantly.",
      },
      {
        question: "How do I convert an image to a URL?",
        answer: "Open our image to URL converter, drag your image file (JPG, PNG, GIF, SVG, or WebP) onto the upload area or click to browse, and your URL is ready in seconds. No account, no signup — just instant image to URL conversion.",
      },
      {
        question: "Is this image to URL converter completely free?",
        answer: "Yes. Our image to URL converter is 100% free — no trials, no credit card, no premium tiers. Convert unlimited images to URLs without any charges. There are no watermarks added to your images either.",
      },
      {
        question: "Which file types does the image to URL converter accept?",
        answer: "The image to URL converter supports JPG, JPEG, PNG, GIF (static and animated), SVG, and WebP. Maximum file size is 10MB per image.",
      },
      {
        question: "Do image to URL converter links expire?",
        answer: "For anonymous uploads, image URLs are active for 30 days. Create a free account to make your image to URL converter links permanent with no expiry.",
      },
      {
        question: "Can I embed image to URL converter links in HTML?",
        answer: "Yes! URLs from our image to URL converter work perfectly in HTML img tags, CSS background-image properties, Markdown syntax, email HTML, and any platform that accepts image URLs.",
      },
      {
        question: "Will the image to URL converter compress my images?",
        answer: "No. Our image to URL converter serves your images exactly as uploaded — original resolution, original quality, zero compression. What you upload is exactly what gets served.",
      },
      {
        question: "Can the image to URL converter process batches?",
        answer: "Yes. Use our bulk mode to run the image to URL converter on multiple files at once. Upload several images and receive individual URLs for each one.",
      },
      {
        question: "How fast is the image to URL converter?",
        answer: "Our image to URL converter typically converts and hosts your image in under 2 seconds. URLs are served from 200+ CDN edge locations for instant loading worldwide.",
      },
      {
        question: "Is the image to URL converter safe and private?",
        answer: "Yes. All URLs from the image to URL converter use HTTPS encryption. Images are stored on enterprise-grade infrastructure. You can delete uploaded images anytime from your dashboard.",
      },
      {
        question: "Do I need to download or install the image to URL converter?",
        answer: "No. The image to URL converter runs entirely in your web browser — works on desktop, laptop, tablet, and mobile. No app downloads, no browser extensions, no software to install.",
      },
      {
        question: "Why should I use this image to URL converter over others?",
        answer: "Our image to URL converter offers the best combination of speed, reliability, and simplicity. No signup walls, no watermarks, no quality loss, 200+ CDN locations, permanent links with free accounts, and support for all major image formats — all at zero cost.",
      },
    ],
  },
  relatedTools: {
    title: "More Image Converter Tools",
    tools: [
      { name: "JPG to URL Converter", href: "/tools/jpg-to-url", description: "Convert JPEG photographs to shareable URLs" },
      { name: "PNG to URL Converter", href: "/tools/png-to-url", description: "Convert PNG images with transparency to URLs" },
      { name: "GIF to URL Converter", href: "/tools/gif-to-url", description: "Convert animated GIFs to shareable links" },
      { name: "SVG to URL Converter", href: "/tools/svg-to-url", description: "Convert scalable vector graphics to URLs" },
      { name: "WebP to URL Converter", href: "/tools/webp-to-url", description: "Convert WebP images to shareable URLs" },
      { name: "Bulk Image Converter", href: "/tools/bulk-upload", description: "Convert many images to URLs at once" },
    ],
  },
  externalResources: {
    title: "Image Hosting Resources",
    resources: [
      { name: "MDN: HTML Image Guide", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Learn how to use image URLs in web pages" },
      { name: "Google: Optimize Images", href: "https://web.dev/articles/choose-the-right-image-format", description: "Choose the right image format before converting to URL" },
      { name: "Image Formats Guide", href: "https://en.wikipedia.org/wiki/Image_file_format", description: "JPG, PNG, GIF, SVG, WebP — all formats our converter supports" },
    ],
  },
  meta: {
    title: "Image to URL Converter — Free Online Tool | ImageToURL",
    description: "Image to URL converter — the fastest way to convert any image to a shareable URL. Free online image to URL converter for JPG, PNG, GIF, SVG, WebP. No signup, instant CDN links.",
    keywords: "image to url converter, image to url converter free, free image to url converter, image to url converter online, online image to url converter, convert image to url, image to url, image to link converter, image url converter, picture to url converter, photo to url converter, image to url converter no signup",
  },
}

export default async function ImageToUrlConverterPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.["image-to-url-converter"] || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Image to URL Converter"
        description="Free image to URL converter — upload any image and get a shareable URL instantly. Supports JPG, PNG, GIF, SVG, and WebP formats."
        url={`/${locale}/tools/image-to-url-converter`}
        featureList={[
          "Free image to URL converter",
          "No signup required",
          "Convert image to URL in 2 seconds",
          "JPG, PNG, GIF, SVG, WebP supported",
          "10MB max file size",
          "200+ CDN edge locations",
          "HTTPS-secured URLs",
          "Bulk image conversion",
        ]}
        keywords={["image to url converter", "image to url converter free", "convert image to url", "free image to url converter", "online image to url converter", "image url converter"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "Image to URL Converter", url: `${BASE_URL}/${locale}/tools/image-to-url-converter` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
