'use client'

import { createContext } from 'react'

interface RootContextValue {
  headers?: IterableIterator<[string, string]>
}

const defaultValue: RootContextValue = {
}

export const RootContext = createContext(defaultValue)

interface LayoutContextWrapperProps {
  children: React.ReactNode
  headers: IterableIterator<[string, string]>
}

export function LayoutContextWrapper({ children, headers }: LayoutContextWrapperProps) {

  return <RootContext.Provider value={{ headers }}>{children}</RootContext.Provider>
}