"use client"

import type { Tables } from "@/types/database.types"
import { UploadCard } from "./upload-card"

interface UploadListProps {
  uploads: Tables<"uploads">[]
  locale: string
}

export function UploadList({ uploads, locale }: UploadListProps) {
  if (uploads.length === 0) {
    return (
      <div className="bg-surface rounded-xl p-12 border border-white/5 text-center">
        <p className="text-zinc-400 mb-4">No uploads yet</p>
        <p className="text-sm text-zinc-500">
          Upload your first image from the{" "}
          <a href={`/${locale}`} className="text-brand hover:underline">
            home page
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {uploads.map((upload) => (
        <UploadCard key={upload.id} upload={upload} />
      ))}
    </div>
  )
}
