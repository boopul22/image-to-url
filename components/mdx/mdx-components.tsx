import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Custom heading components with anchor links
const createHeading = (level: number) => {
    const Heading = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        const id = typeof children === 'string'
            ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            : undefined;

        const styles: Record<number, string> = {
            1: 'text-4xl font-bold mt-8 mb-4 text-white',
            2: 'text-3xl font-semibold mt-8 mb-4 text-white border-b border-zinc-800 pb-2',
            3: 'text-2xl font-semibold mt-6 mb-3 text-white',
            4: 'text-xl font-medium mt-4 mb-2 text-white',
            5: 'text-lg font-medium mt-4 mb-2 text-white',
            6: 'text-base font-medium mt-4 mb-2 text-zinc-400',
        };

        return React.createElement(
            Tag,
            { id, className: styles[level], ...props },
            children
        );
    };
    Heading.displayName = `Heading${level}`;
    return Heading;
};

// Callout component for tips, warnings, etc.
interface CalloutProps {
    type?: 'info' | 'tip' | 'warning' | 'danger';
    title?: string;
    children: React.ReactNode;
}

function Callout({ type = 'info', title, children }: CalloutProps) {
    const styles: Record<string, string> = {
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-100',
        tip: 'bg-green-500/10 border-green-500/30 text-green-100',
        warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-100',
        danger: 'bg-red-500/10 border-red-500/30 text-red-100',
    };

    const icons: Record<string, string> = {
        info: '💡',
        tip: '✅',
        warning: '⚠️',
        danger: '🚨',
    };

    return (
        <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]}`}>
            {title && (
                <p className="font-semibold mb-2">
                    {icons[type]} {title}
                </p>
            )}
            <div className="prose-sm">{children}</div>
        </div>
    );
}

// MDX Components Map
export const mdxComponents: Record<string, React.ComponentType<React.HTMLAttributes<HTMLElement>>> = {
    // Headings
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),

    // Paragraphs and text
    p: ({ children, ...props }) => (
        <p className="mb-4 leading-relaxed text-zinc-300" {...props}>
            {children}
        </p>
    ),

    strong: ({ children, ...props }) => (
        <strong className="font-semibold text-white" {...props}>
            {children}
        </strong>
    ),

    em: ({ children, ...props }) => (
        <em className="italic text-zinc-300" {...props}>
            {children}
        </em>
    ),

    // Links
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const isExternal = href?.startsWith('http');

        if (isExternal) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline underline-offset-4 hover:text-brand/80 transition-colors"
                    {...props}
                >
                    {children}
                </a>
            );
        }

        return (
            <Link
                href={href || '#'}
                className="text-brand underline underline-offset-4 hover:text-brand/80 transition-colors"
                {...props}
            >
                {children}
            </Link>
        );
    },

    // Lists
    ul: ({ children, ...props }) => (
        <ul className="my-4 ml-6 list-disc space-y-2 text-zinc-300" {...props}>
            {children}
        </ul>
    ),

    ol: ({ children, ...props }) => (
        <ol className="my-4 ml-6 list-decimal space-y-2 text-zinc-300" {...props}>
            {children}
        </ol>
    ),

    li: ({ children, ...props }) => (
        <li className="leading-relaxed" {...props}>
            {children}
        </li>
    ),

    // Code
    code: ({ children, ...props }) => (
        <code
            className="relative rounded bg-zinc-800 px-[0.4rem] py-[0.2rem] font-mono text-sm text-zinc-300"
            {...props}
        >
            {children}
        </code>
    ),

    pre: ({ children, ...props }) => (
        <pre
            className="my-6 overflow-x-auto rounded-lg bg-zinc-900 border border-zinc-800 p-4 text-sm text-zinc-300"
            {...props}
        >
            {children}
        </pre>
    ),

    // Blockquote
    blockquote: ({ children, ...props }) => (
        <blockquote
            className="my-6 border-l-4 border-brand/40 pl-4 italic text-zinc-400"
            {...props}
        >
            {children}
        </blockquote>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-zinc-800" />,

    // Images
    img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
        if (!src || typeof src !== 'string') return null;

        return (
            <figure className="my-6">
                <Image
                    src={src}
                    alt={alt || ''}
                    width={800}
                    height={450}
                    className="rounded-lg w-full h-auto"
                    loading="lazy"
                />
                {alt && (
                    <figcaption className="mt-2 text-center text-sm text-zinc-500">
                        {alt}
                    </figcaption>
                )}
            </figure>
        );
    },

    // Tables
    table: ({ children, ...props }) => (
        <div className="my-6 w-full overflow-x-auto">
            <table className="w-full border-collapse text-sm" {...props}>
                {children}
            </table>
        </div>
    ),

    th: ({ children, ...props }) => (
        <th
            className="border border-zinc-700 bg-zinc-800 px-4 py-2 text-left font-semibold text-white"
            {...props}
        >
            {children}
        </th>
    ),

    td: ({ children, ...props }) => (
        <td className="border border-zinc-700 px-4 py-2 text-zinc-300" {...props}>
            {children}
        </td>
    ),

    // Custom components
    Callout: Callout as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
};
