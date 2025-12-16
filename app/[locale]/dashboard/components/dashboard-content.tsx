import { createClient } from "@/lib/supabase/server"
import { UploadList } from "./upload-list"
import { Upload, HardDrive } from "lucide-react"

export async function DashboardContent({ locale }: { locale: string }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Fetch user's uploads
  const { data: uploads, error } = await supabase
    .from("uploads")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("uploaded_at", { ascending: false })

  const totalUploads = uploads?.length || 0
  const totalStorage = uploads?.reduce((acc, upload) => acc + (upload.file_size || 0), 0) || 0

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-brand/20 border border-brand/30 flex items-center justify-center">
              <Upload className="text-brand" size={24} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{totalUploads}</p>
              <p className="text-sm text-zinc-400">Total Uploads</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <HardDrive className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{formatBytes(totalStorage)}</p>
              <p className="text-sm text-zinc-400">Storage Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload List */}
      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
          Failed to load uploads. Please try again.
        </div>
      ) : (
        <UploadList uploads={uploads || []} locale={locale} />
      )}
    </>
  )
}
