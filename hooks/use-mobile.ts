import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize with a consistent value to prevent hydration mismatch
  // Default to false (desktop) for SSR, then sync with actual value on mount
  const [isMobile, setIsMobile] = React.useState(false)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    // Set hydrated immediately to prevent flash
    setIsHydrated(true)

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Return false during SSR and initial render to match server
  // This prevents layout shift by keeping consistent initial state
  return isHydrated ? isMobile : false
}
