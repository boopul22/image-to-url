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
        title: "Image URL for VRChat - Custom Avatars & Worlds | ImageToURL",
        description: "Get image URLs for VRChat avatar creation and world building. Upload custom textures and images for VRChat SDK. Free image hosting for VRChat creators.",
        keywords: "image url vrchat, vrchat image hosting, vrchat avatar textures, vrchat world images, vrchat sdk images, image to url for vrchat",
        alternates: {
            canonical: `/${locale}/use-cases/vrchat`,
        },
        openGraph: {
            title: "Image URL for VRChat - Custom Avatars & Worlds",
            description: "Upload custom images and get URLs for VRChat avatar and world creation.",
            url: `/${locale}/use-cases/vrchat`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultUseCaseContent = {
    title: "Image Hosting for VRChat",
    subtitle: "Textures & Images for Avatars and Worlds",
    description: "Upload images and get URLs for VRChat content creation. Perfect for avatar textures, world images, and custom graphics in Unity for VRChat SDK.",
    benefits: {
        title: "Why Use Our VRChat Image Hosting?",
        items: [
            {
                title: "Creator Friendly",
                description: "Get clean, direct URLs that you can reference during VRChat avatar and world development in Unity.",
            },
            {
                title: "Fast Global CDN",
                description: "Images load quickly for VRChat users worldwide. No lag loading your custom textures.",
            },
            {
                title: "All Formats Supported",
                description: "Upload PNG, JPG, and other formats. Perfect for avatar textures, emission maps, and world decorations.",
            },
            {
                title: "Easy Sharing",
                description: "Share texture references with other VRChat creators. Collaborate on avatar and world projects easily.",
            },
        ],
    },
    steps: {
        title: "How to Get Image URLs for VRChat",
        items: [
            {
                title: "Prepare Your Texture",
                description: "Create your avatar texture, world image, or UI element. PNG with transparency works great.",
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
                title: "Use in Unity/VRChat",
                description: "Download the image in Unity or share the URL for easy texture reference during development.",
            },
        ],
    },
    tips: {
        title: "Pro Tips for VRChat Creators",
        items: [
            "Use PNG for textures with transparency like avatar overlays",
            "Power-of-2 dimensions (1024x1024, 2048x2048) work best in Unity",
            "Compress textures for smaller avatar/world file sizes",
            "Great for sharing work-in-progress textures with collaborators",
            "Use for reference images when commissioning avatar work",
            "Sign in to organize textures by avatar or world project",
        ],
    },
    faq: {
        title: "VRChat Image Hosting FAQ",
        items: [
            {
                question: "Can I load external URLs in VRChat?",
                answer: "VRChat worlds can use Udon videoplayers for dynamic content. For avatar/world textures, you'll import images into Unity during the build process.",
            },
            {
                question: "What size should VRChat textures be?",
                answer: "Use power-of-2 dimensions. For avatars, 1024x1024 to 4096x4096 is common. Smaller sizes help with avatar performance rank.",
            },
            {
                question: "Is this free for VRChat creators?",
                answer: "Yes! Upload images for free. Perfect for sharing textures with collaborators or organizing your VRChat assets.",
            },
            {
                question: "Can I use this for VRChat world video players?",
                answer: "For dynamic image/video content in worlds, you'd need streaming URLs. Our static image URLs work great for development reference and texture sharing.",
            },
            {
                question: "Do you support texture sheets?",
                answer: "Yes! Upload sprite sheets, texture atlases, and other large format images up to 10MB.",
            },
        ],
    },
    cta: {
        title: "Ready to Upload VRChat Images?",
        description: "Get instant image URLs for your VRChat creations. Free and fast!",
    },
}

export default async function VRChatPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const useCaseDict = dict.useCases?.vrchat || defaultUseCaseContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="VRChat Image Hosting"
                description="Free image hosting for VRChat avatar and world creation."
                url={`/${locale}/use-cases/vrchat`}
                featureList={[
                    "Creator friendly URLs",
                    "Fast global CDN",
                    "All formats supported",
                    "Easy sharing",
                    "No signup required",
                ]}
                keywords={["vrchat image url", "vrchat texture hosting", "vrchat avatar images", "vrchat world textures"]}
            />
            <HowToJsonLd
                name="How to Get Image URLs for VRChat"
                description="Upload images and get URLs for VRChat avatar and world development"
                steps={[
                    { name: "Prepare Texture", text: "Create your avatar or world texture" },
                    { name: "Upload", text: "Upload your image to ImageToURL" },
                    { name: "Copy URL", text: "Copy the generated direct image URL" },
                    { name: "Use in Unity", text: "Download and import into your Unity VRChat project" },
                ]}
            />
            <FAQJsonLd items={useCaseDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Use Cases", url: `${BASE_URL}/${locale}/use-cases` },
                    { name: "VRChat", url: `${BASE_URL}/${locale}/use-cases/vrchat` },
                ]}
            />
            <UseCaseTemplate locale={locale} dict={dict} useCaseDict={useCaseDict} />
        </>
    )
}
