import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { fetchData } from './fetchData'

export const getBroadcastAnimes = async (limit?: number) => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(12) }
  }

  const broadcastAnimes: Anime[] = await fetchData(`${APIRoutes.BroadcastAnimes}?limit=${limit}`, fetchConfig)
  return broadcastAnimes
}
