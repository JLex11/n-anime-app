import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'

export const getLatestAnimes = async (limit = 10): Promise<Anime[]> => {
  const response = await fetch(`${APIRoutes.LatestAnimes}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(6) },
  })

  const animes: Anime[] = await response.json()
  return animes.map(filterUnsupportDomains)
}
