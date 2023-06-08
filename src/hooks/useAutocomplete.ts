import { APP_ROUTES } from '@/constants'
import { getAnimesByQuery } from '@/services/getAnimeByQuery'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { AutocompleteOptionsWithMetadata, AutocompleteState, BaseItem, createAutocomplete } from '@algolia/autocomplete-core'
import { useRouter } from 'next/navigation'
import { useId, useMemo, useRef, useState } from 'react'

export interface AutocompleteItemChild {
  id: string
  title: string | number
  image: {
    src: string | undefined
    alt: string
  }
  link: string
}

export interface AutocompleteItemChilds {
  items: AutocompleteItemChild[]
  title: string
}

export interface AutocompleteItem extends BaseItem {
  id: string
  title: string
  image: string
  link: string
  description: string
  type?: string
  rank?: number
  childsCallback?: () => Promise<AutocompleteItemChilds>
}

export interface AutocompleteProps extends AutocompleteOptionsWithMetadata<AutocompleteItem> {
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}

export const useAutocomplete = ({ placeholder, handleLaunchAutocomplete }: AutocompleteProps) => {
  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState<AutocompleteItem>>({
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
      id: route.link,
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
      id: anime.animeId,
      title: anime.title,
      image: anime.images.coverImage,
      link: `/animes/${anime.animeId}`,
      description: anime.description ?? 'Descripcion no disponible',
      type: anime.type ?? 'Anime',
      rank: anime.rank ?? 0,
      childsCallback: async () => {
        const episodes = await getAnimeEpisodes(anime.animeId, 0, 10)
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
      },
    }))
  }

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
