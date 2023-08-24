import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getBroadcastAnimes = async (limit?: number) => {
  const broadcastAnimes: Anime[] = await fetch(`${APIRoutes.BroadcastAnimes}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(12) },
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return []
    })

  return broadcastAnimes
}
