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
  const toolDict = dict.tools?.["image-to-url"] || defaultToolContent
  const languages = getAlternateLinks("/tools/image-to-url", locale)

  return {
    title: toolDict.meta.title,
    description: toolDict.meta.description,
    keywords: toolDict.meta.keywords,
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/image-to-url`,
      languages,
    },
    openGraph: {
      title: toolDict.meta.title,
      description: toolDict.meta.description,
      url: `${BASE_URL}/${locale}/tools/image-to-url`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          alt: "ImageToURL - Free Image to URL Converter",
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
  subtitle: "Free Image to URL Converter Online — No Signup Required",
  description: "Use our free image to URL converter to turn any JPG, PNG, GIF, SVG, or WebP into a shareable link in seconds. No account needed, no watermarks, instant CDN-powered URLs.",
  introduction: {
    title: "The Best Free Image to URL Converter",
    paragraphs: [
      "Looking for an image to URL converter? ImageToURL is the fastest and easiest way to convert any image into a shareable web link. Simply upload your file — whether it's a JPG, PNG, GIF, SVG, or WebP — and our image to URL converter instantly generates a permanent, CDN-backed URL you can use anywhere.",
      "Unlike other image to URL converter tools that require signups, add watermarks, or expire links quickly, ImageToURL keeps it simple: drag, drop, and get your URL. Every image is distributed across 200+ global edge servers so your links load fast for anyone, anywhere in the world.",
      "Our image to URL converter is trusted by web developers, marketers, e-commerce sellers, content creators, and millions of everyday users who need reliable image links for websites, emails, social media, documents, and more — all completely free.",
    ],
  },
  features: {
    title: "Why Our Image to URL Converter Is #1",
    items: [
      "100% free image to URL converter — no hidden costs ever",
      "No signup or account required to convert images to URLs",
      "Supports all major formats: JPG, PNG, GIF, SVG, WebP",
      "Upload files up to 10MB per image",
      "Instant URL generation — convert image to URL in under 2 seconds",
      "Global CDN with 200+ edge locations for lightning-fast delivery",
      "HTTPS-secured URLs for safe embedding and sharing",
      "99.9% uptime — your image URLs never go down",
      "Clean, short URLs optimized for sharing and embedding",
      "Bulk image to URL converter — convert multiple images at once",
    ],
  },
  howItWorks: {
    title: "How Our Image to URL Converter Works",
    steps: [
      {
        title: "1. Upload Your Image",
        description: "Drag and drop any image (JPG, PNG, GIF, SVG, or WebP) into the image to URL converter, or click to browse. Accepts files up to 10MB.",
      },
      {
        title: "2. Image to URL Conversion",
        description: "Our converter instantly uploads your image to a global CDN and generates a permanent, shareable URL — no waiting, no processing delays.",
      },
      {
        title: "3. Copy & Use Your URL",
        description: "Copy your new image URL and paste it anywhere — websites, HTML, emails, social media, forums, Markdown, documents, or messaging apps.",
      },
    ],
  },
  useCases: {
    title: "Who Uses Our Image to URL Converter?",
    items: [
      { title: "Web Developers", description: "Use the image to URL converter to host images for HTML, CSS, and JavaScript projects. Perfect for prototyping, testing responsive designs, and static site assets without managing your own storage." },
      { title: "Email Marketers", description: "Convert images to URLs for email campaigns and newsletters. Our image to URL converter ensures your images load reliably in Gmail, Outlook, Yahoo Mail, and every major email client." },
      { title: "Social Media Managers", description: "Use our image to URL converter to create direct image links that preview correctly on Twitter, Facebook, LinkedIn, Reddit, Discord, and other platforms." },
      { title: "E-commerce Sellers", description: "Convert product photos to URLs with our image to URL converter for eBay, Etsy, Amazon, Shopify, and marketplace listings with consistent quality." },
      { title: "Technical Writers", description: "Use the image to URL converter to add screenshots, diagrams, and visual guides to GitHub READMEs, wikis, Notion docs, and technical documentation." },
      { title: "Bloggers & Forum Users", description: "Our image to URL converter makes it easy to share images on Reddit, Stack Overflow, WordPress, Medium, and community forums with direct embed links." },
    ],
  },
  tips: {
    title: "Get the Most Out of Our Image to URL Converter",
    items: [
      "Optimize your images before using the image to URL converter — tools like TinyPNG or Squoosh reduce file size without visible quality loss.",
      "Choose the right format for best results: JPG for photos, PNG for transparency, GIF for animations, SVG for logos, WebP for optimal compression.",
      "Sign in free to make your image to URL converter links permanent, organize uploads in folders, and set custom expiration times.",
      "Need to convert many images at once? Use our bulk image to URL converter to process multiple files simultaneously.",
      "Always test your converted image URLs in an incognito window to verify they're publicly accessible before sharing.",
      "Use descriptive filenames before uploading to the image to URL converter — it helps you find and manage images in your dashboard.",
    ],
  },
  faq: {
    title: "Image to URL Converter — FAQ",
    items: [
      {
        question: "What is an image to URL converter?",
        answer: "An image to URL converter is an online tool that uploads your image file to a hosting server and gives you a shareable web link (URL). Instead of attaching large image files, you share a lightweight URL that anyone can open in their browser. ImageToURL is a free image to URL converter that works instantly with no signup.",
      },
      {
        question: "How do I use this image to URL converter?",
        answer: "Using our image to URL converter is simple: drag and drop your image (JPG, PNG, GIF, SVG, or WebP) into the upload zone, or click to browse your files. The image to URL converter instantly processes your file and gives you a shareable link — completely free.",
      },
      {
        question: "Is this image to URL converter really free?",
        answer: "Yes, our image to URL converter is 100% free with no hidden charges. You can convert unlimited images to URLs without creating an account. There are no premium tiers, no watermarks, and no usage caps.",
      },
      {
        question: "What image formats does the image to URL converter support?",
        answer: "Our image to URL converter supports all major formats: JPG/JPEG, PNG, GIF (including animated GIFs), SVG, and WebP. Each file can be up to 10MB in size.",
      },
      {
        question: "How long do URLs from the image to URL converter stay active?",
        answer: "URLs created with the image to URL converter for anonymous uploads stay active for 30 days. Sign in for a free account to keep your image URLs permanently and manage expiration settings.",
      },
      {
        question: "Can I use image to URL converter links on my website?",
        answer: "Absolutely! URLs generated by our image to URL converter work everywhere — in HTML img tags, CSS backgrounds, Markdown, email templates, social media posts, and any platform that supports image URLs.",
      },
      {
        question: "Does the image to URL converter reduce image quality?",
        answer: "No. Our image to URL converter preserves your original image exactly as uploaded — zero re-compression, no resizing, no watermarks. The URL serves an identical copy of your original file.",
      },
      {
        question: "Can the image to URL converter handle multiple images?",
        answer: "Yes! Use our bulk image to URL converter feature to upload and convert multiple images simultaneously. You'll get individual URLs for each image and can copy all links at once.",
      },
      {
        question: "Is the image to URL converter secure?",
        answer: "Yes, all URLs from our image to URL converter are served over HTTPS with SSL encryption. Images are stored on enterprise-grade cloud infrastructure with 99.9% uptime and global CDN distribution.",
      },
      {
        question: "What makes this image to URL converter better than alternatives?",
        answer: "Our image to URL converter stands out with instant conversion speed, no signup requirement, support for all major image formats, global CDN delivery via 200+ edge locations, permanent links for signed-in users, and a completely free service with no watermarks or limits.",
      },
      {
        question: "Can I delete images after using the image to URL converter?",
        answer: "Yes. If you're signed in, your dashboard gives you full control over images uploaded via the image to URL converter — view, copy URLs, organize in folders, set expiration dates, or delete at any time.",
      },
      {
        question: "Do I need to install anything to use the image to URL converter?",
        answer: "No installation needed. Our image to URL converter works entirely in your browser — on desktop, tablet, or mobile. Just visit the page, upload your image, and get your URL instantly.",
      },
    ],
  },
  relatedTools: {
    title: "More Image to URL Converter Tools",
    tools: [
      { name: "JPG to URL Converter", href: "/tools/jpg-to-url", description: "Convert JPEG photos to shareable URLs instantly" },
      { name: "PNG to URL Converter", href: "/tools/png-to-url", description: "Convert PNG images with transparency to URLs" },
      { name: "GIF to URL Converter", href: "/tools/gif-to-url", description: "Convert animated GIFs to shareable links" },
      { name: "SVG to URL Converter", href: "/tools/svg-to-url", description: "Convert vector graphics to shareable URLs" },
      { name: "WebP to URL Converter", href: "/tools/webp-to-url", description: "Convert WebP images to shareable URLs" },
      { name: "Bulk Image to URL", href: "/tools/bulk-upload", description: "Convert multiple images to URLs at once" },
    ],
  },
  externalResources: {
    title: "Learn More About Image Hosting",
    resources: [
      { name: "MDN: Using Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Complete guide to embedding images in websites using URLs" },
      { name: "Google: Image Optimization Guide", href: "https://web.dev/articles/choose-the-right-image-format", description: "Best practices for image formats and optimization before converting to URL" },
      { name: "Image File Formats Explained", href: "https://en.wikipedia.org/wiki/Image_file_format", description: "Understand JPG, PNG, GIF, SVG, and WebP formats supported by our converter" },
    ],
  },
  meta: {
    title: "Image to URL Converter — Free Online Tool | ImageToURL",
    description: "Image to URL converter — convert any image to a shareable URL for free. Upload JPG, PNG, GIF, SVG, or WebP and get an instant link. No signup, no watermarks, fast CDN delivery.",
    keywords: "image to url converter, image to url, convert image to url, free image to url converter, online image to url converter, image to link converter, image url generator, image to url converter free, upload image to url, image to url converter online, image hosting, picture to url converter",
  },
}

export default async function ImageToUrlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.["image-to-url"] || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Image to URL Converter - Free Online Tool"
        description="Image to URL converter that instantly converts any image to a shareable URL. Free online image to URL converter supporting JPG, PNG, GIF, SVG, and WebP."
        url={`/${locale}/tools/image-to-url`}
        featureList={[
          "Free image to URL converter",
          "Convert image to URL instantly",
          "No signup required",
          "Supports JPG, PNG, GIF, SVG, WebP",
          "Up to 10MB file size",
          "Global CDN with 200+ edge locations",
          "HTTPS-secured image URLs",
          "Bulk image to URL conversion",
        ]}
        keywords={["image to url converter", "image to url", "convert image to url", "free image to url converter", "online image to url converter", "image url generator", "upload image to url"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: toolDict.title, url: `${BASE_URL}/${locale}/tools/image-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
