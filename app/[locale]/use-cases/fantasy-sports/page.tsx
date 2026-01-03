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
    title: "Image URLs for Fantasy Sports - ESPN, Yahoo & NFL Fantasy | ImageToURL",
    description: "Upload custom team logos and get image URLs for ESPN Fantasy, Yahoo Fantasy, and NFL Fantasy Football. Free image hosting for fantasy leagues.",
    keywords: "fantasy football image url, espn fantasy team logo, yahoo fantasy image, nfl fantasy logo, custom fantasy team image",
    alternates: {
      canonical: `https://www.imagetourl.cloud/${locale}/use-cases/fantasy-sports`,
    },
    openGraph: {
      title: "Image URLs for Fantasy Sports - ESPN, Yahoo & NFL Fantasy",
      description: "Upload custom team logos for fantasy sports leagues.",
      url: `${BASE_URL}/${locale}/use-cases/fantasy-sports`,
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
  title: "Image URLs for Fantasy Sports",
  subtitle: "Custom Team Logos for ESPN, Yahoo & NFL Fantasy",
  description: "Upload custom team logos and avatars for your fantasy sports leagues. Works with ESPN, Yahoo, NFL, and other fantasy platforms.",
  benefits: {
    title: "Why Use Our Fantasy Sports Image Hosting?",
    items: [
      {
        title: "Works with All Platforms",
        description: "Compatible with ESPN Fantasy, Yahoo Fantasy, NFL Fantasy, and most other fantasy sports platforms.",
      },
      {
        title: "Perfect for Team Logos",
        description: "Upload any image and get a URL that works as your fantasy team logo or avatar.",
      },
      {
        title: "Fast & Reliable",
        description: "Images load quickly so your team logo shows up properly in standings and matchups.",
      },
      {
        title: "Season-Long Storage",
        description: "Your images stay hosted all season. Sign in to keep them for future seasons too.",
      },
    ],
  },
  steps: {
    title: "How to Set Your Fantasy Team Logo",
    items: [
      {
        title: "Choose Your Image",
        description: "Find or create your perfect team logo. Square images work best (500x500 pixels ideal).",
      },
      {
        title: "Upload Here",
        description: "Drag and drop or click to upload. We accept JPG, PNG, and GIF formats.",
      },
      {
        title: "Copy the URL",
        description: "Click to copy the generated URL to your clipboard.",
      },
      {
        title: "Paste in Fantasy Settings",
        description: "Go to your team settings, find 'Team Logo' or 'Avatar', and paste the URL.",
      },
    ],
  },
  tips: {
    title: "Fantasy Sports Tips",
    items: [
      "Use square images (1:1 ratio) for best results",
      "500x500 pixels is the ideal size",
      "PNG works great for logos with transparency",
      "Keep file size under 2MB for faster loading",
      "Test your URL before saving in fantasy settings",
      "Sign in to keep your logo for multiple seasons",
    ],
  },
  faq: {
    title: "Fantasy Sports Image FAQ",
    items: [
      {
        question: "Will this work with ESPN Fantasy?",
        answer: "Yes! Our URLs work with ESPN Fantasy Football, Basketball, Baseball, and Hockey team logo settings.",
      },
      {
        question: "What about Yahoo Fantasy?",
        answer: "Yes, Yahoo Fantasy accepts custom image URLs for team logos. Just paste our URL in your team settings.",
      },
      {
        question: "What size should my team logo be?",
        answer: "Square images work best. We recommend 500x500 pixels, but any square image will be resized appropriately.",
      },
      {
        question: "Will the image stay up all season?",
        answer: "Anonymous uploads last 30 days. Sign in for free to keep your logo up all season and beyond.",
      },
      {
        question: "Is this free?",
        answer: "Yes! Upload your fantasy team logo completely free. No signup required for basic usage.",
      },
    ],
  },
  cta: {
    title: "Ready to Customize Your Team?",
    description: "Upload your fantasy team logo and get the URL in seconds.",
  },
  externalResources: {
    title: "Helpful Resources",
    resources: [
      { name: "ESPN Fantasy Help", href: "https://support.espn.com/hc/en-us/categories/360002194972-Fantasy-Sports", description: "ESPN Fantasy Sports support" },
      { name: "Image Size Guide", href: "https://web.dev/articles/image-optimization", description: "Optimize images for fantasy sports" },
      { name: "PNG vs JPG", href: "https://web.dev/articles/choose-the-right-image-format", description: "Choose the right format for logos" },
    ],
  },
}

export default async function FantasySportsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const useCaseDict = dict.useCases?.fantasySports || defaultUseCaseContent

  return (
    <>
      <SoftwareApplicationJsonLd
        locale={locale}
        name="Fantasy Sports Image Hosting"
        description="Free image hosting for fantasy sports team logos. Works with ESPN, Yahoo, and NFL Fantasy."
        url={`/${locale}/use-cases/fantasy-sports`}
        featureList={[
          "ESPN Fantasy compatible",
          "Yahoo Fantasy compatible",
          "NFL Fantasy compatible",
          "Perfect for team logos",
          "Free to use",
        ]}
        keywords={["fantasy football image url", "espn fantasy logo", "yahoo fantasy image", "fantasy team logo"]}
      />
      <HowToJsonLd
        name="How to Set a Custom Fantasy Football Team Logo"
        description="Upload a custom logo and get a URL for your fantasy sports team"
        steps={[
          { name: "Upload Image", text: "Upload your team logo (square images work best)" },
          { name: "Copy URL", text: "Copy the generated image URL" },
          { name: "Paste in Settings", text: "Go to your fantasy team settings and paste the URL" },
        ]}
      />
      <FAQJsonLd items={useCaseDict.faq.items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${BASE_URL}/${locale}` },
          { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
          { name: "Fantasy Sports", url: `${BASE_URL}/${locale}/use-cases/fantasy-sports` },
        ]}
      />
      <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
    </>
  )
}
