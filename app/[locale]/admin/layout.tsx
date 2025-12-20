import { redirect } from "next/navigation"
import { checkAdminAccess } from "@/lib/auth/admin-middleware"
import type { Locale } from "@/lib/i18n/config"

interface AdminLayoutProps {
    children: React.ReactNode
    params: Promise<{ locale: Locale }>
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
    const { locale } = await params

    // Check admin access
    const { isAdmin, user } = await checkAdminAccess()

    if (!user) {
        redirect(`/${locale}/auth/login`)
    }

    if (!isAdmin) {
        redirect(`/${locale}`)
    }

    return (
        <div className="min-h-screen bg-dark text-zinc-300">
            {/* Background Effects */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none opacity-40 z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none opacity-20 z-0" />

            {/* Admin Header Bar */}
            <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <a href={`/${locale}`} className="text-xl font-bold text-white">
                                Image<span className="text-brand">ToURL</span>
                            </a>
                            <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                                Admin Panel
                            </span>
                        </div>

                        <nav className="flex items-center gap-6">
                            <a
                                href={`/${locale}/admin`}
                                className="text-sm text-zinc-400 hover:text-white transition-colors"
                            >
                                Dashboard
                            </a>
                            <a
                                href={`/${locale}/admin/uploads`}
                                className="text-sm text-zinc-400 hover:text-white transition-colors"
                            >
                                All Uploads
                            </a>
                            <a
                                href={`/${locale}/dashboard`}
                                className="text-sm text-zinc-400 hover:text-white transition-colors"
                            >
                                User Dashboard
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10">
                {children}
            </main>
        </div>
    )
}
