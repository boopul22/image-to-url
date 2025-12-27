"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: Locale) => {
    // Remove current locale from pathname and add new locale
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/"
    const newPath = `/${newLocale}${pathnameWithoutLocale}`
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white transition-colors gap-2 min-w-[100px] sm:min-w-[120px] justify-start focus:outline-none focus-visible:outline-none focus-visible:ring-0"
        >
          <Globe className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline truncate">{localeNames[currentLocale]}</span>
          <span className="sm:hidden">{localeFlags[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            <span className="mr-2">{localeFlags[locale]}</span>
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
