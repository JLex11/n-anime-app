import AppWindow from '@/components/Icons/AppWindow'
import styles from '@/components/SearchPage/SearchPage.module.css'
import { ServerAutocomplete } from '@/components/ServerAutocomplete'
import {
  AutocompleteVars,
  CollectionHandle
} from '@/components/ServerAutocomplete/autocompleteTypes'
import { APP_ROUTES } from '@/constants'
import { getAnimesByQuery } from '@/services/getAnimeByQuery'

interface Props {
  searchParams: {
    [AutocompleteVars.QUERY_NAME]: string
  }
}

export default function SearchPage({ searchParams }: Props) {
  const { autocomplete_query } = searchParams

  const getItemsHandlers: CollectionHandle[] = [
    {
      title: 'Ir a',
      id: 'routes',
      getItemsCallback: query => {
        const regex = new RegExp(query, 'gi')
        const matchedRoutes = APP_ROUTES.filter(route =>
          route.name.match(regex)
        )

        return matchedRoutes.map(route => ({
          id: route.link,
          title: route.name,
          image: <AppWindow width={50} />,
          link: route.link,
          description: route.description
        }))
      }
    },
    {
      title: 'Animes',
      id: 'animes_collection',
      getItemsCallback: async query => {
        const animes = await getAnimesByQuery(encodeURIComponent(query))

        const mappedItems =
          animes?.map(item => {
            return {
              id: item.animeId,
              title: item.title,
              description: item.description,
              link: `/animes/${item.animeId}`,
              image: item.images?.coverImage || '/lights-blur.webp',
              type: item.type
            }
          }) ?? []

        return mappedItems
      }
    }
  ]

  return (
    <main className={styles.main}>
      <h1>Search Page</h1>
      <ServerAutocomplete
        query={autocomplete_query}
        getItemsHandlers={getItemsHandlers}
      />
    </main>
  )
}
