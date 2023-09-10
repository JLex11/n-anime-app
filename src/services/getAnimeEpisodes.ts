import { APIRoutes } from '@/enums'
import { Episode } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { fetchData } from './fetchData'

export const getAnimeEpisodes = async (animeId: string, offset?: number, limit?: number) => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(1) }
  }

  const animeEpisodes: Episode[] = await fetchData(
    `${APIRoutes.AnimeEpisodes.replace(':animeId', animeId)}?offset=${offset}&limit=${limit}`,
    fetchConfig
  )
  return animeEpisodes
}
