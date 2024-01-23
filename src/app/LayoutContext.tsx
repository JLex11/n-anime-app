'use client'

import { createContext, useEffect, useState } from 'react'

interface RootContextValue {
  isMobile: boolean
}

const defaultValue: RootContextValue = {
  isMobile: false
}

export const RootContext = createContext(defaultValue)

export function LayoutContextWrapper({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(defaultValue.isMobile)

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      const { matches } = event
      setIsMobile(matches)
    }

    const media = window.matchMedia('(max-width: 56rem)')
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return <RootContext.Provider value={{ isMobile }}>{children}</RootContext.Provider>
}