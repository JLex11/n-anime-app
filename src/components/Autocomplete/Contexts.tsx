import { createContext } from 'react'

interface AutocompleteContextType {
  activeItemId: number
  setActiveItemId: (id: number) => void
}

const defaultAutoCompleteContext: AutocompleteContextType = {
  activeItemId: 0,
  setActiveItemId: () => {},
}

export const AutocompleteContext = createContext(defaultAutoCompleteContext)
