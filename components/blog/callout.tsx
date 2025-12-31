'use client'

import { cn } from '@/lib/utils'
import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'error'
  title?: string
  children: React.ReactNode
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  error: AlertCircle,
}

const styles = {
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  tip: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  error: 'bg-red-500/10 border-red-500/30 text-red-400',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4 flex gap-3',
        styles[type]
      )}
    >
      <Icon className="size-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && (
          <p className="font-semibold mb-1">{title}</p>
        )}
        <div className="text-zinc-300 text-sm [&>p]:mb-0">{children}</div>
      </div>
    </div>
  )
}
