import type { Metadata } from 'next';
import type { PostFrontmatter } from './content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://imagetourl.cloud';
const SITE_NAME = 'ImageToURL Blog';

interface SEOConfig {
    title: string;
    description: string;
    url?: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
    noindex?: boolean;
}

/**
 * Generate metadata for a blog post
 */
export function generatePostMetadata(
    slug: string,
    frontmatter: PostFrontmatter
): Metadata {
    const url = `${SITE_URL}/blog/${slug}`;
    const image = frontmatter.image?.src || '/images/og-default.jpg';
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    return {
        title: frontmatter.title,
        description: frontmatter.description,
        keywords: frontmatter.seo?.keywords || frontmatter.tags,
        authors: [{ name: frontmatter.author }],
        openGraph: {
            title: frontmatter.title,
            description: frontmatter.description,
            url,
            siteName: SITE_NAME,
            type: 'article',
            publishedTime: frontmatter.publishedAt,
            modifiedTime: frontmatter.updatedAt || frontmatter.publishedAt,
            authors: [frontmatter.author],
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: frontmatter.image?.alt || frontmatter.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: frontmatter.title,
            description: frontmatter.description,
            images: [imageUrl],
        },
        alternates: {
            canonical: frontmatter.seo?.canonicalUrl || url,
        },
        robots: frontmatter.seo?.noindex
            ? { index: false, follow: true }
            : undefined,
    };
}

/**
 * Generate metadata for the blog listing page
 */
export function generateBlogListMetadata(): Metadata {
    return {
        title: 'Blog | ImageToURL',
        description: 'Explore articles about image hosting, web development, SEO optimization, and modern web technologies.',
        openGraph: {
            title: 'Blog | ImageToURL',
            description: 'Explore articles about image hosting, web development, SEO optimization, and modern web technologies.',
            url: `${SITE_URL}/blog`,
            siteName: SITE_NAME,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog | ImageToURL',
            description: 'Explore articles about image hosting, web development, SEO optimization, and modern web technologies.',
        },
    };
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateArticleJsonLd(
    slug: string,
    frontmatter: PostFrontmatter,
    readingTime: string
): object {
    const url = `${SITE_URL}/blog/${slug}`;
    const image = frontmatter.image?.src || '/images/og-default.jpg';
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: frontmatter.title,
        description: frontmatter.description,
        image: imageUrl,
        datePublished: frontmatter.publishedAt,
        dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
        author: {
            '@type': 'Person',
            name: frontmatter.author,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        wordCount: readingTime.match(/\d+/)?.[0] || undefined,
        articleSection: frontmatter.category,
        keywords: frontmatter.tags?.join(', '),
    };
}

/**
 * Generate JSON-LD structured data for the blog listing page
 */
export function generateBlogListJsonLd(): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${SITE_NAME}`,
        description: 'Articles about image hosting, web development, and SEO optimization.',
        url: `${SITE_URL}/blog`,
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
            },
        },
    };
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(
    items: { name: string; url: string }[]
): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        })),
    };
}
