import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { sortByRank } from '@/utils/sortByRank'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'
import { fetchData } from './fetchData'

export const getRatingAnimes = async (limit = 10): Promise<Anime[]> => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(12) }
  }

  const animes: Anime[] = await fetchData(`${APIRoutes.RatingAnimes}?limit=${limit}`, fetchConfig)
  return animes.sort(sortByRank).map(filterUnsupportDomains)
}
