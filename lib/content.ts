import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface PostFrontmatter {
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
    draft?: boolean;
    image?: {
        src: string;
        alt: string;
    };
    seo?: {
        canonicalUrl?: string;
        noindex?: boolean;
        keywords?: string[];
    };
}

export interface Post {
    slug: string;
    frontmatter: PostFrontmatter;
    content: string;
    readingTime: string;
    readingTimeMinutes: number;
}

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
    readingTime: string;
    image?: {
        src: string;
        alt: string;
    };
}

/**
 * Get all MDX files recursively from the blog directory
 */
function getAllMdxFiles(dir: string): string[] {
    const files: string[] = [];

    if (!fs.existsSync(dir)) {
        return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...getAllMdxFiles(fullPath));
        } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Parse a single post from its file path
 */
export function getPostByPath(filePath: string): Post {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    const frontmatter = data as PostFrontmatter;
    const stats = readingTime(content);

    // Extract slug from file path
    const relativePath = path.relative(BLOG_DIR, filePath);
    const slug = relativePath
        .replace(/\\/g, '/')
        .replace(/\.mdx?$/, '')
        .split('/')
        .pop() || '';

    return {
        slug,
        frontmatter,
        content,
        readingTime: stats.text,
        readingTimeMinutes: Math.ceil(stats.minutes),
    };
}

/**
 * Get a single post by its slug
 */
export function getPostBySlug(slug: string): Post | null {
    const files = getAllMdxFiles(BLOG_DIR);

    for (const file of files) {
        const post = getPostByPath(file);
        if (post.slug === slug) {
            return post;
        }
    }

    return null;
}

/**
 * Get all posts, sorted by publish date (newest first)
 */
export function getAllPosts(): Post[] {
    const files = getAllMdxFiles(BLOG_DIR);

    const posts = files
        .map(getPostByPath)
        .filter(post => !post.frontmatter.draft)
        .sort((a, b) => {
            const dateA = new Date(a.frontmatter.publishedAt);
            const dateB = new Date(b.frontmatter.publishedAt);
            return dateB.getTime() - dateA.getTime();
        });

    return posts;
}

/**
 * Get post metadata for listing pages (without full content)
 */
export function getAllPostsMeta(): PostMeta[] {
    return getAllPosts().map(post => ({
        slug: post.slug,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        publishedAt: post.frontmatter.publishedAt,
        author: post.frontmatter.author,
        category: post.frontmatter.category,
        tags: post.frontmatter.tags,
        featured: post.frontmatter.featured,
        readingTime: post.readingTime,
        image: post.frontmatter.image,
    }));
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): PostMeta[] {
    return getAllPostsMeta().filter(
        post => post.category?.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
    return getAllPostsMeta().filter(
        post => post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
    );
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit = 3): PostMeta[] {
    return getAllPostsMeta()
        .filter(post => post.featured)
        .slice(0, limit);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
    const categories = new Set<string>();
    getAllPostsMeta().forEach(post => {
        if (post.category) {
            categories.add(post.category);
        }
    });
    return Array.from(categories);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
    const tags = new Set<string>();
    getAllPostsMeta().forEach(post => {
        post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}

/**
 * Get paginated posts
 */
export function getPaginatedPosts(
    page: number,
    postsPerPage: number
): { posts: PostMeta[]; totalPages: number; currentPage: number } {
    const allPosts = getAllPostsMeta();
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

    return {
        posts,
        totalPages,
        currentPage: page,
    };
}

/**
 * Get related posts based on category and tags
 */
export function getRelatedPosts(currentSlug: string, limit = 3): PostMeta[] {
    const currentPost = getPostBySlug(currentSlug);
    if (!currentPost) return [];

    const allPosts = getAllPostsMeta().filter(post => post.slug !== currentSlug);

    // Score posts by relevance (same category = 2 points, shared tag = 1 point)
    const scoredPosts = allPosts.map(post => {
        let score = 0;
        if (post.category === currentPost.frontmatter.category) {
            score += 2;
        }
        currentPost.frontmatter.tags?.forEach(tag => {
            if (post.tags?.includes(tag)) {
                score += 1;
            }
        });
        return { post, score };
    });

    return scoredPosts
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.post);
}
