'use client'

import { useState } from 'react'
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : url

  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = fullUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const buttonClass =
    'p-3 sm:p-2.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors active:scale-95'

  return (
    <div className="mt-6 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-800">
      <h4 className="text-sm font-semibold text-white mb-3">Share this post</h4>
      <div className="flex gap-2 sm:gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on Twitter"
        >
          <Twitter className="size-4" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on Facebook"
        >
          <Facebook className="size-4" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="size-4" />
        </a>
        <button
          onClick={copyToClipboard}
          className={cn(
            buttonClass,
            copied && 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
          )}
          aria-label={copied ? 'Copied!' : 'Copy link'}
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <LinkIcon className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}
