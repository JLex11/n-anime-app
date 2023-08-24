import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { sortByRank } from '@/utils/sortByRank'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'

export const getRatingAnimes = async (limit = 10): Promise<Anime[]> => {
  const animes: Anime[] = await fetch(`${APIRoutes.RatingAnimes}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(12) },
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return []
    })

  return animes.sort(sortByRank).map(filterUnsupportDomains)
}
