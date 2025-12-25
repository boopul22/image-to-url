"use client"

import { Trash2, X, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BulkActionsBarProps {
    selectedCount: number
    totalCount: number
    onSelectAll: () => void
    onClearSelection: () => void
    onDelete: () => void
}

export function BulkActionsBar({
    selectedCount,
    totalCount,
    onSelectAll,
    onClearSelection,
    onDelete,
}: BulkActionsBarProps) {
    if (selectedCount === 0) return null

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl px-4 py-3 flex items-center gap-4">
                {/* Selection info */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-brand/20 text-brand flex items-center justify-center font-semibold text-xs">
                        {selectedCount}
                    </span>
                    <span className="text-zinc-300">
                        selected
                    </span>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-white/10" />

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {selectedCount < totalCount && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onSelectAll}
                            className="h-8 bg-transparent border-white/10 hover:border-brand/50 hover:bg-brand/5 text-xs"
                        >
                            <CheckSquare size={14} className="mr-1.5" />
                            Select All ({totalCount})
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearSelection}
                        className="h-8 bg-transparent border-white/10 hover:border-white/20 text-xs"
                    >
                        <X size={14} className="mr-1.5" />
                        Clear
                    </Button>

                    <Button
                        size="sm"
                        onClick={onDelete}
                        className="h-8 bg-red-500 hover:bg-red-600 text-white text-xs"
                    >
                        <Trash2 size={14} className="mr-1.5" />
                        Delete Selected
                    </Button>
                </div>
            </div>
        </div>
    )
}
