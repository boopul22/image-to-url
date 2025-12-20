import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { UseCaseTemplate } from "@/components/use-case-template"
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd, HowToJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imagetourl.cloud"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params

    return {
        title: "Image to URL for ESPN Fantasy Football - Custom Team Logos | ImageToURL",
        description: "Upload custom team logos for ESPN Fantasy Football. Get image URLs that work as team logos, profile pictures, and league images. Free fantasy sports image hosting.",
        keywords: "image to url espn fantasy, fantasy football image to url, espn fantasy team logo url, custom fantasy football logo, image to url fantasy football, espn fantasy image hosting",
        alternates: {
            canonical: `/${locale}/use-cases/espn-fantasy`,
        },
        openGraph: {
            title: "Image to URL for ESPN Fantasy - Custom Team Logos",
            description: "Upload custom team logos for ESPN Fantasy Football and other fantasy sports.",
            url: `/${locale}/use-cases/espn-fantasy`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultUseCaseContent = {
    title: "Image Hosting for Fantasy Sports",
    subtitle: "Custom Team Logos for ESPN, Yahoo & More",
    description: "Upload custom team logos and get URLs that work with ESPN Fantasy Football, Yahoo Fantasy, and other platforms. Stand out with a unique team image!",
    benefits: {
        title: "Why Use Our Fantasy Sports Image Hosting?",
        items: [
            {
                title: "ESPN Compatible",
                description: "Our image URLs work perfectly with ESPN Fantasy Football's custom logo upload feature.",
            },
            {
                title: "Works Everywhere",
                description: "Same URLs work for ESPN, Yahoo, Sleeper, and other fantasy platforms that accept custom images.",
            },
            {
                title: "Fast Loading",
                description: "Team logos load instantly during drafts and live games thanks to our global CDN.",
            },
            {
                title: "No Expiration",
                description: "Sign in to keep your team logo URL permanent throughout the entire season and beyond.",
            },
        ],
    },
    steps: {
        title: "How to Set Up a Custom Fantasy Team Logo",
        items: [
            {
                title: "Create Your Logo",
                description: "Design your custom team logo. Square images work best (400x400 pixels recommended).",
            },
            {
                title: "Upload Here",
                description: "Upload your logo image. We accept JPG, PNG, and GIF formats up to 10MB.",
            },
            {
                title: "Copy the URL",
                description: "Once uploaded, click to copy your image URL to your clipboard.",
            },
            {
                title: "Paste in ESPN/Yahoo",
                description: "Go to your team settings, find 'Custom Logo' or 'Team Image', and paste the URL.",
            },
        ],
    },
    tips: {
        title: "Pro Tips for Fantasy Team Logos",
        items: [
            "Use square images (400x400 or 500x500 pixels) for best results",
            "PNG with transparency works great for logos on any background",
            "Keep file size under 500KB for fastest loading during drafts",
            "Funny team photos make great profile pictures too",
            "GIFs work on some platforms for animated logos",
            "Sign in to keep your logo URL all season long",
        ],
    },
    faq: {
        title: "Fantasy Sports Image FAQ",
        items: [
            {
                question: "How do I add a custom logo to ESPN Fantasy?",
                answer: "Upload your logo here, copy the URL, then in ESPN go to Team Settings > Edit Team Logo > Enter Image URL and paste your link.",
            },
            {
                question: "What size should my fantasy team logo be?",
                answer: "Square images work best. We recommend 400x400 or 500x500 pixels. The image will be cropped to a circle on some platforms.",
            },
            {
                question: "Does this work for Yahoo Fantasy too?",
                answer: "Yes! Our URLs work with Yahoo Fantasy, Sleeper, CBS Sports, and any platform that accepts custom image URLs.",
            },
            {
                question: "Will my logo last the whole season?",
                answer: "Anonymous uploads last 30 days. Sign in for free to keep your team logo URL permanently through playoffs and beyond!",
            },
            {
                question: "Can I use animated GIFs as my team logo?",
                answer: "GIF uploads work here, but ESPN and some platforms may not display animations. Check your specific platform's requirements.",
            },
        ],
    },
    cta: {
        title: "Ready to Upload Your Team Logo?",
        description: "Get a custom image URL for your fantasy team in seconds. Free and easy!",
    },
}

export default async function EspnFantasyPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.espnFantasy || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Fantasy Sports Image Hosting"
                description="Free image hosting for ESPN Fantasy Football and other fantasy sports team logos."
                url={`/${locale}/use-cases/espn-fantasy`}
                featureList={[
                    "ESPN Fantasy compatible",
                    "Yahoo Fantasy compatible",
                    "Custom team logos",
                    "Fast global CDN",
                    "No signup required",
                ]}
                keywords={["espn fantasy image url", "fantasy football logo", "custom team logo url", "yahoo fantasy image"]}
            />
            <HowToJsonLd
                name="How to Add Custom Logo to ESPN Fantasy"
                description="Upload custom team logos and get URLs for ESPN Fantasy Football"
                steps={[
                    { name: "Create Logo", text: "Design your custom team logo (400x400 pixels recommended)" },
                    { name: "Upload", text: "Upload your logo image to ImageToURL" },
                    { name: "Copy URL", text: "Copy the generated image URL" },
                    { name: "Paste in ESPN", text: "Go to Team Settings > Edit Team Logo and paste the URL" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "ESPN Fantasy", url: `${BASE_URL}/${locale}/use-cases/espn-fantasy` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
