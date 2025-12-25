import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { UseCaseTemplate } from "@/components/use-case-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd, HowToJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imagetourl.cloud"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: "Image URLs for HTML & CSS - Free Web Image Hosting | ImageToURL",
    description: "Get image URLs for HTML img tags and CSS backgrounds. Free image hosting for websites with fast CDN delivery.",
    keywords: "image url for html, image url css, web image hosting, html image link, css background image url",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/use-cases/html`,
    },
    openGraph: {
      title: "Image URLs for HTML & CSS - Free Web Image Hosting",
      description: "Get image URLs for HTML img tags and CSS backgrounds. Fast CDN delivery.",
      url: `/${locale}/use-cases/html`,
      siteName: "ImageToURL",
      locale: locale,
      type: "website",
    },
  }
}

const defaultUseCaseContent = {
  title: "Image URLs for HTML & CSS",
  subtitle: "Web-Ready Image Hosting",
  description: "Upload images and get URLs ready to use in HTML img tags, CSS backgrounds, and web applications. Fast global CDN included.",
  benefits: {
    title: "Why Use Our Web Image Hosting?",
    items: [
      {
        title: "Ready for HTML",
        description: "URLs work instantly in <img> tags. Just copy and paste into your src attribute.",
      },
      {
        title: "Perfect for CSS",
        description: "Use in background-image, content, and other CSS properties. HTTPS included.",
      },
      {
        title: "Global CDN",
        description: "Images load fast worldwide. Edge servers reduce latency for all your users.",
      },
      {
        title: "Responsive Ready",
        description: "High-quality images that look great on all screen sizes and devices.",
      },
    ],
  },
  steps: {
    title: "How to Get Image URLs for Web",
    items: [
      {
        title: "Upload Your Image",
        description: "Drag and drop or click to upload. We support JPG, PNG, GIF, SVG, and WebP.",
      },
      {
        title: "Copy the URL",
        description: "Your image is uploaded instantly. Copy the HTTPS URL to your clipboard.",
      },
      {
        title: "Use in HTML",
        description: "Add to img tags: <img src=\"your-url\" alt=\"description\">",
      },
      {
        title: "Or Use in CSS",
        description: "Add to stylesheets: background-image: url('your-url');",
      },
    ],
  },
  tips: {
    title: "Web Development Tips",
    items: [
      "Always add alt text for accessibility",
      "Use PNG for transparency, JPG for photos",
      "SVG is best for logos and icons",
      "WebP offers best compression for web",
      "Add loading=\"lazy\" for below-fold images",
      "Use srcset for responsive images",
    ],
  },
  faq: {
    title: "HTML & CSS Image Hosting FAQ",
    items: [
      {
        question: "Can I use these URLs in production websites?",
        answer: "Yes! Our CDN is production-ready with 99.9% uptime and fast global delivery.",
      },
      {
        question: "Are the URLs HTTPS?",
        answer: "Yes, all URLs are HTTPS by default, required for modern secure websites.",
      },
      {
        question: "Will images work in all browsers?",
        answer: "Yes, our URLs work in all modern browsers. We serve optimized formats automatically.",
      },
      {
        question: "Can I use URLs for CSS background images?",
        answer: "Absolutely! Just use url('your-image-url') in your CSS background-image property.",
      },
      {
        question: "Is there a bandwidth limit?",
        answer: "For free accounts, images are optimized for normal website usage. Sign in for higher limits.",
      },
    ],
  },
  cta: {
    title: "Ready to Host Web Images?",
    description: "Get CDN-powered image URLs for your websites in seconds.",
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Complete guide to HTML images" },
      { name: "MDN: img element", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img", description: "HTML img element reference" },
      { name: "Web.dev: Images", href: "https://web.dev/articles/image-optimization", description: "Image optimization for the web" },
    ],
  },
}

export default async function HtmlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const useCaseDict = dict.useCases?.html || defaultUseCaseContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Web Image Hosting"
        description="Free image hosting for HTML and CSS. Get CDN-powered URLs for websites."
        url={`/${locale}/use-cases/html`}
        featureList={[
          "HTML img tag ready",
          "CSS background support",
          "HTTPS URLs",
          "Fast global CDN",
          "All formats supported",
        ]}
        keywords={["image url html", "image url css", "web image hosting", "html image link"]}
      />
      <HowToJsonLd
        name="How to Get Image URLs for HTML and CSS"
        description="Upload images and get URLs ready for web development"
        steps={[
          { name: "Upload Image", text: "Drag and drop or click to upload your image" },
          { name: "Copy URL", text: "Copy the HTTPS URL to your clipboard" },
          { name: "Add to HTML", text: "Use in <img src=\"url\"> or CSS background-image" },
        ]}
      />
      <FAQJsonLd items={useCaseDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
          { name: "HTML & CSS", url: `${BASE_URL}/${locale}/use-cases/html` },
        ]}
      />
      <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
    </>
  )
}
