'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const calculatedProgress =
        scrollHeight > 0 ? (scrollPosition / scrollHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, calculatedProgress)))
    }

    // Initial calculation
    updateProgress()

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-brand z-50 transition-all duration-150"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
