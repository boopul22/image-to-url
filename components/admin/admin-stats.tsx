"use client"

import { useEffect, useState } from "react"
import { Upload, HardDrive, Users, Clock, FileImage, UserX } from "lucide-react"

interface Stats {
    totalUploads: number
    activeUploads: number
    totalStorage: number
    uniqueUsers: number
    anonymousUploads: number
    recentUploads: number
    uploadsByType: Record<string, number>
}

export function AdminStats() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("/api/admin/stats")
                if (!response.ok) {
                    throw new Error("Failed to fetch stats")
                }
                const data = await response.json()
                setStats(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load stats")
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-surface rounded-xl p-6 border border-white/5 h-24 animate-pulse" />
                ))}
            </div>
        )
    }

    if (error || !stats) {
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                {error || "Failed to load statistics"}
            </div>
        )
    }

    const statCards = [
        {
            label: "Total Uploads",
            value: stats.totalUploads.toLocaleString(),
            icon: Upload,
            color: "brand",
            bgColor: "bg-brand/20",
            borderColor: "border-brand/30",
            iconColor: "text-brand",
        },
        {
            label: "Active Uploads",
            value: stats.activeUploads.toLocaleString(),
            icon: FileImage,
            color: "green",
            bgColor: "bg-green-500/20",
            borderColor: "border-green-500/30",
            iconColor: "text-green-400",
        },
        {
            label: "Storage Used",
            value: formatBytes(stats.totalStorage),
            icon: HardDrive,
            color: "blue",
            bgColor: "bg-blue-500/20",
            borderColor: "border-blue-500/30",
            iconColor: "text-blue-400",
        },
        {
            label: "Registered Users",
            value: stats.uniqueUsers.toLocaleString(),
            icon: Users,
            color: "purple",
            bgColor: "bg-purple-500/20",
            borderColor: "border-purple-500/30",
            iconColor: "text-purple-400",
        },
        {
            label: "Anonymous Uploads",
            value: stats.anonymousUploads.toLocaleString(),
            icon: UserX,
            color: "orange",
            bgColor: "bg-orange-500/20",
            borderColor: "border-orange-500/30",
            iconColor: "text-orange-400",
        },
        {
            label: "Last 24 Hours",
            value: stats.recentUploads.toLocaleString(),
            icon: Clock,
            color: "cyan",
            bgColor: "bg-cyan-500/20",
            borderColor: "border-cyan-500/30",
            iconColor: "text-cyan-400",
        },
    ]

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.label}
                            className="bg-surface rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center`}>
                                    <Icon className={stat.iconColor} size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                                    <p className="text-sm text-zinc-400">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* File Types Breakdown */}
            {Object.keys(stats.uploadsByType).length > 0 && (
                <div className="bg-surface rounded-xl p-6 border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-4">Uploads by File Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(stats.uploadsByType)
                            .sort(([, a], [, b]) => b - a)
                            .map(([type, count]) => (
                                <div
                                    key={type}
                                    className="bg-black/30 rounded-lg p-3 border border-white/5"
                                >
                                    <p className="text-xs text-zinc-500 uppercase">{type.split("/")[1] || type}</p>
                                    <p className="text-lg font-semibold text-white">{count.toLocaleString()}</p>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}
