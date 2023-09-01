'use client'

import { createContext, useRef } from 'react'

interface DefaultValue {
  videoSectionRef: React.RefObject<HTMLElement> | null
}

const defaultValue: DefaultValue = {
  videoSectionRef: null
}

export const EpisodePageContext = createContext(defaultValue)

export function EpisodePageContextProvider({ children }: { children: React.ReactNode }) {
  const videoSectionRef = useRef<HTMLElement>(null)

  return <EpisodePageContext.Provider value={{ videoSectionRef }}>{children}</EpisodePageContext.Provider>
}
