# Blog Writing Guide for ImageToURL

Quick reference guide for AI assistants to write blogs for this codebase.

## 📋 Required Files to Review

1. **[Title_for_blog.md](file:///Users/bipulkumar/Downloads/Imagetourl/Title_for_blog.md)** - List of blog titles to write (mark as `[x]` when complete)
2. **[Howtowriteblog.md](file:///Users/bipulkumar/Downloads/Imagetourl/Howtowriteblog.md)** - SEO writing prompts and structure guidelines
3. **[bulk-upload-images-guide.mdx](file:///Users/bipulkumar/Downloads/Imagetourl/content/blog/en/bulk-upload-images-guide.mdx)** - Working example blog for reference
4. **[upload_r2_webp.py](file:///Users/bipulkumar/Downloads/Imagetourl/scripts/upload_r2_webp.py)** - Script to upload images to R2 CDN

## 🎨 Image Requirements

### Generate 3 Images Per Blog:
1. **Featured Image** - MUST include blog title text
2. **Content Image 1** - Relevant to main section
3. **Content Image 2** - Relevant to another section

### Image Style:
- **Colors**: Orange (#FF6B35) and White (#FFFFFF)
- **Style**: Doodle-style illustration - playful, hand-drawn aesthetic with minimal, clean design
- **Aspect Ratio**: 2:1 horizontal
- **Format**: Generate as PNG, convert to WebP via script
- **Note**: Use doodle/sketch style for a friendly, approachable look

### Image Upload Process:
1. Generate images using `generate_image` tool
2. Update `upload_r2_webp.py`:
   - Change `ARTIFACT_DIR` to current conversation brain folder
   - Update `images_to_upload` array with your image search terms and new names
3. Run: `python3 scripts/upload_r2_webp.py`
4. Use returned URLs in blog frontmatter and content

## 📝 Blog Structure

### Frontmatter (Required):
```yaml
---
title: "Your SEO Title Here"
description: "Meta description under 155 chars"
publishedAt: "2026-01-XX" (future date)
author: "ImageToURL Team"
category: "Guides" or "Best Practices"
tags: ["tag1", "tag2", "tag3"]
coverImage: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/your-featured-image.webp"
draft: false
---
```

### Content Requirements:
- **Word Count**: 3,000+ words
- **Tone**: Conversational, professional, helpful
- **Reading Level**: 6th-8th grade
- **Images**: Embed 2 content images using markdown: `![Alt text](URL)`
- **FAQ Section**: 10 questions at the end (see FAQ Writing Guide below)
- **Tables**: Use for comparisons and data
- **Internal Links**: Link to [ImageToURL.cloud](https://imagetourl.cloud/) - link site to all main keywords with proper CTA
- **Research**: Do all the research on the internet to ensure accuracy and up-to-date information

## 📝 FAQ Writing Guide

FAQs are automatically extracted and rendered as an interactive accordion with proper SEO schema. Follow these rules for best results.

### FAQ Format (CRITICAL):

```markdown
---

## FAQ Section

### What is the first question users commonly ask?

Write a clear, helpful answer in 2-4 sentences. Keep it concise but informative. Include relevant keywords naturally.

### How do I accomplish a specific task?

Provide step-by-step guidance or a direct answer. Focus on solving the user's problem quickly.

### Why should I choose this solution over alternatives?

Explain benefits clearly. Use specific examples when possible.
```

### FAQ Writing Rules:

1. **Always end questions with `?`** - The system extracts questions by looking for `?`
2. **Use `### ` for questions** - H3 headings inside the FAQ section
3. **Start section with `## FAQ Section`** - Or `## FAQ` or `## Frequently Asked Questions`
4. **Add `---` separator** - Place horizontal rule before FAQ section
5. **No numbered headings** - Write `### What is...` NOT `### 1. What is...`

### Types of Questions to Include:

| Question Type | Example | Purpose |
|--------------|---------|---------|
| **What/Definition** | What is bulk image uploading? | Define key terms |
| **How-to** | How do I upload multiple images at once? | Solve problems |
| **Why/Benefits** | Why should I use a CDN for images? | Explain value |
| **Comparison** | What's the difference between free and paid hosting? | Help decisions |
| **Technical** | What image formats are supported? | Provide specs |
| **Troubleshooting** | Why are my images loading slowly? | Fix issues |
| **Pricing/Limits** | Is there a file size limit? | Set expectations |
| **Security** | Are my images secure and private? | Build trust |
| **Integration** | Can I use this with WordPress? | Show compatibility |
| **Support** | How do I get help if something goes wrong? | Provide assurance |

### Good FAQ Examples:

✅ **Good Question:**
```markdown
### How long do uploaded image URLs remain active?

Free image URLs are permanent by default and never expire unless you choose to delete them. You can also set custom expiration times of 1 day, 7 days, or 30 days if you need temporary links for specific use cases.
```

✅ **Good Question:**
```markdown
### Can I upload images without creating an account?

Yes, ImageToURL allows instant uploads without any signup or registration. Simply drag and drop your images to get shareable URLs immediately. Creating a free account gives you access to a dashboard to manage all your uploads.
```

### Bad FAQ Examples:

❌ **Avoid:**
```markdown
### 1. What is image hosting?
```
*Problem: Numbered heading breaks MDX*

❌ **Avoid:**
```markdown
### Image Hosting Benefits
```
*Problem: Not a question (no `?`)*

❌ **Avoid:**
```markdown
### What is the upload limit
```
*Problem: Missing `?` at end*

### Answer Writing Tips:

1. **Be concise** - 2-4 sentences per answer, not paragraphs
2. **Answer directly** - Put the answer first, then explain
3. **Use natural keywords** - Include terms people search for
4. **Mention ImageToURL** - Reference the product where relevant
5. **Be specific** - Use numbers and specifics (e.g., "up to 10MB" not "large files")
6. **Stay helpful** - Focus on user benefit, not features

## ⚠️ MDX Syntax Rules (CRITICAL)

**AVOID these patterns that break MDX compilation:**

❌ **DO NOT USE:**
- Headings starting with numbers: `### 1. Title`
- Backticks around technical terms with numbers: `` `HTTP/2` ``
- Less-than symbols in text: `<200ms`, `<2.5s`
- Code blocks with special syntax

✅ **USE INSTEAD:**
- Plain headings: `### Title`
- Plain text for technical terms: `HTTP2` or `HTTP version 2`
- Write out comparisons: `Under 200ms`, `Less than 2.5 seconds`
- Simple markdown formatting only

## 📂 File Location

Save blogs to: `/Users/bipulkumar/Downloads/Imagetourl/content/blog/en/[slug].mdx`

Use SEO-friendly slugs: `best-practices-cdn-delivery.mdx`

## ✅ Completion Checklist

- [ ] Do all research on the internet to ensure accuracy
- [ ] Link site to all main keywords with proper CTA (https://imagetourl.cloud/)
- [ ] Choose title from `Title_for_blog.md`
- [ ] Generate 3 images (featured with title text + 2 content)
- [ ] Upload images to R2 and get URLs
- [ ] Write 3,000+ word blog following `Howtowriteblog.md` structure
- [ ] Use simple MDX syntax (no backticks, no `<` symbols, no numbered headings)
- [ ] Include 10 FAQ questions
- [ ] Add tables for better readability
- [ ] Test blog compiles without errors (`npm run dev`)
- [ ] Mark title as `[x]` in `Title_for_blog.md`

## 🔧 Troubleshooting

**If MDX compilation fails:**
1. Remove ALL backticks from content
2. Replace `<` with "Under" or "Less than"
3. Remove numbers from heading starts
4. Clear Next.js cache: `rm -rf .next`
5. Restart dev server

**Cache Issues:**
- Run `rm -rf .next` to clear Next.js build cache
- Hard refresh browser (Cmd+Shift+R)

## 📖 Reference Example

See [best-practices-image-to-url-cdn-delivery.mdx](file:///Users/bipulkumar/Downloads/Imagetourl/content/blog/en/best-practices-image-to-url-cdn-delivery.mdx) for a working example with proper MDX syntax.
