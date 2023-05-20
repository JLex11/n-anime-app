import { APP_ROUTES } from '@/constants'
import { getAnimesByQuery } from '@/services/getAnimeByQuery'
import { AutocompleteOptionsWithMetadata, AutocompleteState, BaseItem, createAutocomplete } from '@algolia/autocomplete-core'
import { useRouter } from 'next/navigation'
import { useId, useMemo, useRef, useState } from 'react'

export interface AutocompleteAnimeItem extends BaseItem {
  title: string
  image: string
  link: string
  description: string
  type?: string
  rank?: number
}

export interface AutocompleteProps extends AutocompleteOptionsWithMetadata<AutocompleteAnimeItem> {
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}

export const useAutocomplete = ({ placeholder, handleLaunchAutocomplete }: AutocompleteProps) => {
  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState<AutocompleteAnimeItem>>({
    collections: [],
    isOpen: false,
    activeItemId: 0,
    completion: null,
    context: {},
    query: '',
    status: 'idle',
  })

  const router = useRouter()
  const autocompleteId = useId()

  const getRoutesItems = async (query: string) => {
    if (query.length < 1) return []

    const regex = new RegExp(query, 'gi')
    const filteredRoutes = APP_ROUTES.filter(route => route.name.match(regex))

    return filteredRoutes.map(route => ({
      title: route.name,
      image: '/app-window.svg',
      link: route.link,
      description: route.description,
    }))
  }

  const getAnimeItems = async (query: string) => {
    if (query.length < 2) return []

    const limit = 10 + query.length * 2
    const animes = await getAnimesByQuery(encodeURIComponent(query), limit)

    return animes.map(anime => ({
      title: anime.title,
      image: anime.images.coverImage,
      link: `/animes/${anime.animeId}`,
      description: anime.description ?? 'Description not available',
      type: anime.type ?? 'Anime',
      rank: anime.rank ?? 0,
    }))
  }

  const autoComplete = useMemo(
    () =>
      createAutocomplete<AutocompleteAnimeItem>({
        autoFocus: true,
        id: `autocomplete-${autocompleteId}`,
        placeholder: placeholder ?? 'what do you want to find?',
        onStateChange: ({ state }) => setAutocompleteState(state),
        defaultActiveItemId: 0,
        getSources: ({ query }) => [
          {
            sourceId: 'App',
            getItemUrl: ({ item }) => item.link,
            getItems: () => getRoutesItems(query),
          },
          {
            sourceId: 'animes',
            onActive: ({ item, event, state }) => {
              router.prefetch(item.link)
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                const itemId = item.__autocomplete_id as number
                const totalItems = state.collections.reduce((acc, collection) => acc + collection.items.length, 0)
                const block = itemId < 4 || itemId > totalItems - 4 ? 'center' : 'nearest'

                document.getElementById(`autocompleteItem-${item.link}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: block,
                })
              }
            },
            getItemUrl: ({ item }) => item.link,
            getItems: () => getAnimeItems(query),
          },
        ],
        navigator: {
          navigate: ({ itemUrl }) => {
            router.push(itemUrl)
            handleLaunchAutocomplete(false)
          },
        },
      }),
    [placeholder, autocompleteId, router, handleLaunchAutocomplete]
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const formProps = autoComplete.getFormProps({ inputElement: inputRef.current })
  const inputProps = autoComplete.getInputProps({ inputElement: inputRef.current })
  const panelProps = autoComplete.getPanelProps({ ref: panelRef.current })

  return {
    autocomplete: autocompleteState,
    setActiveItemId: autoComplete.setActiveItemId,
    inputRef,
    panelRef,
    inputProps,
    formProps,
    panelProps,
  }
}
