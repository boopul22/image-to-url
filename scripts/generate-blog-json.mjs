#!/usr/bin/env node
/**
 * Generate Blog JSON for Cloudflare Workers
 * 
 * This script pre-generates all blog content as JSON at build time,
 * so it can be imported and used in Cloudflare Workers environment
 * where filesystem access is not available.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, '..')
const CONTENT_PATH = path.join(ROOT_DIR, 'content', 'blog')
const OUTPUT_PATH = path.join(ROOT_DIR, 'lib', 'blog', 'generated-posts.json')

/**
 * Get all MDX files from a directory recursively
 */
function getMdxFiles(dir) {
    const files = []
    if (!fs.existsSync(dir)) return files

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            files.push(...getMdxFiles(fullPath))
        } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
            files.push(fullPath)
        }
    }

    return files
}

/**
 * Extract headings from MDX content for table of contents
 */
function extractHeadings(content) {
    const contentWithoutFAQ = content
        .replace(/\n---\s*\n##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n[\s\S]*$/i, '')
        .replace(/\n##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n[\s\S]*$/i, '')

    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    const headings = []
    let match

    while ((match = headingRegex.exec(contentWithoutFAQ)) !== null) {
        const level = match[1].length
        const title = match[2].trim()
        const id = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        headings.push({ id, title, level })
    }

    return headings
}

/**
 * Extract FAQ items from MDX content
 */
function extractFAQItems(content) {
    const faqItems = []
    const faqSectionMatch = content.match(/##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n([\s\S]*?)(?=\n##\s+[^#]|$)/i)

    if (!faqSectionMatch) return faqItems

    const faqContent = faqSectionMatch[1]
    const questionRegex = /###\s+(?:\d+\.\s*)?(.+?\?)\s*\n([\s\S]*?)(?=\n###|\n##|$)/g
    let match

    while ((match = questionRegex.exec(faqContent)) !== null) {
        const question = match[1].trim()
        const answer = match[2].trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ')

        if (question && answer) {
            faqItems.push({ question, answer })
        }
    }

    return faqItems
}

/**
 * Parse a single MDX file into a Post object
 */
function parsePost(filePath, locale) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        const frontmatter = data

        // Skip drafts in production
        if (frontmatter.draft && process.env.NODE_ENV === 'production') {
            return null
        }

        const slug = path.basename(filePath).replace(/\.mdx?$/, '')
        const stats = readingTime(content)

        return {
            slug,
            locale,
            frontmatter,
            content,
            readingTime: {
                text: stats.text,
                minutes: Math.ceil(stats.minutes),
                words: stats.words,
            },
            headings: extractHeadings(content),
            faqItems: extractFAQItems(content),
        }
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error)
        return null
    }
}

/**
 * Main function to generate blog JSON
 */
function generateBlogJson() {
    console.log('🔄 Generating blog JSON...')

    const allPosts = {}
    const locales = fs.readdirSync(CONTENT_PATH, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)

    console.log(`📁 Found locales: ${locales.join(', ')}`)

    for (const locale of locales) {
        const localePath = path.join(CONTENT_PATH, locale)
        const files = getMdxFiles(localePath)

        allPosts[locale] = []

        for (const file of files) {
            const post = parsePost(file, locale)
            if (post) {
                allPosts[locale].push(post)
            }
        }

        // Sort by publishedAt descending
        allPosts[locale].sort((a, b) => {
            const dateA = a.frontmatter.publishedAt ? new Date(a.frontmatter.publishedAt).getTime() : 0
            const dateB = b.frontmatter.publishedAt ? new Date(b.frontmatter.publishedAt).getTime() : 0
            return dateB - dateA
        })

        console.log(`  ✅ ${locale}: ${allPosts[locale].length} posts`)
    }

    // Write to JSON file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allPosts, null, 2))
    console.log(`\n✨ Generated ${OUTPUT_PATH}`)

    // Summary
    const totalPosts = Object.values(allPosts).reduce((sum, posts) => sum + posts.length, 0)
    console.log(`📊 Total: ${totalPosts} posts across ${locales.length} locales`)
}

// Run
generateBlogJson()
