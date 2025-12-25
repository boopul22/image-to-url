"use client"

import { useState } from "react"
import type { Tables } from "@/types/database.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link2, Copy, Check, Trash2, Clock, Share2 } from "lucide-react"
import { DeleteDialog } from "./delete-dialog"
import { ExpiryEditor } from "./expiry-editor"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface UploadCardProps {
  upload: Tables<"uploads">
}

export function UploadCard({ upload }: UploadCardProps) {
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showExpiryEditor, setShowExpiryEditor] = useState(false)
  const router = useRouter()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(upload.image_url)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: upload.file_name,
          url: upload.image_url,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/uploads/${upload.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getExpiresIn = (expiresAt: string | null, customDeletion: string | null) => {
    const targetDate = new Date(customDeletion || expiresAt || "")
    const now = new Date()
    const diffMs = targetDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Expired"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 7) return `${diffDays} days`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`
    return `${Math.ceil(diffDays / 30)} months`
  }

  return (
    <>
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        fileName={upload.file_name}
      />

      <ExpiryEditor
        open={showExpiryEditor}
        onOpenChange={setShowExpiryEditor}
        uploadId={upload.id}
        currentExpiry={upload.custom_deletion_time || upload.expires_at}
      />

      <div className="bg-surface rounded-xl p-4 border border-white/5 hover:border-brand/30 transition-all group">
        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-zinc-900">
            <Image
              src={upload.image_url}
              alt={upload.file_name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* File Info */}
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-grow min-w-0">
                <p className="text-white text-sm font-medium truncate mb-1">{upload.file_name}</p>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>{formatFileSize(upload.file_size)}</span>
                  <span>•</span>
                  <span>Uploaded {formatDate(upload.uploaded_at)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Expires in {getExpiresIn(upload.expires_at, upload.custom_deletion_time)}
                  </span>
                </div>
              </div>
            </div>

            {/* URL Input with Actions */}
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  readOnly
                  value={upload.image_url}
                  className="bg-black/50 border-white/10 text-zinc-400 font-mono text-xs pr-8 h-9"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <Link2 className="text-zinc-600" size={12} />
                </div>
              </div>

              <Button
                onClick={handleCopy}
                size="sm"
                className={`h-9 px-3 text-xs transition-all ${
                  copiedUrl
                    ? "bg-brand hover:bg-brand-dim text-white"
                    : "bg-white hover:bg-zinc-200 text-dark"
                }`}
              >
                {copiedUrl ? (
                  <>
                    <Check size={14} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-1" />
                    Copy
                  </>
                )}
              </Button>

              {navigator.share && (
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0 bg-transparent border-white/10 hover:border-brand/50 hover:bg-brand/5"
                >
                  <Share2 size={14} />
                </Button>
              )}

              <Button
                onClick={() => setShowExpiryEditor(true)}
                variant="outline"
                size="sm"
                className="h-9 px-3 text-xs bg-transparent border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5"
              >
                <Clock size={14} className="mr-1" />
                Set Expiry
              </Button>

              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="outline"
                size="sm"
                className="h-9 w-9 p-0 bg-transparent border-white/10 hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-400"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
