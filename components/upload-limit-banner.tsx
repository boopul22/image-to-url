"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Sparkles } from "lucide-react"
import { LoginFeatureTooltip } from "@/components/login-feature-tooltip"

interface UploadLimitBannerProps {
  remaining: number
  onLoginClick: () => void
}

export function UploadLimitBanner({ remaining, onLoginClick }: UploadLimitBannerProps) {
  if (remaining === 0) {
    return (
      <Alert className="bg-brand/10 border-brand/30 text-brand mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <strong>Upload limit reached!</strong> Sign in to continue uploading and access your files later.
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={onLoginClick}
              className="bg-brand hover:bg-brand-dim text-white"
            >
              Sign In
            </Button>
            <LoginFeatureTooltip variant="icon" />
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (remaining <= 2) {
    return (
      <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400 mt-4">
        <Sparkles className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            You have <strong>{remaining} uploads</strong> remaining. Sign in to get unlimited uploads!
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onLoginClick}
              className="border-blue-500/50 hover:bg-blue-500/20"
            >
              Sign In
            </Button>
            <LoginFeatureTooltip variant="icon" />
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
