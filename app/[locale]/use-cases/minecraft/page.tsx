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
    title: "Minecraft Skin Image URLs - Host Custom Skins | ImageToURL",
    description: "Upload Minecraft skins and get image URLs. Perfect for server icons, skin showcases, and Minecraft communities. Free image hosting.",
    keywords: "minecraft skin url, minecraft skin image, minecraft server icon, minecraft avatar url, custom minecraft skin hosting",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/use-cases/minecraft`,
    },
    openGraph: {
      title: "Minecraft Skin Image URLs - Host Custom Skins",
      description: "Upload Minecraft skins and get image URLs for servers and communities.",
      url: `${BASE_URL}/${locale}/use-cases/minecraft`,
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

const defaultUseCaseContent = {
  title: "Minecraft Skin Image URLs",
  subtitle: "Host Skins, Server Icons & More",
  description: "Upload Minecraft skins, server icons, and artwork. Get URLs perfect for server listings, forums, and Discord.",
  benefits: {
    title: "Why Use Our Minecraft Image Hosting?",
    items: [
      {
        title: "Perfect for Skin Showcases",
        description: "Share your custom Minecraft skins with reliable, fast-loading URLs.",
      },
      {
        title: "Server Icons Ready",
        description: "Upload server icons in the right format and get URLs for server listings.",
      },
      {
        title: "Community Friendly",
        description: "Share on Discord, forums, and social media. URLs work everywhere.",
      },
      {
        title: "Fast & Reliable",
        description: "Global CDN ensures your images load quickly for the Minecraft community worldwide.",
      },
    ],
  },
  steps: {
    title: "How to Host Minecraft Images",
    items: [
      {
        title: "Prepare Your Image",
        description: "Get your skin file, render, or server icon ready. PNG format works best for Minecraft.",
      },
      {
        title: "Upload Here",
        description: "Drag and drop or click to upload. We preserve pixel-perfect quality.",
      },
      {
        title: "Copy the URL",
        description: "Get your shareable URL instantly. Click to copy to clipboard.",
      },
      {
        title: "Share with the Community",
        description: "Use in Discord, forums, server listings, or anywhere you share Minecraft content.",
      },
    ],
  },
  tips: {
    title: "Minecraft Image Tips",
    items: [
      "Use PNG for skin files to preserve transparency",
      "Server icons should be 64x64 pixels",
      "Skin files are typically 64x64 or 64x32 pixels",
      "Rendered skin images can be any size",
      "GIFs work great for animated showcases",
      "Sign in to manage all your Minecraft images",
    ],
  },
  faq: {
    title: "Minecraft Image Hosting FAQ",
    items: [
      {
        question: "Can I host actual Minecraft skin files?",
        answer: "Yes! Upload your .png skin files and share them with the community. Note: We host the image, not apply it to Minecraft.",
      },
      {
        question: "What about server icons?",
        answer: "Upload your server icon (64x64 PNG recommended) and use the URL in your server configuration or listings.",
      },
      {
        question: "Will the image quality be preserved?",
        answer: "Yes! We preserve pixel-perfect quality, which is essential for Minecraft's pixel art style.",
      },
      {
        question: "Can I use these URLs in Discord?",
        answer: "Absolutely! Our URLs work perfectly in Discord for sharing skins, builds, and server info.",
      },
      {
        question: "Is this free for Minecraft communities?",
        answer: "Yes, completely free! No signup required. Sign in to organize and keep images permanently.",
      },
    ],
  },
  cta: {
    title: "Ready to Share Minecraft Images?",
    description: "Upload your skins, icons, and artwork. Get shareable URLs instantly.",
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "Web.dev: Image Formats", href: "https://web.dev/articles/choose-the-right-image-format", description: "Choosing the right image format" },
      { name: "PNG Format Guide", href: "https://en.wikipedia.org/wiki/PNG", description: "Learn about PNG format for games" },
      { name: "Image Optimization", href: "https://web.dev/articles/image-optimization", description: "Optimize images for gaming" },
    ],
  },
}

export default async function MinecraftPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const useCaseDict = dict.useCases?.minecraft || defaultUseCaseContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Minecraft Image Hosting"
        description="Free image hosting for Minecraft skins, server icons, and community content."
        url={`/${locale}/use-cases/minecraft`}
        featureList={[
          "Minecraft skin hosting",
          "Server icon hosting",
          "Pixel-perfect quality",
          "Discord compatible",
          "Free to use",
        ]}
        keywords={["minecraft skin url", "minecraft server icon", "minecraft image hosting", "minecraft skin image"]}
      />
      <HowToJsonLd
        name="How to Host Minecraft Skin Images"
        description="Upload Minecraft skins and get shareable URLs"
        steps={[
          { name: "Upload Image", text: "Upload your Minecraft skin or server icon (PNG works best)" },
          { name: "Copy URL", text: "Copy the generated image URL" },
          { name: "Share", text: "Use the URL in Discord, forums, or server listings" },
        ]}
      />
      <FAQJsonLd items={useCaseDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
          { name: "Minecraft", url: `${BASE_URL}/${locale}/use-cases/minecraft` },
        ]}
      />
      <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
    </>
  )
}
