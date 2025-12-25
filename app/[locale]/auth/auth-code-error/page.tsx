import type { Metadata } from "next"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { AlertCircle, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Authentication Error | ImageToURL",
  description: "There was an error during authentication. Please try again.",
  robots: { index: false, follow: false },
}

export default async function AuthCodeErrorPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 group mb-4">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-brand to-brand-dim flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,109,31,0.4)]">
              <ImageIcon size={20} strokeWidth={1.5} />
            </div>
            <span className="font-medium tracking-tight text-white text-xl group-hover:text-white/90 transition-colors">
              IMAGETOURL
            </span>
          </Link>
        </div>

        <div className="bg-surface rounded-2xl p-8 shadow-2xl border border-white/5 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Authentication Error
          </h1>

          <p className="text-zinc-400 mb-8">
            There was a problem signing you in. This could be due to an expired or invalid authentication link. Please try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href={`/${locale}/auth/login`}>Try Again</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}`}>Go Home</Link>
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-4">
          <Link href={`/${locale}`} className="hover:text-brand transition-colors">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
