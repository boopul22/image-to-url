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
        title: "Image URL for Roblox - Custom Decals & Textures | ImageToURL",
        description: "Get image URLs for Roblox game development. Upload custom textures, decals, and images for Roblox Studio. Free image hosting for Roblox developers.",
        keywords: "image url roblox, roblox image hosting, roblox decal url, roblox texture url, roblox studio images, image to url for roblox, roblox custom images",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/use-cases/roblox`,
        },
        openGraph: {
            title: "Image URL for Roblox - Custom Decals & Textures",
            description: "Upload custom images and get URLs for Roblox game development.",
            url: `${BASE_URL}/${locale}/use-cases/roblox`,
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
    title: "Image Hosting for Roblox",
    subtitle: "Custom Textures, Decals & Images for Roblox Studio",
    description: "Upload images and get URLs for Roblox game development. Perfect for textures, decals, UI elements, and custom graphics in your Roblox games.",
    benefits: {
        title: "Why Use Our Roblox Image Hosting?",
        items: [
            {
                title: "Developer Friendly",
                description: "Get clean, direct URLs that you can reference in Roblox Studio and Lua scripts.",
            },
            {
                title: "Fast Loading",
                description: "Global CDN ensures your game textures and images load quickly for players worldwide.",
            },
            {
                title: "No Moderation Wait",
                description: "Skip Roblox's moderation queue for testing. Upload here for instant URLs during development.",
            },
            {
                title: "All Formats Supported",
                description: "Upload PNG, JPG, and other formats. Perfect for textures, decals, and UI elements.",
            },
        ],
    },
    steps: {
        title: "How to Get Image URLs for Roblox",
        items: [
            {
                title: "Prepare Your Image",
                description: "Create your texture, decal, or UI image. PNG with transparency works great for decals.",
            },
            {
                title: "Upload Here",
                description: "Drag and drop or click to upload. We accept all common image formats up to 10MB.",
            },
            {
                title: "Copy the URL",
                description: "Once uploaded, click to copy the direct image URL to your clipboard.",
            },
            {
                title: "Use in Roblox",
                description: "Reference the URL in Roblox Studio for testing, or upload to Roblox for official asset IDs.",
            },
        ],
    },
    tips: {
        title: "Pro Tips for Roblox Developers",
        items: [
            "Use PNG format for textures with transparency",
            "Power-of-2 dimensions (256x256, 512x512) load fastest",
            "Test with our URLs, then upload to Roblox for production",
            "Great for quick prototyping without moderation delays",
            "Works for MeshPart textures and SurfaceGui images",
            "Sign in to organize and manage your Roblox assets",
        ],
    },
    faq: {
        title: "Roblox Image Hosting FAQ",
        items: [
            {
                question: "Can I use external URLs in Roblox games?",
                answer: "External URLs work in Roblox Studio for testing but require uploading to Roblox for production games. Our service is great for development and testing workflows.",
            },
            {
                question: "What size should Roblox textures be?",
                answer: "Use power-of-2 dimensions like 256x256, 512x512, or 1024x1024 for best performance. Keep file sizes reasonable for faster loading.",
            },
            {
                question: "Is this free for Roblox developers?",
                answer: "Yes! Upload images for free. Great for prototyping and testing before uploading to Roblox's official system.",
            },
            {
                question: "Why not upload directly to Roblox?",
                answer: "Roblox has moderation queues that can delay development. Use our instant URLs for testing, then upload to Roblox for production.",
            },
            {
                question: "Do you support animated textures?",
                answer: "You can upload GIFs, but Roblox doesn't support animated textures natively. For animation, you'd need to use flipbook-style spritesheets.",
            },
        ],
    },
    cta: {
        title: "Ready to Upload Roblox Images?",
        description: "Get instant image URLs for your Roblox development. Free and fast!",
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

export default async function RobloxPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.roblox || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Roblox Image Hosting"
                description="Free image hosting for Roblox game development, textures, and decals."
                url={`/${locale}/use-cases/roblox`}
                featureList={[
                    "Developer friendly URLs",
                    "Fast global CDN",
                    "No moderation wait",
                    "All formats supported",
                    "No signup required",
                ]}
                keywords={["roblox image url", "roblox texture hosting", "roblox decal url", "roblox studio images"]}
            />
            <HowToJsonLd
                name="How to Get Image URLs for Roblox"
                description="Upload images and get URLs for Roblox Studio development"
                steps={[
                    { name: "Prepare Image", text: "Create your texture or decal image" },
                    { name: "Upload", text: "Upload your image to ImageToURL" },
                    { name: "Copy URL", text: "Copy the generated direct image URL" },
                    { name: "Use in Roblox", text: "Reference the URL in Roblox Studio" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "Roblox", url: `${BASE_URL}/${locale}/use-cases/roblox` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
