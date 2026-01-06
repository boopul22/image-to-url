import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import { mdxComponents } from '@/components/blog/mdx-components'

/**
 * Remove FAQ section from content since we render it separately with BlogFAQ component
 */
function removeFAQSection(source: string): string {
  // Remove the FAQ section entirely - it will be rendered separately
  return source.replace(
    /\n---\s*\n##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n[\s\S]*$/i,
    ''
  ).replace(
    /\n##\s+(?:FAQ|Frequently Asked Questions|FAQ Section)[^\n]*\n[\s\S]*$/i,
    ''
  )
}

export async function processMDX(source: string) {
  // Remove FAQ section as it's rendered separately
  const cleanedSource = removeFAQSection(source)

  const { content } = await compileMDX({
    source: cleanedSource,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
              },
            },
          ],
          [
            rehypePrismPlus,
            {
              ignoreMissing: true,
              showLineNumbers: true,
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  })

  return content
}
