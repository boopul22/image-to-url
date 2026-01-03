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
        title: "Image to URL for Telegram - Free Telegram Image Hosting | ImageToURL",
        description: "Upload images for Telegram and get shareable URLs. Free image hosting that works perfectly with Telegram bots, groups, and channels. Image to link telegram instantly.",
        keywords: "telegram image to url, image to link telegram, telegram image hosting, telegram bot images, telegram image url, image hosting telegram",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/use-cases/telegram`,
        },
        openGraph: {
            title: "Image to URL for Telegram - Free Telegram Image Hosting",
            description: "Upload images for Telegram and get shareable URLs for bots and channels.",
            url: `${BASE_URL}/${locale}/use-cases/telegram`,
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
    title: "Image Hosting for Telegram",
    subtitle: "Perfect URLs for Bots, Groups & Channels",
    description: "Upload images and get URLs that work perfectly with Telegram. Ideal for bot developers, channel admins, and anyone sharing images on Telegram.",
    benefits: {
        title: "Why Use Our Telegram Image Hosting?",
        items: [
            {
                title: "Telegram-Ready URLs",
                description: "Our URLs work perfectly in Telegram messages, bots, and channels. Images preview correctly and load instantly.",
            },
            {
                title: "Bot API Compatible",
                description: "Use our URLs with Telegram Bot API's sendPhoto, InputMediaPhoto, and inline queries seamlessly.",
            },
            {
                title: "Fast Global Delivery",
                description: "Images load quickly for Telegram users worldwide thanks to our global CDN network.",
            },
            {
                title: "No Compression",
                description: "Unlike Telegram's built-in compression, our hosted images maintain original quality.",
            },
        ],
    },
    steps: {
        title: "How to Get Telegram Image URLs",
        items: [
            {
                title: "Upload Your Image",
                description: "Drag and drop or click to upload. We support JPG, PNG, GIF, and WebP formats up to 10MB.",
            },
            {
                title: "Copy the URL",
                description: "Your image is instantly uploaded. Click to copy the shareable URL to your clipboard.",
            },
            {
                title: "Use in Telegram",
                description: "Paste the URL in Telegram messages, use with sendPhoto method, or in bot inline keyboards.",
            },
            {
                title: "For Bot Developers",
                description: "Use the URL with bot.sendPhoto(chat_id, url) or in InputMediaPhoto for media groups.",
            },
        ],
    },
    tips: {
        title: "Pro Tips for Telegram",
        items: [
            "JPG images show the best previews in Telegram",
            "GIFs work as both animated images and 'short videos'",
            "Use PNG for images with transparency",
            "Perfect for Telegram bot thumbnails and media",
            "Works with inline bots and inline keyboards",
            "Sign in to manage your bot's image library",
        ],
    },
    faq: {
        title: "Telegram Image Hosting FAQ",
        items: [
            {
                question: "Will images show previews in Telegram?",
                answer: "Yes! Our URLs properly preview in Telegram chats, showing full image thumbnails before clicking.",
            },
            {
                question: "Can I use this with Telegram Bot API?",
                answer: "Absolutely! Our URLs work with sendPhoto, sendMediaGroup, and all Telegram Bot API methods that accept image URLs.",
            },
            {
                question: "Do GIFs animate in Telegram?",
                answer: "Yes! Animated GIFs play properly when sent via our URLs. Telegram may convert them to MP4 for smoother playback.",
            },
            {
                question: "Is this free for Telegram channels?",
                answer: "Yes, it's completely free. No signup required for basic usage. Sign in for unlimited storage and management.",
            },
            {
                question: "Why not just upload directly to Telegram?",
                answer: "Direct uploads get compressed and can't be easily reused. Our URLs maintain quality and work across multiple bots and chats.",
            },
        ],
    },
    cta: {
        title: "Ready to Upload Telegram Images?",
        description: "Get shareable image URLs for Telegram in seconds. Free, fast, and reliable.",
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Telegram Bot API", href: "https://core.telegram.org/bots/api", description: "Official Telegram Bot API documentation" },
            { name: "Telegram Bot FAQ", href: "https://core.telegram.org/bots/faq", description: "Frequently asked questions about bots" },
            { name: "Web.dev: Images", href: "https://web.dev/articles/image-optimization", description: "Image optimization best practices" },
        ],
    },
}

export default async function TelegramPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.telegram || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Telegram Image Hosting"
                description="Free image hosting for Telegram bots, groups, and channels."
                url={`/${locale}/use-cases/telegram`}
                featureList={[
                    "Telegram-ready URLs",
                    "Works with Bot API",
                    "Animated GIF support",
                    "Fast global CDN",
                    "No signup required",
                ]}
                keywords={["telegram image url", "telegram image hosting", "telegram bot images", "image to link telegram"]}
            />
            <HowToJsonLd
                name="How to Get Image URLs for Telegram"
                description="Upload images and get URLs that work perfectly with Telegram bots and channels"
                steps={[
                    { name: "Upload Image", text: "Drag and drop or click to upload your image" },
                    { name: "Copy URL", text: "Click to copy the generated URL to your clipboard" },
                    { name: "Use in Telegram", text: "Paste the URL in Telegram messages or use with Bot API" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "Telegram", url: `${BASE_URL}/${locale}/use-cases/telegram` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
