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
    title: "QR Code Image to URL - Host QR Code Images | ImageToURL",
    description: "Upload QR code images and get shareable URLs. Free QR code image hosting for easy sharing and embedding.",
    keywords: "qr code to url, qr image hosting, upload qr code, qr code image url, share qr code",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/tools/qr-to-url`,
    },
    openGraph: {
      title: "QR Code Image to URL - Host QR Code Images",
      description: "Upload QR code images and get shareable URLs for easy sharing.",
      url: `${BASE_URL}/${locale}/tools/qr-to-url`,
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
  title: "QR Code to URL",
  subtitle: "Host Your QR Code Images",
  description: "Upload QR code images and get shareable URLs. Perfect for sharing QR codes in emails, documents, and websites.",
  introduction: {
    title: "Share QR Codes Anywhere with Hosted URLs",
    paragraphs: [
      "QR codes bridge the physical and digital worlds—from restaurant menus and business cards to product packaging and event tickets. But sharing QR code images in digital contexts often means dealing with email attachments, file compatibility issues, and quality degradation.",
      "By hosting your QR code as a URL, you get a simple link that works everywhere. Embed it in emails that display perfectly, add it to documents without bloating file sizes, or share it in any digital channel. The QR code remains high-quality and perfectly scannable because we preserve every pixel.",
      "Our CDN ensures your QR code images load instantly for viewers anywhere in the world. Whether you're distributing QR codes for a marketing campaign or embedding them in digital documents, a hosted URL is the most reliable way to share QR codes online.",
    ],
  },
  features: {
    title: "Why Host QR Codes with Us?",
    items: [
      "Perfect for sharing QR codes",
      "High-quality image preservation",
      "100% free with no hidden costs",
      "No account required",
      "Easy embedding in documents",
      "Share via email or messaging",
      "Global CDN for fast loading",
      "QR remains scannable",
    ],
  },
  howItWorks: {
    title: "How to Host QR Code Images",
    steps: [
      {
        title: "Upload Your QR Code",
        description: "Drag and drop your QR code image (PNG, JPG, or SVG) or click to select.",
      },
      {
        title: "Get Your URL",
        description: "Your QR code is uploaded to our CDN. A shareable URL is generated instantly.",
      },
      {
        title: "Share Anywhere",
        description: "Embed in documents, emails, or websites. The QR code remains perfectly scannable.",
      },
    ],
  },
  useCases: {
    title: "QR Code Image Hosting Use Cases",
    items: [
      { title: "Digital Documents", description: "Embed QR codes in PDFs, Word docs, and presentations with reliable image display." },
      { title: "Email Campaigns", description: "Add QR codes to email newsletters that display perfectly across all email clients." },
      { title: "Website Integration", description: "Display QR codes on web pages for easy scanning by mobile users." },
      { title: "Training Materials", description: "Include QR codes in training docs that link to resources, videos, or supplementary content." },
      { title: "Event Management", description: "Share event check-in QR codes digitally with attendees before arrival." },
      { title: "Marketing Collateral", description: "Use consistent QR code URLs across digital marketing channels for tracking." },
    ],
  },
  tips: {
    title: "QR Code Hosting Best Practices",
    items: [
      "Upload QR codes as PNG for best quality—avoid JPEG compression which can affect scannability.",
      "Ensure your QR code has adequate quiet zone (white space) around it for reliable scanning.",
      "Test the hosted QR code URL by scanning it before distributing widely.",
      "Use high contrast colors (dark code on light background) for best scanning reliability.",
      "Consider SVG format for QR codes that need to scale to different sizes without pixelation.",
      "Sign in to get permanent URLs—expired QR codes become useless after 30 days.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Will the QR code remain scannable?",
        answer: "Yes! We preserve the original quality of your QR code image. It will remain perfectly scannable from the hosted URL.",
      },
      {
        question: "What QR code formats can I upload?",
        answer: "You can upload QR codes as PNG, JPG, SVG, or any other image format we support (up to 10MB).",
      },
      {
        question: "Is QR code hosting free?",
        answer: "Yes, hosting QR code images is completely free. No signup or account required.",
      },
      {
        question: "Can I embed the QR code URL in emails?",
        answer: "Absolutely! The URL can be used directly in HTML emails, making your QR code visible to recipients.",
      },
      {
        question: "Does this decode QR codes?",
        answer: "This tool hosts QR code images - it doesn't decode them. For decoding, you'd need a QR scanner app.",
      },
    ],
  },
  relatedTools: {
    title: "Related Tools",
    tools: [
      { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
      { name: "SVG to URL", href: "/tools/svg-to-url", description: "Convert SVG images to URLs" },
      { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
    ],
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "QR Code - Wikipedia", href: "https://en.wikipedia.org/wiki/QR_code", description: "Learn about QR code technology and standards" },
      { name: "QRCode.com Official", href: "https://www.qrcode.com/en/", description: "Official QR Code information site" },
      { name: "Web.dev: Image Formats", href: "https://web.dev/articles/choose-the-right-image-format", description: "Best practices for image hosting" },
    ],
  },
}

export default async function QrToUrlPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const toolDict = dict.tools?.qrToUrl || defaultToolContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="QR Code Image Hosting"
        description="Upload QR code images and get shareable URLs. Free QR code image hosting."
        url={`/${locale}/tools/qr-to-url`}
        featureList={[
          "Free QR code image hosting",
          "Quality preserved for scanning",
          "No signup required",
          "Easy embedding in documents",
          "Share via email or messaging",
          "Global CDN delivery",
        ]}
        keywords={["qr code to url", "qr image hosting", "upload qr code", "share qr code"]}
      />
      <FAQJsonLd items={toolDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
          { name: "QR to URL", url: `${BASE_URL}/${locale}/tools/qr-to-url` },
        ]}
      />
      <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
    </>
  )
}
