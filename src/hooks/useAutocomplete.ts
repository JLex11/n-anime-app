import { getAnimeItems, getRoutesItems } from '@/components/Autocomplete/AutocompleteSources'
import { debounceCallback } from '@/utils/debounceCallback'
import { type AutocompleteState, type OnActiveParams, createAutocomplete } from '@algolia/autocomplete-core'
import { useRouter } from 'next/navigation'
import { createRef, useCallback, useId, useMemo, useRef, useState } from 'react'
import type { AutocompleteItem, AutocompleteOutputItem, AutocompleteProps } from './useAutocomplete.types'

const autocompleteInitialState: AutocompleteState<AutocompleteOutputItem> = {
	collections: [],
	isOpen: false,
	activeItemId: 0,
	completion: null,
	context: {},
	query: '',
	status: 'idle',
}

// Función para crear un array de referencias basado en una clave
const createItemRefGetter = () => {
	const itemRefs = new Map<number, React.RefObject<HTMLElement | null>>()

	return (index: number) => {
		if (!itemRefs.has(index)) {
			itemRefs.set(index, createRef<HTMLElement>())
		}
		return itemRefs.get(index) as React.RefObject<HTMLElement>
	}
}

export function useAutocomplete({ handleLaunchAutocomplete }: AutocompleteProps) {
	const [autocompleteState, setAutocompleteState] = useState(autocompleteInitialState)

	const inputRef = useRef<HTMLInputElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)

	const router = useRouter()
	const autocompleteId = useId()

	const getItemRef = useMemo(() => createItemRefGetter(), [])

	const debouncedGetAnimeItems = useMemo(() => debounceCallback<string[], AutocompleteItem[]>(getAnimeItems, 300), [])

	const handleActiveItem = useCallback(
		({ item, event, state }: OnActiveParams<AutocompleteOutputItem>) => {
			router.prefetch(item.link)

			if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
				const itemId = Number(item.__autocomplete_id)
				const totalItems = state.collections.reduce((acc, collection) => acc + collection.items.length, 0)

				const block = itemId < 4 || itemId > totalItems - 4 ? 'center' : 'nearest'
				const itemElement = getItemRef(itemId).current

				if (itemElement) {
					itemElement.scrollIntoView({
						behavior: 'smooth',
						block,
					})
				}
			}
		},
		[router, getItemRef]
	)

	const autoComplete = useMemo(
		() =>
			createAutocomplete<AutocompleteOutputItem>({
				autoFocus: true,
				id: `autocomplete-${autocompleteId}`,
				placeholder: 'Rey de los Piratas, Gabimaru el Hueco...',
				onStateChange: ({ state }) => setAutocompleteState(state),
				defaultActiveItemId: 0,
				getSources: ({ query }) => [
					{
						sourceId: 'Ir a',
						getItemUrl: ({ item }) => item.link,
						getItems: () =>
							getRoutesItems(query).map(routeItem => ({
								...routeItem,
								getItemRef,
							})),
					},
					{
						sourceId: 'Animes',
						onActive: handleActiveItem,
						getItemUrl: ({ item }) => item.link,
						getItems: async () => {
							if (query.length < 1) return []

							const animeItems = await debouncedGetAnimeItems(query)
							return animeItems.map(animeItem => ({
								...animeItem,
								getItemRef,
							}))
						},
					},
				],
				navigator: {
					navigate: ({ itemUrl }) => {
						router.push(itemUrl)
						handleLaunchAutocomplete(false)
					},
				},
			}),
		[autocompleteId, router, handleLaunchAutocomplete, handleActiveItem, getItemRef, debouncedGetAnimeItems]
	)

	// Optimización de props para el formulario
	const getFormProps = useCallback(() => {
		const autocompleteFormProps = autoComplete.getFormProps({
			inputElement: inputRef.current,
		})

		return {
			action: autocompleteFormProps.action,
			noValidate: autocompleteFormProps.noValidate,
			onSubmit: (event: React.FormEvent<HTMLFormElement>) => autocompleteFormProps.onSubmit(event as unknown as Event),
			onReset: (event: React.FormEvent<HTMLFormElement>) => autocompleteFormProps.onReset(event as unknown as Event),
		}
	}, [autoComplete])

	const formProps = getFormProps()
	const inputProps = autoComplete.getInputProps({
		inputElement: inputRef.current,
	})
	const panelProps = autoComplete.getPanelProps({
		ref: panelRef.current,
	})

	return {
		autocomplete: autocompleteState,
		setActiveItemId: autoComplete.setActiveItemId,
		elementsRef: {
			inputRef,
			panelRef,
		},
		elementsProps: {
			formProps,
			inputProps,
			panelProps,
		},
	}
}
