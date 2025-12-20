"use client"

import { useState } from "react"
import { Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface BulkDeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedCount: number
    onConfirm: () => Promise<void>
}

export function BulkDeleteDialog({
    open,
    onOpenChange,
    selectedCount,
    onConfirm,
}: BulkDeleteDialogProps) {
    const [deleting, setDeleting] = useState(false)

    const handleConfirm = async () => {
        setDeleting(true)
        try {
            await onConfirm()
        } finally {
            setDeleting(false)
            onOpenChange(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-surface border-white/10">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white flex items-center gap-2">
                        <AlertTriangle className="text-red-400" size={20} />
                        Confirm Bulk Delete
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                        You are about to permanently delete{" "}
                        <span className="text-white font-semibold">{selectedCount}</span> image
                        {selectedCount !== 1 ? "s" : ""}. This action cannot be undone.
                        The images will be removed from both storage and database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="bg-transparent border-white/10 text-zinc-300 hover:bg-white/5"
                        disabled={deleting}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault()
                            handleConfirm()
                        }}
                        disabled={deleting}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        {deleting ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} className="mr-2" />
                                Delete {selectedCount} Image{selectedCount !== 1 ? "s" : ""}
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
