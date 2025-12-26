"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Trash2,
    ExternalLink,
    Copy,
    Check,
    RefreshCcw,
    Filter,
    User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BulkActionsBar } from "./bulk-actions-bar"
import { BulkDeleteDialog } from "./bulk-delete-dialog"

interface Upload {
    id: string
    file_name: string
    file_size: number
    file_type: string
    image_url: string
    r2_key: string
    status: string | null
    created_at: string | null
    uploaded_at: string | null
    expires_at: string | null
    user_id: string | null
    user_email: string | null
}

interface UserOption {
    id: string
    email: string
}

interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

export function AdminUploadsTable() {
    const [uploads, setUploads] = useState<Upload[]>([])
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Filters
    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [status, setStatus] = useState("all")
    const [userFilter, setUserFilter] = useState("all")
    const [availableUsers, setAvailableUsers] = useState<UserOption[]>([])
    const [sortBy, setSortBy] = useState("created_at")
    const [sortOrder, setSortOrder] = useState("desc")

    // Selection
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    // Clipboard
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const fetchUploads = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
                search,
                status,
                userId: userFilter,
                sortBy,
                sortOrder,
            })

            const response = await fetch(`/api/admin/uploads?${params}`)

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to fetch uploads")
            }

            const data = await response.json()
            setUploads(data.uploads)
            setPagination(data.pagination)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load uploads")
        } finally {
            setLoading(false)
        }
    }, [pagination.page, pagination.limit, search, status, userFilter, sortBy, sortOrder])

    // Fetch available users for filter dropdown
    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch("/api/admin/users")
            if (response.ok) {
                const data = await response.json()
                setAvailableUsers(data.users || [])
            }
        } catch (err) {
            console.error("Failed to fetch users:", err)
        }
    }, [])

    useEffect(() => {
        fetchUploads()
    }, [fetchUploads])

    // Fetch users on mount
    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput)
            setPagination((prev) => ({ ...prev, page: 1 }))
        }, 300)
        return () => clearTimeout(timer)
    }, [searchInput])

    const handleSelectAll = () => {
        const allIds = new Set(uploads.map((u) => u.id))
        setSelectedIds(allIds)
    }

    const handleClearSelection = () => {
        setSelectedIds(new Set())
    }

    const handleToggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    const handleBulkDelete = async () => {
        try {
            const response = await fetch("/api/admin/uploads", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: Array.from(selectedIds) }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to delete uploads")
            }

            const data = await response.json()

            // Remove deleted items from state
            setUploads((prev) => prev.filter((u) => !data.deletedIds.includes(u.id)))
            setSelectedIds(new Set())

            // Refresh if needed
            if (data.deleted > 0) {
                fetchUploads()
            }
        } catch (err) {
            console.error("Bulk delete error:", err)
            setError(err instanceof Error ? err.message : "Failed to delete uploads")
        }
    }

    const handleCopyUrl = async (url: string, id: string) => {
        await navigator.clipboard.writeText(url)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 B"
        const k = 1024
        const sizes = ["B", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i]
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "—"
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 bg-surface rounded-xl p-4 border border-white/5">
                {/* Search */}
                <div className="relative flex-grow max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <Input
                        type="text"
                        placeholder="Search by filename or URL..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-9 bg-black/30 border-white/10 text-sm"
                    />
                </div>

                {/* Status Filter */}
                <Select value={status} onValueChange={(v) => { setStatus(v); setPagination((p) => ({ ...p, page: 1 })) }}>
                    <SelectTrigger className="w-32 bg-black/30 border-white/10 text-sm">
                        <Filter size={14} className="mr-2 text-zinc-500" />
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                </Select>

                {/* User Filter */}
                <Select value={userFilter} onValueChange={(v) => { setUserFilter(v); setPagination((p) => ({ ...p, page: 1 })) }}>
                    <SelectTrigger className="w-48 bg-black/30 border-white/10 text-sm">
                        <User size={14} className="mr-2 text-zinc-500" />
                        <SelectValue placeholder="Filter by User" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="anonymous">Anonymous Only</SelectItem>
                        {availableUsers.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.email}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
                    <SelectTrigger className="w-36 bg-black/30 border-white/10 text-sm">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="created_at">Date Created</SelectItem>
                        <SelectItem value="file_name">File Name</SelectItem>
                        <SelectItem value="file_size">File Size</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
                    className="bg-transparent border-white/10 hover:bg-white/5 text-xs"
                >
                    {sortOrder === "desc" ? "↓ Newest" : "↑ Oldest"}
                </Button>

                {/* Refresh */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchUploads}
                    disabled={loading}
                    className="bg-transparent border-white/10 hover:bg-white/5 ml-auto"
                >
                    <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
                </Button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="bg-surface rounded-xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-left">
                                <th className="p-4 w-10">
                                    <Checkbox
                                        checked={selectedIds.size > 0 && selectedIds.size === uploads.length}
                                        onCheckedChange={(checked) => {
                                            if (checked) handleSelectAll()
                                            else handleClearSelection()
                                        }}
                                    />
                                </th>
                                <th className="p-4 w-20">Preview</th>
                                <th className="p-4">File Name</th>
                                <th className="p-4 w-24">Size</th>
                                <th className="p-4 w-24">Type</th>
                                <th className="p-4 w-24">Status</th>
                                <th className="p-4 w-48">User</th>
                                <th className="p-4 w-40">Uploaded</th>
                                <th className="p-4 w-32">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && uploads.length === 0 ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td colSpan={9} className="p-4">
                                            <div className="h-12 bg-white/5 rounded animate-pulse" />
                                        </td>
                                    </tr>
                                ))
                            ) : uploads.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="p-8 text-center text-zinc-500">
                                        No uploads found
                                    </td>
                                </tr>
                            ) : (
                                uploads.map((upload) => (
                                    <tr
                                        key={upload.id}
                                        className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${selectedIds.has(upload.id) ? "bg-brand/5" : ""
                                            }`}
                                    >
                                        <td className="p-4">
                                            <Checkbox
                                                checked={selectedIds.has(upload.id)}
                                                onCheckedChange={() => handleToggleSelect(upload.id)}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-white/10">
                                                <Image
                                                    src={upload.image_url}
                                                    alt={upload.file_name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-white font-medium truncate max-w-xs" title={upload.file_name}>
                                                {upload.file_name}
                                            </p>
                                            <p className="text-xs text-zinc-500 truncate max-w-xs" title={upload.image_url}>
                                                {upload.image_url}
                                            </p>
                                        </td>
                                        <td className="p-4 text-zinc-400">{formatBytes(upload.file_size)}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs bg-white/5 rounded text-zinc-400">
                                                {upload.file_type.split("/")[1] || upload.file_type}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${upload.status === "active"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >
                                                {upload.status || "unknown"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {upload.user_email ? (
                                                <span className="text-zinc-300 text-sm truncate max-w-[180px] block" title={upload.user_email}>
                                                    {upload.user_email}
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs bg-zinc-700/50 rounded text-zinc-400 italic">
                                                    Anonymous
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-zinc-400 text-xs">
                                            {formatDate(upload.uploaded_at || upload.created_at)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleCopyUrl(upload.image_url, upload.id)}
                                                    className="h-8 w-8 p-0 hover:bg-white/5"
                                                    title="Copy URL"
                                                >
                                                    {copiedId === upload.id ? (
                                                        <Check size={14} className="text-green-400" />
                                                    ) : (
                                                        <Copy size={14} />
                                                    )}
                                                </Button>
                                                <a
                                                    href={upload.image_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-8 w-8 p-0 flex items-center justify-center hover:bg-white/5 rounded-md transition-colors"
                                                    title="Open in new tab"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedIds(new Set([upload.id]))
                                                        setShowDeleteDialog(true)
                                                    }}
                                                    className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t border-white/5">
                        <p className="text-sm text-zinc-500">
                            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                            {pagination.total} uploads
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                                disabled={pagination.page <= 1 || loading}
                                className="bg-transparent border-white/10 hover:bg-white/5"
                            >
                                <ChevronLeft size={14} className="mr-1" />
                                Previous
                            </Button>
                            <span className="text-sm text-zinc-400 px-2">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                                disabled={pagination.page >= pagination.totalPages || loading}
                                className="bg-transparent border-white/10 hover:bg-white/5"
                            >
                                Next
                                <ChevronRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bulk Actions Bar */}
            <BulkActionsBar
                selectedCount={selectedIds.size}
                totalCount={uploads.length}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                onDelete={() => setShowDeleteDialog(true)}
            />

            {/* Bulk Delete Dialog */}
            <BulkDeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                selectedCount={selectedIds.size}
                onConfirm={handleBulkDelete}
            />
        </div>
    )
}
