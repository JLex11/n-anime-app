import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getBroadcastAnimes = async (limit?: number) => {
  const response = await fetch(`${APIRoutes.BroadcastAnimes}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(1) },
  })

  return (await response.json()) as Anime[]
}
