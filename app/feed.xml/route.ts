import { defaultLocale } from '@/lib/i18n/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imagetourl.cloud'

// Static blog posts data for RSS feed (add new posts here)
// Note: Blog content is pre-built at build time, this is just for the RSS feed
const BLOG_POSTS = [
  {
    slug: 'best-practices-image-to-url-cdn-delivery',
    title: 'Best Practices for Image to URL CDN Delivery',
    description: 'Learn the best practices for optimizing image delivery through CDN for faster loading times and better user experience.',
    publishedAt: '2024-01-15',
    author: 'ImageToURL Team',
    category: 'Performance',
    tags: ['CDN', 'Performance', 'Optimization'],
  },
  // Add more blog posts as needed
]

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>ImageToURL Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Tips, tutorials, and insights about image hosting and web development. Learn about image optimization, CDN performance, and best practices for developers and creators.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/android-chrome-512x512.png</url>
      <title>ImageToURL Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
    ${BLOG_POSTS
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/${defaultLocale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${defaultLocale}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(feed.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
