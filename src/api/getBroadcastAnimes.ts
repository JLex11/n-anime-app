'use cache'

import { APIRoutes } from '@/enums'
import { fetchAnimeHelper } from '@/services/fetchAnimeHelper'
import type { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getBroadcastAnimes = async (limit?: number): Promise<Anime[]> => {
  return await fetchAnimeHelper<Anime[]>(
    APIRoutes.BroadcastAnimes,
    { revalidate: hoursToSeconds(6) },
    { limit }
  ) || []
}
