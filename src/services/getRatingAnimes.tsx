import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { sortByRank } from '@/utils/sortByRank'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'

export const getRatingAnimes = async (limit = 10): Promise<Anime[]> => {
  const response = await fetch(`${APIRoutes.RatingAnimes}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(2) },
  })

  const animes: Anime[] = await response.json()
  return animes.sort(sortByRank).map(filterUnsupportDomains)
}
