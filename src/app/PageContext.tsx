'use client'

import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { createContext } from 'react'

interface RootContextValue {
  headers?: ReadonlyHeaders
}

const defaultValue: RootContextValue = {}

export const RootContext = createContext(defaultValue)

export function RootContextProvider({ children, value }: { children: React.ReactNode; value: RootContextValue }) {
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>
}
