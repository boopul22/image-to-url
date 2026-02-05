import { BannedDomainsManager } from "@/components/admin/banned-domains-manager"

export const dynamic = "force-dynamic"

export default function AdminSettingsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white mb-2">Settings</h1>
                <p className="text-zinc-400">
                    Manage platform settings and access controls.
                </p>
            </div>

            {/* Banned Email Domains Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Banned Email Domains</h2>
                <p className="text-sm text-zinc-400 mb-4">
                    Block user registrations from specific email domains. Users attempting to sign up with a banned domain will see an error message.
                </p>
                <BannedDomainsManager />
            </div>
        </div>
    )
}
