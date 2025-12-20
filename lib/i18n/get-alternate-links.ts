import { locales, type Locale } from "./config"

export function getAlternateLinks(pathname: string, currentLocale: Locale) {
  // Remove locale prefix from pathname
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/"

  return locales.map((locale) => ({
    locale,
    url: `/${locale}${pathnameWithoutLocale}`,
  }))
}
