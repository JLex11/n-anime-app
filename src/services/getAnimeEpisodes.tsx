import { APIRoutes } from '@/enums'
import { Episode } from '@/types'
import { daysToSeconds } from '@/utils/convertTime'

export const getAnimeEpisodes = async (animeId: string, offset?: number, limit?: number) => {
  const response = await fetch(`${APIRoutes.AnimeEpisodes.replace(':animeId', animeId)}?offset=${offset}&limit=${limit}`, {
    next: { revalidate: daysToSeconds(1) },
  })

  const animeEpisodes: Episode[] = await response.json()
  return animeEpisodes
}
