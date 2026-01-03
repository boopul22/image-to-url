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
    const toolDict = dict.tools?.photoLinkCreator

    return {
        title: toolDict?.meta?.title || "Photo Link Creator - Create Link for Photo Online | ImageToURL",
        description: toolDict?.meta?.description || "Create a link for your photo instantly. Free online photo link creator - simple tool to turn any photo into a shareable web link.",
        keywords: toolDict?.meta?.keywords || "photo link creator, photo to link converter, photo to link, create photo link, make photo link, generate photo link",
        alternates: {
            canonical: `https://www.imagetourl.cloud/${locale}/tools/photo-link-creator`,
        },
        openGraph: {
            title: toolDict?.meta?.title || "Photo Link Creator - Create Link for Photo Online",
            description: toolDict?.meta?.description || "Create a link for your photo instantly. Free online photo link creator.",
            url: `${BASE_URL}/${locale}/tools/photo-link-creator`,
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
    title: "Photo Link Creator",
    subtitle: "Create Web Links for Your Photos",
    description: "The simplest way to create a link for any photo. Upload your image and our photo link creator will instantly generate a URL you can share anywhere.",
    introduction: {
        title: "Create Shareable Links for Your Photos",
        paragraphs: [
            "A photo link creator takes your local photo files and transforms them into web-accessible links that anyone can view. Instead of sending large email attachments or using complicated cloud sharing, you simply upload a photo and receive a link that opens the image directly in any browser.",
            "Our photo link creator is designed for speed and simplicity. Whether you're using a smartphone, tablet, or computer, you can create links for your photos in seconds. The photos are stored on our secure servers with global distribution, ensuring quick loading times for viewers anywhere in the world.",
            "This tool is ideal for sharing vacation photos with family, sending product images to clients, posting visuals in online discussions, or anywhere you need quick access to a photo without file management headaches. No app installation or account creation required.",
        ],
    },
    features: {
        title: "Photo Link Creator Features",
        items: [
            "Create photo links in 1 click",
            "Always free to use",
            "No registration needed",
            "Works with JPG, PNG, WebP",
            "Links valid for 30 days (Free)",
            "Fastest global hosting",
            "Secure and private",
            "Mobile friendly",
        ],
    },
    howItWorks: {
        title: "How to Create a Link for a Photo",
        steps: [
            {
                title: "Choose Photo",
                description: "Select the photo from your gallery or computer that you want to share.",
            },
            {
                title: "Upload",
                description: "Our tool uploads your photo securely and creates a unique web address.",
            },
            {
                title: "Copy Link",
                description: "Get your photo link instantly. Copy it and paste it wherever you want.",
            },
        ],
    },
    useCases: {
        title: "Photo Link Creator Use Cases",
        items: [
            { title: "Family Photo Sharing", description: "Create links for family photos to share in group chats, emails, or printed materials like greeting cards and invitations." },
            { title: "Dating App Profiles", description: "Create links for additional photos to share with matches when in-app uploads are limited or low quality." },
            { title: "Pet & Animal Photos", description: "Share photos of pets with breeders, veterinarians, pet sitters, or adoption agencies with easy-to-copy links." },
            { title: "Vehicle Sales", description: "Create photo links for cars, motorcycles, or boats to include in classified ads, dealer communications, or insurance claims." },
            { title: "Craft & Hobby Sharing", description: "Share photos of art projects, DIY crafts, or collectibles in hobby forums, Facebook groups, or with fellow enthusiasts." },
            { title: "Travel & Vacation Photos", description: "Create links for travel photos to share with friends and family back home without filling up their inbox." },
        ],
    },
    tips: {
        title: "Photo Link Tips",
        items: [
            "Rotate and straighten your photos before uploading—orientation is preserved exactly as you upload.",
            "For faster sharing, bookmark the upload page on your phone's home screen for quick access.",
            "Use the share button on your phone to quickly send the created link via text, email, or social media.",
            "Photos taken with modern phones can be large—consider resizing if the recipient has slow internet.",
            "Create a free account to access your photo links from any device and prevent them from expiring.",
            "For sensitive or private photos, share the link only with intended recipients—anyone with the link can view it.",
        ],
    },
    faq: {
        title: "Photo Link Questions",
        items: [
            {
                question: "What does the photo link creator do?",
                answer: "It takes your photo file and puts it on the internet with a unique address (URL), so you can send that link to friends or post it online.",
            },
            {
                question: "Is it free to create photo links?",
                answer: "Yes, our photo link creator is 100% free. You can create as many links as you like.",
            },
            {
                question: "Can I create links for large photos?",
                answer: "Yes, we support high-quality photos up to 10MB in size.",
            },
            {
                question: "Do I need an app to use this?",
                answer: "No, this works directly in your web browser on any phone, tablet, or computer.",
            },
        ],
    },
    relatedTools: {
        title: "Helper Tools",
        tools: [
            { name: "Photo to URL", href: "/tools/photo-to-url", description: "Convert photo to URL" },
            { name: "Picture to Link", href: "/tools/picture-to-link", description: "Convert picture to link" },
            { name: "Upload Image to URL", href: "/tools/upload-image-to-url", description: "Upload image tool" },
        ],
    },
    externalResources: {
        title: "Helpful Resources",
        resources: [
            { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/image-optimization", description: "Google's guide to optimizing images for the web" },
            { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
            { name: "Cloudflare: What is a CDN?", href: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", description: "Understanding content delivery networks" },
        ],
    },
    meta: {
        title: "Photo Link Creator - Create Link for Photo Online | ImageToURL",
        description: "Create a link for your photo instantly. Free online photo link creator.",
        keywords: "photo link creator, photo to link converter, photo to link",
    },
}

export default async function PhotoLinkCreatorPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const toolDict = dict.tools?.photoLinkCreator || defaultToolContent

    return (
        <>
            <SoftwareApplicationJsonLd
                locale={locale}
                name="Photo Link Creator"
                description="Create a link for your photo instantly. Free online photo link creator."
                url={`/${locale}/tools/photo-link-creator`}
                featureList={[
                    "Create photo links instantly",
                    "Free service",
                    "No signup needed",
                    "Secure hosting",
                ]}
                keywords={["photo link creator", "photo to link converter", "create photo link"]}
            />
            <FAQJsonLd items={toolDict.faq.items} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "Tools", url: `${BASE_URL}/${locale}/tools` },
                    { name: "Photo Link Creator", url: `${BASE_URL}/${locale}/tools/photo-link-creator` },
                ]}
            />
            <ToolPageTemplate locale={locale} dict={dict} toolDict={toolDict} />
        </>
    )
}
