import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'

export const getAnimesByQuery = async (query: string, limit?: number) => {
  const response = await fetch(`${APIRoutes.SearchAnimes}/${query}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(5) },
  })

  const animes: Anime[] = await response.json()
  return animes.map(filterUnsupportDomains)
}
