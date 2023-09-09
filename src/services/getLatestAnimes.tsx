import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'
import { fetchData } from './fetchData'

export const getLatestAnimes = async (limit = 10): Promise<Anime[]> => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(6) }
  }

  const animes: Anime[] = await fetchData(`${APIRoutes.LatestAnimes}?limit=${limit}`)
  return animes.map(filterUnsupportDomains)
}
