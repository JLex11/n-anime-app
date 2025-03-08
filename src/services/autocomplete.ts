import type { AutocompleteItem, AutocompleteOutputItem, AutocompleteProps } from '@/hooks/useAutocomplete.types'
import type { AutocompleteState, OnActiveParams } from '@algolia/autocomplete-core'
import { createAutocomplete } from '@algolia/autocomplete-core'
import { useRouter } from 'next/router'
import { type JSX, createRef, useCallback, useMemo, useRef, useState } from 'react'

interface UseAutoCompleteParams {
  autocompleteId: string,
  getRoutesItems: (query: string) => {
    id: string
    title: string
    image: JSX.Element
    link: string
    description: string
  }[]
  debouncedGetAnimeItems: (...args: string[]) => Promise<AutocompleteItem[]>
  handleLaunchAutocomplete: AutocompleteProps['handleLaunchAutocomplete']
  handleActiveItem: ({ item, event, state }: OnActiveParams<AutocompleteOutputItem>) => void
}

export function useAutoComplete({
  autocompleteId,
  getRoutesItems,
  debouncedGetAnimeItems,
  handleLaunchAutocomplete,
  handleActiveItem,
}: UseAutoCompleteParams) {
  const router = useRouter()
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<AutocompleteOutputItem>
  >()

  const itemRefs = useRef<React.RefObject<HTMLElement | null>[]>([])

  const getItemRef = useCallback((index: number) => {
    if (!itemRefs.current[index]) itemRefs.current[index] = createRef<HTMLElement>()
    return itemRefs.current[index]
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: this must be on mount
  const autoComplete = useMemo(
    () =>
      createAutocomplete<AutocompleteOutputItem>({
        autoFocus: true,
        id: `autocomplete-${autocompleteId}`,
        placeholder: 'Busca tu anime...',
        defaultActiveItemId: 0,
        onStateChange: ({ state }) => setAutocompleteState(state),
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
              const animeItems = await debouncedGetAnimeItems(query)
              return animeItems.map(animeItem => ({ ...animeItem, getItemRef }))
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
    [
      autocompleteId,
      router,
      getRoutesItems,
      debouncedGetAnimeItems,
      handleActiveItem,
      handleLaunchAutocomplete,
    ]
  )

  return { autoComplete, autocompleteState }
}