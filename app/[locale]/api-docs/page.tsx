import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NavAuth } from "@/components/nav-auth"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { BreadcrumbJsonLd } from "@/components/json-ld"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imagetourl.cloud"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params

    return {
        title: "Image to URL API Documentation - Developer Guide | ImageToURL",
        description: "Complete API documentation for ImageToURL. Learn how to upload images programmatically and get shareable URLs. RESTful API with examples in cURL, JavaScript, and Python.",
        keywords: "image to url api, image upload api, image hosting api, api documentation, developer api",
        alternates: {
            canonical: `/${locale}/api-docs`,
        },
        openGraph: {
            title: "Image to URL API Documentation",
            description: "Complete API documentation for uploading images and getting shareable URLs.",
            url: `/${locale}/api-docs`,
            siteName: "ImageToURL",
            locale: locale,
            type: "website",
        },
    }
}

export default async function ApiDocsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${BASE_URL}/${locale}` },
                    { name: "API Documentation", url: `${BASE_URL}/${locale}/api-docs` },
                ]}
            />
            <div className="bg-dark text-zinc-300 min-h-screen flex flex-col">
                <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
                <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

                <Header locale={locale} dict={dict.nav}>
                    <Suspense
                        fallback={
                            <Button size="sm" className="bg-white text-dark rounded-full" disabled>
                                {dict.nav.signIn}
                            </Button>
                        }
                    >
                        <NavAuth locale={locale} signInText={dict.nav.signIn} />
                    </Suspense>
                </Header>

                <main className="flex-grow relative z-10 px-4 py-12 md:py-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                                </span>
                                Developer API
                            </div>
                            <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
                                API Documentation
                            </h1>
                            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                                Upload images programmatically and get shareable URLs. Simple RESTful API with support for all major programming languages.
                            </p>
                        </div>

                        {/* Quick Start */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold text-white mb-4">Quick Start</h2>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <p className="text-zinc-300 mb-4">
                                    Upload an image using a simple POST request:
                                </p>
                                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                                    <code className="text-green-400">{`curl -X POST https://imagetourl.cloud/api/upload \\
  -F "file=@image.jpg"`}</code>
                                </pre>
                            </div>
                        </section>

                        {/* Endpoints */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold text-white mb-4">Endpoints</h2>

                            <div className="space-y-6">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">POST</span>
                                        <code className="text-white">/api/upload</code>
                                    </div>
                                    <p className="text-zinc-400 mb-4">Upload a single image and receive a shareable URL.</p>

                                    <h4 className="text-white font-medium mb-2">Request</h4>
                                    <ul className="text-zinc-400 text-sm space-y-1 mb-4">
                                        <li>• Content-Type: <code className="text-zinc-300">multipart/form-data</code></li>
                                        <li>• Body: <code className="text-zinc-300">file</code> - Image file (max 10MB)</li>
                                    </ul>

                                    <h4 className="text-white font-medium mb-2">Response</h4>
                                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                                        <code className="text-zinc-300">{`{
  "success": true,
  "url": "https://imagetourl.cloud/i/abc123.jpg",
  "shortUrl": "https://imagetourl.cloud/s/xyz",
  "deleteUrl": "https://imagetourl.cloud/d/abc123"
}`}</code>
                                    </pre>
                                </div>
                            </div>
                        </section>

                        {/* Code Examples */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold text-white mb-4">Code Examples</h2>

                            <div className="space-y-6">
                                {/* JavaScript */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-white font-medium mb-3">JavaScript / Node.js</h3>
                                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                                        <code className="text-zinc-300">{`const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('https://imagetourl.cloud/api/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.url); // Your image URL`}</code>
                                    </pre>
                                </div>

                                {/* Python */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-white font-medium mb-3">Python</h3>
                                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                                        <code className="text-zinc-300">{`import requests

with open('image.jpg', 'rb') as f:
    response = requests.post(
        'https://imagetourl.cloud/api/upload',
        files={'file': f}
    )

data = response.json()
print(data['url'])  # Your image URL`}</code>
                                    </pre>
                                </div>

                                {/* cURL */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-white font-medium mb-3">cURL</h3>
                                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                                        <code className="text-zinc-300">{`curl -X POST https://imagetourl.cloud/api/upload \\
  -F "file=@/path/to/image.jpg"`}</code>
                                    </pre>
                                </div>
                            </div>
                        </section>

                        {/* Rate Limits */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold text-white mb-4">Rate Limits</h2>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-zinc-400">
                                            <th className="pb-3">Plan</th>
                                            <th className="pb-3">Requests/Hour</th>
                                            <th className="pb-3">Max File Size</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-300">
                                        <tr className="border-t border-white/10">
                                            <td className="py-3">Anonymous</td>
                                            <td>20</td>
                                            <td>10MB</td>
                                        </tr>
                                        <tr className="border-t border-white/10">
                                            <td className="py-3">Free (Signed In)</td>
                                            <td>100</td>
                                            <td>10MB</td>
                                        </tr>
                                        <tr className="border-t border-white/10">
                                            <td className="py-3">Pro</td>
                                            <td>1000</td>
                                            <td>50MB</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Support */}
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">Need Help?</h2>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <p className="text-zinc-400">
                                    Have questions about the API? Contact us at{" "}
                                    <a href="mailto:api@imagetourl.cloud" className="text-brand hover:underline">
                                        api@imagetourl.cloud
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer locale={locale} dict={dict.footer} />
            </div>
        </>
    )
}
