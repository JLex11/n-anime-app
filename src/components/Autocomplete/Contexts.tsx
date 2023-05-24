import { createContext } from 'react'

interface AutocompleteContextType {
  activeItemId: number
  setActiveItemId: (id: number) => void
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultAutoCompleteContext: AutocompleteContextType = {
  activeItemId: 0,
  setActiveItemId: () => {},
  handleLaunchAutocomplete: () => {},
}

export const AutocompleteContext = createContext(defaultAutoCompleteContext)
