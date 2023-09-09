import { getAnimeItems, getRoutesItems } from '@/components/Autocomplete/AutocompleteSources'
import { debounceCallback } from '@/utils/debounceCallback'
import { AutocompleteState, OnActiveParams, createAutocomplete } from '@algolia/autocomplete-core'
import { useRouter } from 'next/navigation'
import { createRef, useCallback, useId, useMemo, useRef, useState } from 'react'
import { AutocompleteItem, AutocompleteOutputItem, AutocompleteProps } from './useAutocomplete.types'

const autocompleteInitialState: AutocompleteState<AutocompleteOutputItem> = {
  collections: [],
  isOpen: false,
  activeItemId: 0,
  completion: null,
  context: {},
  query: '',
  status: 'idle'
}

export function useAutocomplete({ handleLaunchAutocomplete }: AutocompleteProps) {
  const [autocompleteState, setAutocompleteState] = useState(autocompleteInitialState)

  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<React.RefObject<HTMLElement>[]>([])

  const router = useRouter()
  const autocompleteId = useId()

  const getItemRef = useCallback((index: number) => {
    if (!itemRefs.current[index]) itemRefs.current[index] = createRef<HTMLElement>()
    return itemRefs.current[index]
  }, [])

  const debouncedGetAnimeItems = debounceCallback<string[], AutocompleteItem[]>(getAnimeItems, 200)

  const handleActiveItem = useCallback(
    ({ item, event, state }: OnActiveParams<AutocompleteOutputItem>) => {
      router.prefetch(item.link)

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const itemId = Number(item.__autocomplete_id)
        const totalItems = state.collections.reduce((acc, collection) => acc + collection.items.length, 0)
        const block = itemId < 4 || itemId > totalItems - 4 ? 'center' : 'nearest'

        const itemElement = itemRefs.current[itemId].current
        itemElement?.scrollIntoView({ behavior: 'smooth', block })
      }
    },
    [router]
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
            getItems: () => getRoutesItems(query).map(routeItem => ({ ...routeItem, getItemRef }))
          },
          {
            sourceId: 'Animes',
            onActive: handleActiveItem,
            getItemUrl: ({ item }) => item.link,
            getItems: async () => {
              const animeItems = await debouncedGetAnimeItems(query)
              return animeItems.map(animeItem => ({ ...animeItem, getItemRef }))
            }
          }
        ],
        navigator: {
          navigate: ({ itemUrl }) => {
            router.push(itemUrl)
            handleLaunchAutocomplete(false)
          }
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autocompleteId, router, handleLaunchAutocomplete, handleActiveItem, getRoutesItems]
  )

  const autocompleteFormProps = autoComplete.getFormProps({ inputElement: inputRef.current })

  const formProps = {
    action: autocompleteFormProps.action,
    noValidate: autocompleteFormProps.noValidate,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => autocompleteFormProps.onSubmit(event as unknown as Event),
    onReset: (event: React.FormEvent<HTMLFormElement>) => autocompleteFormProps.onReset(event as unknown as Event)
  }
  const inputProps = autoComplete.getInputProps({ inputElement: inputRef.current })
  const panelProps = autoComplete.getPanelProps({ ref: panelRef.current })

  return {
    autocomplete: autocompleteState,
    setActiveItemId: autoComplete.setActiveItemId,
    elementsRef: {
      inputRef,
      panelRef
    },
    elementsProps: {
      formProps,
      inputProps,
      panelProps
    }
  }
}
