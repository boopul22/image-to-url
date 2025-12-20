import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Locale } from "@/lib/i18n/config"
import Link from "next/link"
import { ImageIcon } from "lucide-react"
import { Suspense } from "react"

async function AuthRedirect({ locale }: { locale: Locale }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(`/${locale}/dashboard`)
  }

  return null
}

export default async function LoginPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <Suspense fallback={null}>
        <AuthRedirect locale={locale} />
      </Suspense>
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
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
          <h1 className="text-3xl font-semibold text-white mb-2">Welcome back</h1>
          <p className="text-zinc-400">Sign in to access your uploads and manage your images</p>
        </div>

        <div className="bg-surface rounded-2xl p-6 shadow-2xl border border-white/5">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/30 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-4">
          <Link href={`/${locale}`} className="hover:text-brand transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
