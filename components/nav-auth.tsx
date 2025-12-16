import { createClient } from "@/lib/supabase/server"
import { UserNav } from "@/components/auth/user-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"

export async function NavAuth({ locale, signInText }: { locale: Locale; signInText: string }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return <UserNav user={user} locale={locale} />
  }

  return (
    <Button
      asChild
      size="sm"
      className="bg-white text-dark hover:bg-zinc-200 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
    >
      <Link href={`/${locale}/auth/login`}>{signInText}</Link>
    </Button>
  )
}
