import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'
import { Callout } from './callout'
import { CodeBlock } from './code-block'

function createHeading(level: 1 | 2 | 3 | 4) {
  const Tag = `h${level}` as const
  const styles = {
    1: 'text-2xl sm:text-3xl font-bold mt-6 sm:mt-7 mb-3 sm:mb-4 tracking-tight',
    2: 'text-xl sm:text-2xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4 tracking-tight border-b border-zinc-800 pb-3',
    3: 'text-lg sm:text-xl font-semibold mt-7 sm:mt-8 mb-2 sm:mb-3 tracking-tight',
    4: 'text-base sm:text-lg font-semibold mt-6 sm:mt-7 mb-2 sm:mb-3',
  }

  return function Heading({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Tag
        id={id}
        className={cn(
          styles[level],
          'text-white scroll-mt-24',
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
}

function hasBlockChildren(children: React.ReactNode): boolean {
  let hasBlock = false
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // Check if it's an image (which becomes a figure with figcaption)
      if (child.type === 'img' || child.type === OptimizedImage ||
        (typeof child.type === 'function' && child.type.name === 'OptimizedImage')) {
        hasBlock = true
      }
    }
  })
  return hasBlock
}

function Paragraph({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  // If children contain block-level elements like images, use div to avoid hydration errors
  if (hasBlockChildren(children)) {
    return (
      <div
        className="text-zinc-300 text-base sm:text-[17px] leading-[1.8] mb-4 sm:mb-5"
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <p
      className="text-zinc-300 text-base sm:text-[17px] leading-[1.8] mb-4 sm:mb-5"
      {...props}
    >
      {children}
    </p>
  )
}

function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith('http')
  const className = 'text-brand hover:text-brand/80 underline underline-offset-4 transition-colors'

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
        <span className="inline-block ml-1 text-xs">↗</span>
      </a>
    )
  }

  return (
    <Link href={href || '#'} className={className} {...props}>
      {children}
    </Link>
  )
}

import { ChevronRight } from 'lucide-react'

function UnorderedList({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className="my-6 space-y-3"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(child as React.ReactElement<any>, {
            type: 'unordered'
          })
        }
        return child
      })}
    </ul>
  )
}

function OrderedList({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  let counter = 0
  return (
    <ol
      className="my-6 space-y-3"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          counter++
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(child as React.ReactElement<any>, {
            type: 'ordered',
            index: counter
          })
        }
        return child
      })}
    </ol>
  )
}

function ListItem({
  children,
  type = 'unordered',
  index,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & { type?: 'unordered' | 'ordered'; index?: number }) {
  return (
    <li
      className="flex items-start gap-3 text-zinc-200 text-base sm:text-[17px] leading-relaxed"
      {...props}
    >
      {type === 'unordered' ? (
        <span className="flex-shrink-0 mt-1.5 p-0.5 rounded-full bg-brand/10 text-brand">
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
        </span>
      ) : (
        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-bold mt-0.5 font-mono">
          {index}
        </span>
      )}
      <span className="flex-1">{children}</span>
    </li>
  )
}

function Blockquote({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className="relative my-5 sm:my-6 pl-5 sm:pl-6 py-4 border-l-4 border-brand bg-zinc-900/50 rounded-r-xl"
      {...props}
    >
      <div className="text-zinc-300 text-base sm:text-lg italic leading-relaxed">
        {children}
      </div>
    </blockquote>
  )
}

function PreBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <div className="relative my-4 sm:my-6 -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden">
      <pre
        className="bg-zinc-900 border-y sm:border border-zinc-800 p-3 sm:p-4 overflow-x-auto text-sm"
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}

function InlineCode({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="bg-zinc-800 text-brand px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  )
}

function OptimizedImage({
  src,
  alt,
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== 'string') return null

  const isExternal = src.startsWith('http')

  if (isExternal) {
    // Check if it's an R2 image that needs proxying
    const isR2Image = src.includes('pub-141831e61e69445289222976a15b6fb3.r2.dev') || src.includes('imagetourl.cloud')
    const imageSrc = isR2Image
      ? `/api/proxy-image?url=${encodeURIComponent(src)}`
      : src

    return (
      <figure className="my-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={alt || ''}
          className="rounded-lg w-full"
          loading="lazy"
          {...props}
        />
        {alt && (
          <figcaption className="text-center text-sm text-zinc-500 mt-2">
            {alt}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="my-5">
      <Image
        src={src}
        alt={alt || ''}
        width={Number(width) || 800}
        height={Number(height) || 450}
        className="rounded-lg w-full"
        loading="lazy"
      />
      {alt && (
        <figcaption className="text-center text-sm text-zinc-500 mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-5 sm:my-6 overflow-x-auto rounded-xl border border-zinc-800">
      <table
        className="w-full border-collapse text-sm sm:text-base"
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function TableHead({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className="bg-zinc-900/80" {...props}>
      {children}
    </thead>
  )
}

function TableBody({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-zinc-800" {...props}>{children}</tbody>
}

function TableRow({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors" {...props}>
      {children}
    </tr>
  )
}

function TableHeader({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-4 py-3 sm:px-5 sm:py-4 text-left font-semibold text-white border-b border-zinc-800"
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className="px-4 py-3 sm:px-5 sm:py-4 text-zinc-300" {...props}>
      {children}
    </td>
  )
}

function HorizontalRule() {
  return <hr className="border-zinc-800 my-8" />
}

function Strong({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  )
}

function Emphasis({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <em className="italic" {...props}>
      {children}
    </em>
  )
}

export const mdxComponents: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  p: Paragraph,
  a: CustomLink,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  pre: PreBlock,
  code: InlineCode,
  img: OptimizedImage,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  hr: HorizontalRule,
  strong: Strong,
  em: Emphasis,
  // Custom components
  Callout,
  CodeBlock,
  Image: OptimizedImage,
}
