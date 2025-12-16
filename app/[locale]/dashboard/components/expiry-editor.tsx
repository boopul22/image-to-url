"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"

interface ExpiryEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  uploadId: string
  currentExpiry: string | null
}

export function ExpiryEditor({ open, onOpenChange, uploadId, currentExpiry }: ExpiryEditorProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const presets = [
    { label: "1 Hour", hours: 1 },
    { label: "1 Day", hours: 24 },
    { label: "7 Days", hours: 24 * 7 },
    { label: "30 Days", hours: 24 * 30 },
  ]

  const handleSetExpiry = async (hours: number) => {
    setLoading(true)
    try {
      const customDeletionTime = new Date()
      customDeletionTime.setHours(customDeletionTime.getHours() + hours)

      const response = await fetch(`/api/uploads/${uploadId}/expiry`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          custom_deletion_time: customDeletionTime.toISOString(),
        }),
      })

      if (response.ok) {
        router.refresh()
        onOpenChange(false)
      }
    } catch (err) {
      console.error("Failed to update expiry:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-surface border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Set Custom Expiry Time</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Choose when this image should be automatically deleted
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <Label className="text-zinc-300">Quick Presets</Label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                className="bg-transparent border-white/10 hover:bg-brand/10 hover:border-brand/30"
                onClick={() => handleSetExpiry(preset.hours)}
                disabled={loading}
              >
                <Clock size={14} className="mr-2" />
                {preset.label}
              </Button>
            ))}
          </div>

          {currentExpiry && (
            <p className="text-xs text-zinc-500 mt-4">
              Current expiry:{" "}
              {new Date(currentExpiry).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-white/10"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
