import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'
import { addAnimeToIndex } from './animesState'
import { fetchData } from './fetchData'

export const getBroadcastAnimes = async (limit?: number) => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(6) }
  }

  const broadcastAnimes: Anime[] = await fetchData(
    `${APIRoutes.BroadcastAnimes}?limit=${limit}`,
    fetchConfig
  )

  return broadcastAnimes.map(anime => addAnimeToIndex(filterUnsupportDomains(anime)))
}
