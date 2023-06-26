import { APP_ROUTES } from '@/constants'
import { getAnimesByQuery } from '@/services/getAnimeByQuery'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { AutocompleteOptionsWithMetadata, AutocompleteState, OnActiveParams, createAutocomplete } from '@algolia/autocomplete-core'
import { useRouter } from 'next/navigation'
import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { AutocompleteItem, AutocompleteItemChilds, AutocompleteItemId } from './useAutocomplete.types'

const autocompleteInitialState: AutocompleteState<AutocompleteItem> = {
  collections: [],
  isOpen: false,
  activeItemId: 0,
  completion: null,
  context: {},
  query: '',
  status: 'idle',
}

interface AutocompleteProps extends AutocompleteOptionsWithMetadata<AutocompleteItem> {
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}

export const useAutocomplete = ({ placeholder, handleLaunchAutocomplete }: AutocompleteProps) => {
  const [autocompleteState, setAutocompleteState] = useState(autocompleteInitialState)

  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const autocompleteId = useId()

  const createAutocompleteItemId = (value: string | number): AutocompleteItemId => `autocompleteItem-${value}`

  const handleActiveItem = useCallback(
    ({ item, event, state }: OnActiveParams<AutocompleteItem>) => {
      router.prefetch(item.link)
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const itemId = item.__autocomplete_id as number
        const totalItems = state.collections.reduce((acc, collection) => acc + collection.items.length, 0)
        const block = itemId < 4 || itemId > totalItems - 4 ? 'center' : 'nearest'

        const itemElement = document.getElementById(`autocompleteItem-${item.id}`)
        itemElement?.scrollIntoView({ behavior: 'smooth', block: block })
      }
    },
    [router]
  )

  const getRoutesItems = useCallback(async (query: string) => {
    if (query.length < 1) return []

    const regex = new RegExp(query, 'gi')
    const filteredRoutes = APP_ROUTES.filter(route => route.name.match(regex))

    return filteredRoutes.map(route => ({
      id: route.link,
      title: route.name,
      image: '/app-window.svg',
      link: route.link,
      description: route.description,
      _autocomplete_item_id: createAutocompleteItemId(route.link),
    }))
  }, [])

  const getAnimeItemChilds = async (animeId: AutocompleteItem['id']): Promise<AutocompleteItemChilds> => {
    const episodes = await getAnimeEpisodes(animeId, 0, 10)
    const mappedEpisodes = episodes.map(episode => ({
      id: episode.episodeId,
      title: episode.episode,
      image: {
        src: episode.image,
        alt: episode.title,
      },
      link: `/animes/${episode.animeId}/${episode.episode}`,
    }))

    return {
      items: mappedEpisodes,
      title: 'Episodios',
    }
  }

  const getAnimeItems = useCallback(async (query: string) => {
    if (query.length < 2) return []

    const limit = 10 + query.length * 4
    const animes = await getAnimesByQuery(encodeURIComponent(query), limit)

    return animes.map(anime => ({
      id: anime.animeId,
      title: anime.title,
      image: anime.images.coverImage,
      link: `/animes/${anime.animeId}`,
      description: anime.description ?? 'Descripcion no disponible',
      type: anime.type ?? 'Anime',
      rank: anime.rank ?? 0,
      childsCallback: () => getAnimeItemChilds(anime.animeId),
      _autocomplete_item_id: createAutocompleteItemId(anime.animeId),
    }))
  }, [])

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
            getItems: () => getRoutesItems(query),
          },
          {
            sourceId: 'Animes',
            onActive: handleActiveItem,
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
    [placeholder, autocompleteId, router, handleLaunchAutocomplete, getAnimeItems, handleActiveItem, getRoutesItems]
  )

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
