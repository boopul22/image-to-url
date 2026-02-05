"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Loader2, AlertCircle, Shield } from "lucide-react"

interface BannedDomain {
    id: string
    domain: string
    reason: string | null
    created_at: string
    created_by: string | null
}

export function BannedDomainsManager() {
    const [domains, setDomains] = useState<BannedDomain[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [newDomain, setNewDomain] = useState("")
    const [newReason, setNewReason] = useState("")
    const [adding, setAdding] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchDomains = async () => {
        try {
            setError("")
            const res = await fetch("/api/admin/banned-domains")
            if (!res.ok) throw new Error("Failed to fetch banned domains")
            const data = await res.json()
            setDomains(data.domains || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load domains")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDomains()
    }, [])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newDomain.trim()) return

        setAdding(true)
        setError("")

        try {
            const res = await fetch("/api/admin/banned-domains", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    domain: newDomain.trim(),
                    reason: newReason.trim() || undefined,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to add domain")
            }

            setDomains((prev) => [data.domain, ...prev])
            setNewDomain("")
            setNewReason("")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to add domain")
        } finally {
            setAdding(false)
        }
    }

    const handleDelete = async (id: string, domain: string) => {
        if (!confirm(`Remove "${domain}" from banned domains? Users with this domain will be able to register again.`)) {
            return
        }

        setDeletingId(id)
        setError("")

        try {
            const res = await fetch("/api/admin/banned-domains", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Failed to delete domain")
            }

            setDomains((prev) => prev.filter((d) => d.id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete domain")
        } finally {
            setDeletingId(null)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-zinc-500" size={24} />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            {/* Add Domain Form */}
            <form onSubmit={handleAdd} className="bg-surface rounded-xl p-5 border border-white/5">
                <h3 className="text-sm font-medium text-white mb-3">Add Banned Domain</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="e.g. tempmail.com"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand/50"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Reason (optional)"
                        value={newReason}
                        onChange={(e) => setNewReason(e.target.value)}
                        className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand/50"
                    />
                    <button
                        type="submit"
                        disabled={adding || !newDomain.trim()}
                        className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                    >
                        {adding ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Plus size={14} />
                        )}
                        Ban Domain
                    </button>
                </div>
            </form>

            {/* Domains List */}
            <div className="bg-surface rounded-xl border border-white/5 overflow-hidden">
                <div className="px-5 py-3 border-b border-white/5">
                    <h3 className="text-sm font-medium text-white">
                        Banned Domains ({domains.length})
                    </h3>
                </div>

                {domains.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                        <Shield className="mx-auto mb-3 text-zinc-600" size={32} />
                        <p className="text-sm text-zinc-500">No banned domains yet.</p>
                        <p className="text-xs text-zinc-600 mt-1">
                            Add a domain above to block registrations from that email provider.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {domains.map((d) => (
                            <div
                                key={d.id}
                                className="px-5 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="min-w-0">
                                    <p className="text-sm font-mono text-white">{d.domain}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        {d.reason && (
                                            <span className="text-xs text-zinc-500">{d.reason}</span>
                                        )}
                                        <span className="text-xs text-zinc-600">
                                            Added {new Date(d.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(d.id, d.domain)}
                                    disabled={deletingId === d.id}
                                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                    title="Remove banned domain"
                                >
                                    {deletingId === d.id ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Trash2 size={16} />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
