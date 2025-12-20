import type { Locale } from "@/lib/i18n/config"
import { AdminUploadsTable } from "@/components/admin/admin-uploads-table"

export const dynamic = "force-dynamic"

interface AdminUploadsPageProps {
    params: Promise<{ locale: Locale }>
}

export default async function AdminUploadsPage({ params }: AdminUploadsPageProps) {
    const { locale } = await params

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-white mb-2">Manage Uploads</h1>
                <p className="text-zinc-400">
                    View, search, and manage all uploaded images. Use bulk actions to delete multiple images at once.
                </p>
            </div>

            {/* Uploads Table */}
            <AdminUploadsTable />
        </div>
    )
}
