import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'

export const getAnimesByQuery = async (query: string, limit?: number) => {
  const animes: Anime[] = await fetch(`${APIRoutes.SearchAnimes}/${query}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(1) },
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return []
    })

  return Array.isArray(animes) ? animes.map(filterUnsupportDomains) : []
}
