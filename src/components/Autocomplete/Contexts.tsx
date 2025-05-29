import type { AutocompleteOutputItem } from '@/hooks/useAutocomplete.types'
import { createContext, useContext, useMemo } from 'react'

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

// Hook optimizado para consumir el contexto
export function useAutocompleteContext() {
	const context = useContext(AutocompleteContext)
	if (!context) {
		throw new Error('useAutocompleteContext must be used within AutocompleteContext.Provider')
	}
	return context
}

// Provider optimizado
export function AutocompleteProvider({ 
	children, 
	activeItemId, 
	setActiveItemId, 
	handleLaunchAutocomplete 
}: {
	children: React.ReactNode
	activeItemId: number
	setActiveItemId: (id: number) => void
	handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const value = useMemo(
		() => ({ activeItemId, setActiveItemId, handleLaunchAutocomplete }),
		[activeItemId, setActiveItemId, handleLaunchAutocomplete]
	)

	return (
		<AutocompleteContext.Provider value={value}>
			{children}
		</AutocompleteContext.Provider>
	)
}
