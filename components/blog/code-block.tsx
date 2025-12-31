'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  children,
  language,
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
          <span className="text-xs text-zinc-400 font-mono">
            {filename || language}
          </span>
          <button
            onClick={copyToClipboard}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              copied
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'hover:bg-zinc-700 text-zinc-400'
            )}
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        </div>
      )}
      <pre
        className={cn(
          'p-4 overflow-x-auto text-sm font-mono',
          showLineNumbers && '[counter-reset:line]',
          showLineNumbers &&
            '[&>code>span.line]:before:content-[counter(line)] [&>code>span.line]:before:counter-increment-line [&>code>span.line]:before:text-zinc-600 [&>code>span.line]:before:mr-4 [&>code>span.line]:before:inline-block [&>code>span.line]:before:w-4 [&>code>span.line]:before:text-right'
        )}
      >
        <code className="text-zinc-300">{children}</code>
      </pre>
      {!filename && !language && (
        <button
          onClick={copyToClipboard}
          className={cn(
            'absolute top-3 right-3 p-1.5 rounded-md transition-colors',
            copied
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'hover:bg-zinc-700 text-zinc-400'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      )}
    </div>
  )
}
