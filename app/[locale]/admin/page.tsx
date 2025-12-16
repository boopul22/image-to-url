import type { Locale } from "@/lib/i18n/config"
import { AdminStats } from "@/components/admin/admin-stats"
import { ArrowRight } from "lucide-react"

export const dynamic = "force-dynamic"

interface AdminPageProps {
    params: Promise<{ locale: Locale }>
}

export default async function AdminPage({ params }: AdminPageProps) {
    const { locale } = await params

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white mb-2">Admin Dashboard</h1>
                <p className="text-zinc-400">
                    Monitor and manage all uploaded images across the platform.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <a
                    href={`/${locale}/admin/uploads`}
                    className="bg-surface rounded-xl p-5 border border-white/5 hover:border-brand/30 transition-all group flex items-center justify-between"
                >
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Manage Uploads</h3>
                        <p className="text-sm text-zinc-400">View, search, and delete images</p>
                    </div>
                    <ArrowRight className="text-zinc-600 group-hover:text-brand transition-colors" size={20} />
                </a>

                <a
                    href={`/${locale}/dashboard`}
                    className="bg-surface rounded-xl p-5 border border-white/5 hover:border-blue-500/30 transition-all group flex items-center justify-between"
                >
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">User Dashboard</h3>
                        <p className="text-sm text-zinc-400">View your own uploads</p>
                    </div>
                    <ArrowRight className="text-zinc-600 group-hover:text-blue-400 transition-colors" size={20} />
                </a>
            </div>

            {/* Statistics */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Platform Statistics</h2>
                <AdminStats />
            </div>
        </div>
    )
}
