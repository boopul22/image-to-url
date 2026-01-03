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
    title: "Image Hosting for Discord - Free Discord Image URLs | ImageToURL",
    description: "Upload images for Discord and get embeddable URLs. Free image hosting that works perfectly with Discord bots, servers, and embeds.",
    keywords: "discord image url, image hosting for discord, discord image embed, discord bot images, discord server images",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/use-cases/discord`,
    },
    openGraph: {
      title: "Image Hosting for Discord - Free Discord Image URLs",
      description: "Upload images for Discord and get embeddable URLs that work with bots and embeds.",
      url: `${BASE_URL}/${locale}/use-cases/discord`,
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
  title: "Image Hosting for Discord",
  subtitle: "Perfect URLs for Bots, Embeds & Servers",
  description: "Upload images and get URLs that work perfectly with Discord. Ideal for bot developers, server admins, and anyone sharing images on Discord.",
  benefits: {
    title: "Why Use Our Discord Image Hosting?",
    items: [
      {
        title: "Discord-Ready URLs",
        description: "Our URLs work perfectly in Discord embeds, bot messages, and server posts. Images show proper previews.",
      },
      {
        title: "No Expiration Issues",
        description: "Unlike Discord's CDN, our URLs don't expire unexpectedly. Sign in for permanent hosting.",
      },
      {
        title: "Fast Global Delivery",
        description: "Images load quickly for Discord users worldwide thanks to our global CDN network.",
      },
      {
        title: "Perfect for Bots",
        description: "Reliable image URLs for Discord bots. Set thumbnails, images, and avatars programmatically.",
      },
    ],
  },
  steps: {
    title: "How to Get Discord Image URLs",
    items: [
      {
        title: "Upload Your Image",
        description: "Drag and drop or click to upload. We support JPG, PNG, GIF (animated!), and WebP formats.",
      },
      {
        title: "Copy the URL",
        description: "Your image is instantly uploaded. Click to copy the shareable URL to your clipboard.",
      },
      {
        title: "Use in Discord",
        description: "Paste the URL in Discord messages, bot embeds, or webhook payloads. Images embed automatically.",
      },
      {
        title: "For Bot Developers",
        description: "Use the URL in embed.setImage(), embed.setThumbnail(), or any Discord.js/Pycord method.",
      },
    ],
  },
  tips: {
    title: "Pro Tips for Discord",
    items: [
      "Use PNG for transparent images like logos",
      "GIFs animate properly in Discord embeds",
      "URLs work in both desktop and mobile Discord",
      "Perfect for custom bot avatars and thumbnails",
      "Use in webhook embeds for rich notifications",
      "Sign in to manage and organize bot images",
    ],
  },
  faq: {
    title: "Discord Image Hosting FAQ",
    items: [
      {
        question: "Will images show previews in Discord?",
        answer: "Yes! Our URLs properly embed in Discord showing full image previews in channels and DMs.",
      },
      {
        question: "Can I use this for Discord bot embeds?",
        answer: "Absolutely! Our URLs work with Discord.js, Pycord, and all Discord API libraries for embed images and thumbnails.",
      },
      {
        question: "Do GIFs animate in Discord?",
        answer: "Yes! Animated GIFs play properly when shared via our URLs in Discord.",
      },
      {
        question: "Is this free for Discord servers?",
        answer: "Yes, it's completely free. No signup required for basic usage. Sign in for unlimited storage.",
      },
      {
        question: "Why not use Discord's own CDN?",
        answer: "Discord CDN URLs can expire or change. Our URLs are permanent (when signed in) and reliable for bots.",
      },
    ],
  },
  cta: {
    title: "Ready to Upload Discord Images?",
    description: "Get embeddable image URLs for Discord in seconds. Free, fast, and reliable.",
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "Discord Developer Portal", href: "https://discord.com/developers/docs/intro", description: "Official Discord developer documentation" },
      { name: "Discord Bot Guide", href: "https://discordjs.guide/", description: "Comprehensive guide for Discord.js" },
      { name: "Web.dev: Images", href: "https://web.dev/articles/image-optimization", description: "Image optimization best practices" },
    ],
  },
}

export default async function DiscordPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const useCaseDict = dict.useCases?.discord || defaultUseCaseContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Discord Image Hosting"
        description="Free image hosting for Discord bots, embeds, and servers."
        url={`/${locale}/use-cases/discord`}
        featureList={[
          "Discord-ready URLs",
          "Works with bot embeds",
          "Animated GIF support",
          "Fast global CDN",
          "No signup required",
        ]}
        keywords={["discord image url", "discord image hosting", "discord bot images", "discord embed images"]}
      />
      <HowToJsonLd
        name="How to Get Image URLs for Discord"
        description="Upload images and get URLs that work perfectly in Discord embeds and bots"
        steps={[
          { name: "Upload Image", text: "Drag and drop or click to upload your image" },
          { name: "Copy URL", text: "Click to copy the generated URL to your clipboard" },
          { name: "Use in Discord", text: "Paste the URL in Discord messages or bot embeds" },
        ]}
      />
      <FAQJsonLd items={useCaseDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
          { name: "Discord", url: `${BASE_URL}/${locale}/use-cases/discord` },
        ]}
      />
      <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
    </>
  )
}
