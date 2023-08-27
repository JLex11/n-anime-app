import { APP_ROUTES } from '@/constants'
import { getAnimesByQuery } from '@/services/getAnimeByQuery'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { debouncePromise } from '@/utils/debouncePromise'
import { AutocompleteState, OnActiveParams, createAutocomplete } from '@algolia/autocomplete-core'
import { useRouter } from 'next/navigation'
import { createRef, useCallback, useId, useMemo, useRef, useState } from 'react'
import { AutocompleteItem, AutocompleteItemChilds, AutocompleteProps } from './useAutocomplete.types'

const autocompleteInitialState: AutocompleteState<AutocompleteItem> = {
  collections: [],
  isOpen: false,
  activeItemId: 0,
  completion: null,
  context: {},
  query: '',
  status: 'idle',
}

export const useAutocomplete = ({ placeholder, handleLaunchAutocomplete }: AutocompleteProps) => {
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

  const getRoutesItems = useCallback(
    async (query: string) => {
      if (query.length < 1) return []

      const regex = new RegExp(query, 'gi')
      const filteredRoutes = APP_ROUTES.filter(route => route.name.match(regex))

      return filteredRoutes.map(route => ({
        id: route.link,
        title: route.name,
        image: '/app-window.svg',
        link: route.link,
        description: route.description,
        getItemRef
      }))
    },
    [getItemRef]
  )

  const getAnimeItemChilds = async (animeId: AutocompleteItem['id']): Promise<AutocompleteItemChilds> => {
    const episodes = await getAnimeEpisodes(animeId, 0, 10)
    const mappedEpisodes = episodes.map(episode => ({
      id: episode.episodeId,
      title: episode.episode,
      image: {
        src: episode.image,
        alt: episode.title
      },
      link: `/animes/${episode.animeId}/${episode.episode}`
    }))

    return {
      items: mappedEpisodes,
      title: 'Episodios'
    }
  }

  const getAnimeItems = useCallback(
    async (query: string) => {
      if (query.length < 2) return []

      const limit = 10 + query.length * 2
      const animes = await getAnimesByQuery(encodeURIComponent(query), limit)

      return animes.map(anime => ({
        id: anime.animeId,
        title: anime.title,
        image: anime.images.coverImage || anime.images.carouselImages[0]?.link || '/lights-blur.webp',
        link: `/animes/${anime.animeId}`,
        description: anime.description ?? 'Descripcion no disponible',
        type: anime.type ?? 'Anime',
        rank: anime.rank ?? 0,
        getItemRef,
        childsCallback: () => getAnimeItemChilds(anime.animeId)
      }))
    },
    [getItemRef]
  )

  const debouncedGetAnimeItems = debouncePromise(getAnimeItems, 300) as (query: string) => Promise<AutocompleteItem[]>

  const handleActiveItem = useCallback(
    ({ item, event, state }: OnActiveParams<AutocompleteItem>) => {
      router.prefetch(item.link)
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const itemId = Number(item.__autocomplete_id)
        const totalItems = state.collections.reduce((acc, collection) => acc + collection.items.length, 0)
        const block = itemId < 4 || itemId > totalItems - 4 ? 'center' : 'nearest'

        const itemElement = itemRefs.current[itemId].current
        itemElement?.scrollIntoView({ behavior: 'smooth', block: block })
      }
    },
    [router]
  )

  const autoComplete = useMemo(
    () =>
      createAutocomplete<AutocompleteItem>({
        autoFocus: true,
        id: `autocomplete-${autocompleteId}`,
        placeholder: placeholder ?? 'Que quieres encontrar?',
        onStateChange: ({ state }) => setAutocompleteState(state),
        defaultActiveItemId: 0,
        getSources: ({ query }) => [
          {
            sourceId: 'Ir a',
            getItemUrl: ({ item }) => item.link,
            getItems: () => getRoutesItems(query)
          },
          {
            sourceId: 'Animes',
            onActive: handleActiveItem,
            getItemUrl: ({ item }) => item.link,
            getItems: () => debouncedGetAnimeItems(query)
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
    [placeholder, autocompleteId, router, handleLaunchAutocomplete, handleActiveItem, getRoutesItems]
  )

  const inputProps = autoComplete.getInputProps({ inputElement: inputRef.current })
  const panelProps = autoComplete.getPanelProps({ ref: panelRef.current })

  return {
    autocomplete: autocompleteState,
    setActiveItemId: autoComplete.setActiveItemId,
    inputRef,
    panelRef,
    inputProps,
    panelProps
  }
}
