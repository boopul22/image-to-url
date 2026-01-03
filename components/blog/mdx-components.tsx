import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'
import { Callout } from './callout'
import { CodeBlock } from './code-block'

function createHeading(level: 1 | 2 | 3 | 4) {
  const Tag = `h${level}` as const
  const sizes = {
    1: 'text-2xl sm:text-3xl md:text-4xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4',
    2: 'text-xl sm:text-2xl md:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4',
    3: 'text-lg sm:text-xl md:text-2xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3',
    4: 'text-base sm:text-lg md:text-xl font-semibold mt-3 sm:mt-4 mb-2',
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
          sizes[level],
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
      <div className="text-zinc-300 text-base sm:text-lg leading-relaxed sm:leading-loose mb-5 sm:mb-6" {...props}>
        {children}
      </div>
    )
  }

  return (
    <p className="text-zinc-300 text-base sm:text-lg leading-relaxed sm:leading-loose mb-5 sm:mb-6" {...props}>
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

function UnorderedList({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className="list-disc list-outside space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-zinc-300 ml-5 sm:ml-6 text-base sm:text-lg" {...props}>
      {children}
    </ul>
  )
}

function OrderedList({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className="list-decimal list-outside space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-zinc-300 ml-5 sm:ml-6 text-base sm:text-lg" {...props}>
      {children}
    </ol>
  )
}

function ListItem({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className="text-zinc-300 leading-relaxed sm:leading-loose" {...props}>
      {children}
    </li>
  )
}

function Blockquote({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className="border-l-4 border-brand pl-4 my-6 italic text-zinc-400"
      {...props}
    >
      {children}
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
      <figure className="my-6">
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
    <figure className="my-6">
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
    <div className="overflow-x-auto my-6">
      <table
        className="w-full border-collapse border border-zinc-800 text-zinc-300"
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function TableHead({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className="bg-zinc-900" {...props}>
      {children}
    </thead>
  )
}

function TableBody({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>
}

function TableRow({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className="border-b border-zinc-800" {...props}>
      {children}
    </tr>
  )
}

function TableHeader({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="border border-zinc-800 px-4 py-2 text-left font-semibold text-white"
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className="border border-zinc-800 px-4 py-2" {...props}>
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
