import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { minToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'
import { fetchData } from './fetchData'

export const getAnimesByQuery = async (query: string, limit?: number) => {
  const fetchConfig = {
			next: { revalidate: minToSeconds(30) }
		}

  const animes: Anime[] = await fetchData(
    `${APIRoutes.SearchAnimes}/${query}?limit=${limit}`,
    fetchConfig
  ).catch(e => {
    console.error(e)
    return []
  })

  return Array.isArray(animes) ? animes.map(filterUnsupportDomains) : []
}
