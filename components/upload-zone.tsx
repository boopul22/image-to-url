"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react"
import { Upload, Link2, Check, AlertCircle, Shield, Zap, FileImage, X, Download, Code, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { UploadLimitBanner } from "@/components/upload-limit-banner"
import { LoginDialog } from "@/components/auth/login-dialog"
import { BookmarkBanner } from "@/components/bookmark-banner"
import { LoginFeatureTooltip } from "@/components/login-feature-tooltip"
import { PushNotificationPrompt } from "@/components/push-notification-prompt"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { useServiceWorker } from "@/hooks/use-service-worker"

interface UploadedFile {
  url: string
  fileName: string
  fileSize: number
  uploadedAt: string
  preview?: string
}

interface UploadLimitStatus {
  allowed: boolean
  count: number
  remaining: number
  authenticated: boolean
}

export function UploadZone({ dict }: { dict: Dictionary }) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState("")
  const [copiedUrl, setCopiedUrl] = useState("")
  const [copiedEmbed, setCopiedEmbed] = useState("")
  const [uploadLimit, setUploadLimit] = useState<UploadLimitStatus | null>(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showBookmarkBanner, setShowBookmarkBanner] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [qrLoading, setQrLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadZoneRef = useRef<HTMLDivElement>(null)

  // Register service worker for PWA
  useServiceWorker()

  // Auto-scroll to the upload zone on page load
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (uploadZoneRef.current) {
        uploadZoneRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }, 100) // Small delay to ensure page is rendered
    return () => clearTimeout(timer)
  }, [])

  // Login benefits for rotating tooltip
  const loginBenefits = [
    { icon: "📊", text: "Track all your uploads" },
    { icon: "♾️", text: "Unlimited uploads" },
    { icon: "🔒", text: "Secure storage" },
    { icon: "📱", text: "Access from anywhere" },
  ]

  // Check upload limit on component mount
  useEffect(() => {
    checkUploadLimit()
  }, [])

  // Rotate login benefits while uploading
  useEffect(() => {
    if (isUploading && uploadLimit && !uploadLimit.authenticated) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % loginBenefits.length)
      }, 2000) // Change tip every 2 seconds
      return () => clearInterval(interval)
    }
  }, [isUploading, uploadLimit])

  const checkUploadLimit = async () => {
    try {
      const response = await fetch("/api/check-limit")
      if (response.ok) {
        const data = await response.json()
        setUploadLimit(data)
      }
    } catch (err) {
      console.error("Failed to check upload limit:", err)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return dict.upload.errorInvalidType
    }
    if (file.size > 10 * 1024 * 1024) {
      return dict.upload.errorTooLarge
    }
    return null
  }

  const processFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }

      // Check upload limit for anonymous users
      if (uploadLimit && !uploadLimit.authenticated && !uploadLimit.allowed) {
        setError("Upload limit reached. Please sign in to continue uploading.")
        setShowLoginDialog(true)
        return
      }

      setError("")
      setFile(file)

      // Create preview
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreview(reader.result as string)
        uploadToR2(file, reader.result as string)
      }
    },
    [uploadLimit]
  )

  const uploadToR2 = useCallback(
    async (file: File, previewUrl: string) => {
      setIsUploading(true)
      setProgress(0)

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + Math.random() * 20
          })
        }, 150)

        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        clearInterval(progressInterval)
        setProgress(100)

        if (!response.ok) {
          const errorData = await response.json()
          if (errorData.limitReached) {
            setShowLoginDialog(true)
          }
          throw new Error(errorData.error || "Upload failed")
        }

        const data = await response.json()

        // Refresh upload limit after successful upload
        await checkUploadLimit()

        // Add to uploaded files list
        const uploadedFile: UploadedFile = {
          url: data.url,
          fileName: data.fileName,
          fileSize: data.fileSize,
          uploadedAt: data.uploadedAt,
          preview: previewUrl,
        }

        setUploadedFiles((prev) => [uploadedFile, ...prev])

        // Show bookmark banner after successful upload
        setTimeout(() => {
          setShowBookmarkBanner(true)
        }, 1200)

        // Reset upload state after brief delay
        setTimeout(() => {
          setFile(null)
          setPreview("")
          setIsUploading(false)
          setProgress(0)
        }, 1000)
      } catch (err) {
        console.error("[v0] Upload error:", err)
        setError(err instanceof Error ? err.message : dict.upload.errorGeneral)
        setIsUploading(false)
        setProgress(0)
      }
    },
    [dict.upload.errorGeneral],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        // Process all dropped files
        Array.from(files).forEach((file) => {
          processFile(file)
        })
      }
    },
    [processFile],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        // Process all selected files
        Array.from(files).forEach((file) => {
          processFile(file)
        })
      }
      // Reset input value to allow selecting the same files again
      e.target.value = ""
    },
    [processFile],
  )

  const handleCopy = useCallback(async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = url
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopiedUrl(url)
      setCopiedEmbed("") // Clear embed copied state
      setTimeout(() => setCopiedUrl(""), 2000)
      // Show bookmark banner after copying link
      setShowBookmarkBanner(true)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleCopyEmbed = useCallback(async (url: string, fileName: string) => {
    try {
      const embedCode = `<a href="https://www.imagetourl.cloud" target="_blank" rel="noopener"><img src="${url}" alt="${fileName} - Hosted on ImageToURL" /></a>`
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(embedCode)
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = embedCode
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopiedEmbed(url)
      setCopiedUrl("") // Clear URL copied state
      setTimeout(() => setCopiedEmbed(""), 2000)
    } catch (err) {
      console.error("Failed to copy embed code:", err)
    }
  }, [])

  const handleRemove = useCallback((url: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.url !== url))
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  return (
    <>
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      <BookmarkBanner show={showBookmarkBanner} onDismiss={() => setShowBookmarkBanner(false)} />

      {/* QR Code Dialog */}
      <Dialog open={!!qrCodeUrl} onOpenChange={(open) => { if (!open) setQrCodeUrl(null); setQrLoading(true) }}>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white text-center">Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            {qrCodeUrl && (
              <>
                <div className="p-4 bg-white rounded-xl mb-4 relative">
                  {qrLoading && (
                    <div className="w-48 h-48 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-[3px] border-zinc-300 border-t-brand rounded-full animate-spin" />
                        <span className="text-zinc-500 text-sm">Generating QR...</span>
                      </div>
                    </div>
                  )}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}`}
                    alt="QR Code"
                    className={`w-48 h-48 ${qrLoading ? 'hidden' : 'block'}`}
                    width={200}
                    height={200}
                    onLoad={() => setQrLoading(false)}
                  />
                </div>
                <p className="text-zinc-400 text-sm text-center mb-4">
                  Scan to open image on any device
                </p>
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(qrCodeUrl)
                      setCopiedUrl(qrCodeUrl)
                      setTimeout(() => setCopiedUrl(""), 2000)
                    }}
                    variant="outline"
                    className="flex-1 border-zinc-700 text-zinc-300"
                  >
                    {copiedUrl === qrCodeUrl ? (
                      <>
                        <Check size={16} className="mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Link2 size={16} className="mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrCodeUrl)}`)
                        const blob = await response.blob()
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement("a")
                        link.href = url
                        link.download = "qr-code.png"
                        link.click()
                        URL.revokeObjectURL(url)
                      } catch (err) {
                        console.error("Failed to download QR:", err)
                      }
                    }}
                    className="flex-1 bg-brand hover:bg-brand/90"
                  >
                    <Download size={16} className="mr-2" />
                    Download QR
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Push Notification Prompt - contextual after uploads */}
      <PushNotificationPrompt uploadCount={uploadedFiles.length} />

      {/* PWA Install Prompt - for mobile users */}
      <PWAInstallPrompt />

      <div ref={uploadZoneRef} className="w-full max-w-4xl animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="bg-surface rounded-2xl p-2 shadow-2xl shadow-black/50 border border-white/5 relative overflow-hidden">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

          <div className="bg-[#1a1a1a] rounded-xl p-6 md:p-8">
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
              className={`relative h-64 rounded-xl flex flex-col items-center justify-center cursor-pointer group transition-all ${isDragging
                ? "bg-brand/5 border-2 border-brand border-dashed"
                : "border-2 border-zinc-700 border-dashed hover:border-brand/50 hover:bg-brand/5"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml"
                className="hidden"
                multiple
              />

              {!file ? (
                <div className="flex flex-col items-center transition-all duration-300 transform group-hover:scale-105">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-dim/20 border border-brand/30 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-[0_0_25px_rgba(255,109,31,0.3)] transition-all">
                    <Upload className="text-brand" size={28} strokeWidth={2} />
                  </div>
                  <p className="text-white font-semibold text-base mb-2">{dict.upload.clickToUpload}</p>
                  <p className="text-zinc-500 text-sm">{dict.upload.fileTypes}</p>
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center p-6 rounded-xl">
                  <div className="relative w-full max-w-[220px] aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-4">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />

                    {isUploading && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center flex-col px-8">
                        {/* Progress Bar */}
                        <div className="w-full max-w-[180px] mb-4">
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-brand to-brand-dim transition-all duration-300 ease-out"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <span className="text-sm font-bold text-white mb-1">{Math.round(progress)}%</span>
                        <span className="text-xs text-zinc-400 mb-4">Uploading to R2...</span>

                        {/* Rotating login benefits for anonymous users */}
                        {uploadLimit && !uploadLimit.authenticated && (
                          <div className="mt-2 px-4 py-2 bg-zinc-900/80 rounded-lg border border-zinc-700/50 animate-fade-in">
                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                              <span className="text-sm">{loginBenefits[currentTipIndex].icon}</span>
                              <span>Sign in to: {loginBenefits[currentTipIndex].text}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {progress === 100 && (
                      <div className="absolute inset-0 bg-brand/95 backdrop-blur-sm flex items-center justify-center flex-col animate-fade-in">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                          <Check className="text-white" size={28} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-semibold text-white">Upload Complete!</span>
                      </div>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm">{file.name}</p>
                </div>
              )}
            </div>

            {/* Status indicators */}
            <div className="mt-6 flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-brand" />
                <span>{dict.upload.secure}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-brand" />
                <span>{dict.upload.cdn}</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-fade-in">
                <AlertCircle size={18} />
                <span>{error}</span>
                <Button variant="ghost" size="sm" onClick={() => setError("")} className="ml-auto">
                  <X size={16} />
                </Button>
              </div>
            )}

            {/* Upload Limit Banner */}
            {uploadLimit && !uploadLimit.authenticated && uploadLimit.remaining <= 2 && (
              <UploadLimitBanner
                remaining={uploadLimit.remaining}
                onLoginClick={() => setShowLoginDialog(true)}
              />
            )}
          </div>

          {/* Uploaded Files Section */}
          {uploadedFiles.length > 0 && (
            <div className="bg-[#1f1f1f] border-t border-white/5">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <FileImage size={20} className="text-brand" />
                    Uploaded Files ({uploadedFiles.length})
                    {uploadLimit && !uploadLimit.authenticated && (
                      <LoginFeatureTooltip variant="icon" />
                    )}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedFiles([])}
                    className="text-zinc-500 hover:text-white text-xs"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div
                      key={uploadedFile.url}
                      className="bg-black/30 rounded-xl p-4 border border-white/5 hover:border-brand/30 transition-all group animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-zinc-900">
                          <img
                            src={uploadedFile.preview || uploadedFile.url}
                            alt={uploadedFile.fileName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* File Info */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-grow min-w-0">
                              <p className="text-white text-sm font-medium truncate">{uploadedFile.fileName}</p>
                              <p className="text-zinc-500 text-xs mt-0.5">
                                {formatFileSize(uploadedFile.fileSize)} • {formatDate(uploadedFile.uploadedAt)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemove(uploadedFile.url)}
                              className="text-zinc-500 hover:text-red-400 h-8 w-8 p-0 flex-shrink-0"
                            >
                              <X size={16} />
                            </Button>
                          </div>

                          {/* URL Input with Actions */}
                          <div className="flex items-center gap-2">
                            <div className="relative flex-grow">
                              <Input
                                type="text"
                                readOnly
                                value={uploadedFile.url}
                                className="bg-black/50 border-white/10 text-zinc-400 font-mono text-xs pr-8 h-9"
                              />
                              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                                <Link2 className="text-zinc-600" size={12} />
                              </div>
                            </div>
                            <Button
                              onClick={() => handleCopy(uploadedFile.url)}
                              size="sm"
                              className={`h-9 px-3 text-xs transition-all ${copiedUrl === uploadedFile.url
                                ? "bg-brand hover:bg-brand-dim text-white"
                                : "bg-white hover:bg-zinc-200 text-dark"
                                }`}
                              title="Copy direct image URL"
                            >
                              {copiedUrl === uploadedFile.url ? (
                                <>
                                  <Check size={14} className="mr-1" />
                                  {dict.upload.copied}
                                </>
                              ) : (
                                <>
                                  <Link2 size={14} className="mr-1" />
                                  {dict.upload.copy}
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() => handleCopyEmbed(uploadedFile.url, uploadedFile.fileName)}
                              size="sm"
                              variant="outline"
                              className={`h-9 px-3 text-xs transition-all ${copiedEmbed === uploadedFile.url
                                ? "bg-brand hover:bg-brand-dim text-white border-brand"
                                : "bg-transparent border-white/10 hover:border-brand/50 hover:bg-brand/5 text-zinc-300"
                                }`}
                              title="Copy HTML embed code with attribution"
                            >
                              {copiedEmbed === uploadedFile.url ? (
                                <>
                                  <Check size={14} className="mr-1" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Code size={14} className="mr-1" />
                                  Embed
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() => { setQrLoading(true); setQrCodeUrl(uploadedFile.url) }}
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 bg-transparent border-white/10 hover:border-brand/50 hover:bg-brand/5"
                              title="Show QR Code"
                            >
                              <QrCode size={14} />
                            </Button>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 bg-transparent border-white/10 hover:border-brand/50 hover:bg-brand/5"
                              title="Download image"
                            >
                              <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer" download>
                                <Download size={14} />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
