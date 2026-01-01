"use client"

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
import { Loader2 } from "lucide-react"

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  fileName: string
  isDeleting?: boolean
}

export function DeleteDialog({ open, onOpenChange, onConfirm, fileName, isDeleting = false }: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={isDeleting ? undefined : onOpenChange}>
      <AlertDialogContent className="bg-surface border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Upload?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            This will permanently delete <span className="font-medium text-white">{fileName}</span> from storage.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-transparent border-white/10 hover:bg-white/5"
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
