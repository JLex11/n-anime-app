import { APIRoutes } from '@/enums'
import { fetchAnimeHelper } from '@/services/fetchAnimeHelper'
import type { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getAnime = async (animeId: string): Promise<Anime | undefined> => {
  return fetchAnimeHelper<Anime>(
    `${APIRoutes.InfoAnime}/${animeId}`,
    {
      revalidate: hoursToSeconds(12),
      useCache: true
    }
  )
}
