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
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.videoToUrl

    return {
        title: toolDict?.meta?.title || "Video to URL Converter - Free MP4 Link Generator | ImageToURL",
        description: toolDict?.meta?.description || "Convert video files to shareable URLs instantly. Free online video to URL converter - upload MP4, WebM, and more. No signup required. Best free video to link converter.",
        keywords: toolDict?.meta?.keywords || "video to url, video to url converter, mp4 to link, video link generator, convert video to url, video to url free, how to turn mp4 into link",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/video-to-url`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Video to URL Converter - Free Online Tool",
            description: toolDict?.meta?.description || "Convert video files to shareable URLs instantly.",
            url: `/${locale}/tools/video-to-url`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

const defaultToolContent = {
    title: "Video to URL Converter",
    subtitle: "Free Online MP4 Link Generator",
    description: "Convert your video files to shareable URLs instantly. Upload MP4, WebM, or other video formats and get a direct link that works anywhere - perfect for sharing clips, tutorials, and more.",
    features: {
        title: "Why Use Our Video to URL Converter?",
        items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support for MP4, WebM, and more",
            "Files up to 10MB supported",
            "Instant shareable links",
            "Global CDN for fast streaming",
            "99.9% uptime guarantee",
            "Secure HTTPS links",
        ],
    },
    howItWorks: {
        title: "How to Convert Video to URL",
        steps: [
            {
                title: "Upload Your Video",
                description: "Drag and drop your video file or click to browse. We accept MP4, WebM, and other common video formats up to 10MB.",
            },
            {
                title: "Get Your URL",
                description: "Your video is instantly uploaded to our global CDN. A shareable URL is generated automatically for instant streaming.",
            },
            {
                title: "Share Anywhere",
                description: "Copy the URL and share it via email, social media, messaging apps, or embed it in websites and applications.",
            },
        ],
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            {
                question: "How do I convert a video to a URL?",
                answer: "Simply drag and drop your video file onto our upload zone or click to select a file. Your video will be instantly uploaded and you'll receive a shareable URL.",
            },
            {
                question: "Is this video to URL converter free?",
                answer: "Yes, our video to URL converter is 100% free. You can upload video files up to 10MB without creating an account.",
            },
            {
                question: "What video formats are supported?",
                answer: "We support popular video formats including MP4, WebM, and MOV. MP4 is recommended for best compatibility across all devices and platforms.",
            },
            {
                question: "How long will my video URL stay active?",
                answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep your videos indefinitely and manage expiration times.",
            },
            {
                question: "Can I embed the video on my website?",
                answer: "Yes! The URL we generate is a direct link to your video file. You can use it in HTML5 video tags, embed it in websites, or share it anywhere.",
            },
            {
                question: "How do I turn an MP4 into a link?",
                answer: "Upload your MP4 file using our converter. Within seconds, you'll get a shareable link that anyone can use to view or download your video.",
            },
        ],
    },
    relatedTools: {
        title: "Related Tools",
        tools: [
            { name: "Image to URL", href: "/", description: "Convert images to URLs" },
            { name: "GIF to URL", href: "/tools/gif-to-url", description: "Convert animated GIFs to URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple files at once" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "MDN: Video and Audio", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content", description: "Complete guide to video on the web" },
            { name: "Web.dev: Video Best Practices", href: "https://web.dev/articles/fast-playback-with-preload", description: "Optimize video for faster loading" },
            { name: "MP4 Format - Wikipedia", href: "https://en.wikipedia.org/wiki/MP4_file_format", description: "Learn about MP4 video format specifications" },
        ],
    },
    meta: {
        title: "Video to URL Converter - Free MP4 Link Generator | ImageToURL",
        description: "Convert video files to shareable URLs instantly. Free online video to URL converter with no signup required.",
        keywords: "video to url, video to url converter, mp4 to link, video link generator, convert video to url",
    },
}

export default async function VideoToUrlPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.videoToUrl || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Video to URL Converter"
                description="Convert video files to shareable URLs instantly. Free online MP4 link generator."
                url={`/${locale}/tools/video-to-url`}
                featureList={[
                    "Free video to URL conversion",
                    "No signup required",
                    "Support for MP4, WebM formats",
                    "Up to 10MB file size",
                    "Instant shareable links",
                    "Global CDN streaming",
                ]}
                keywords={["video to url", "mp4 to link", "video link generator", "convert video to url"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Video to URL", url: `${BASE_URL}/${locale}/tools/video-to-url` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
