/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled reactCompiler due to Turbopack build issues on Vercel
  // reactCompiler: true,
  // cacheComponents: false,
  // Fix Supabase ESM import error
  serverExternalPackages: ['@supabase/ssr', '@supabase/supabase-js'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagetourl.cloud",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-141831e61e69445289222976a15b6fb3.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
  async redirects() {
    // Redirects for malformed URLs from previous sitemap bug
    // Pattern: /{locale}/{otherlocale}og → /{locale} (homepage)
    // Pattern: /{locale}/{otherlocale}og/{path} → /{locale}/tools/{path}
    // Pattern: /{locale}/{otherlocale}ols/{path} → /{locale}/tools/{path}

    // Locale codes used in the malformed URLs
    const localePatterns = [
      'pt', 'gu', 'th', 'de', 'hi', 'ur', 'fa', 'id', 'bn', 'my',
      'tr', 'ta', 'te', 'or', 'en', 'sw', 'ja', 'vi', 'pl', 'es',
      'zh', 'ar', 'ru', 'mr', 'uk', 'ml', 'ko', 'it', 'fr', 'kn'
    ];

    const redirects = [];

    // Generate redirects for each locale pattern
    for (const loc of localePatterns) {
      // Pattern: /en/{loc}og → /en (malformed tools page without path)
      redirects.push({
        source: `/:locale/${loc}og`,
        destination: '/:locale',
        permanent: true,
      });

      // Pattern: /en/{loc}og/bulk-upload-images-guide → /en/tools/bulk-upload
      redirects.push({
        source: `/:locale/${loc}og/bulk-upload-images-guide`,
        destination: '/:locale/tools/bulk-upload',
        permanent: true,
      });

      // Pattern: /en/{loc}og/:path* → /en/tools/:path* (catch-all for other paths)
      redirects.push({
        source: `/:locale/${loc}og/:path*`,
        destination: '/:locale/tools/:path*',
        permanent: true,
      });

      // Pattern: /en/{loc}ols/jpg-to-url → /en/tools/jpg-to-url
      redirects.push({
        source: `/:locale/${loc}ols/:path*`,
        destination: '/:locale/tools/:path*',
        permanent: true,
      });

      // Pattern: /en/{loc}ools/:path* → /en/tools/:path* (alternative corruption)
      redirects.push({
        source: `/:locale/${loc}ools/:path*`,
        destination: '/:locale/tools/:path*',
        permanent: true,
      });
    }

    return redirects;
  },
}

export default nextConfig
