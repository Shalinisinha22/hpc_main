"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia(query)

    // Initial check
    setMatches(mediaQuery.matches)

    // Event listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

// Specific hook for mobile detection
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

// Specific hook for tablet detection
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

// Specific hook for desktop detection
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}
