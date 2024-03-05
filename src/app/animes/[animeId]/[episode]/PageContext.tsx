'use client'

import { createContext, useCallback, useState } from 'react'

interface DefaultValue {
  videoSectionRef: HTMLElement | null
  handleVideoSectionRef: (node: HTMLElement | null) => void
}

const defaultValue: DefaultValue = {
  videoSectionRef: null,
  handleVideoSectionRef: () => {}
}

export const EpisodePageContext = createContext(defaultValue)

export function EpisodePageContextProvider({ children }: { children: React.ReactNode }) {
  const [videoSectionRef, setNode] = useState<HTMLElement | null>(null)

  const handleVideoSectionRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) setNode(node)
  }, [])

  return (
    <EpisodePageContext.Provider value={{ videoSectionRef, handleVideoSectionRef }}>
      {children}
    </EpisodePageContext.Provider>
  )
}
