"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Upload, Link2, Check, AlertCircle, Shield, Zap, FileImage, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { UploadLimitBanner } from "@/components/upload-limit-banner"
import { LoginDialog } from "@/components/auth/login-dialog"

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
  const [uploadLimit, setUploadLimit] = useState<UploadLimitStatus | null>(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check upload limit on component mount
  useEffect(() => {
    checkUploadLimit()
  }, [])

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
    await navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(""), 2000)
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

      <div className="w-full max-w-4xl animate-slide-up" style={{ animationDelay: "100ms" }}>
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
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center flex-col">
                        <div className="relative w-16 h-16 mb-3">
                          <div className="absolute inset-0 border-4 border-zinc-800 rounded-full" />
                          <div
                            className="absolute inset-0 border-4 border-brand rounded-full border-t-transparent animate-spin"
                            style={{ animationDuration: "0.8s" }}
                          />
                        </div>
                        <span className="text-sm font-bold text-white mb-1">{Math.round(progress)}%</span>
                        <span className="text-xs text-zinc-400">Uploading to R2...</span>
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
                            >
                              {copiedUrl === uploadedFile.url ? (
                                <>
                                  <Check size={14} className="mr-1" />
                                  {dict.upload.copied}
                                </>
                              ) : (
                                dict.upload.copy
                              )}
                            </Button>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 bg-transparent border-white/10 hover:border-brand/50 hover:bg-brand/5"
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
