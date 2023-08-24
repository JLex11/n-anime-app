import { APIRoutes } from '@/enums'
import { Episode } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getAnimeEpisodes = async (animeId: string, offset?: number, limit?: number) => {
  const animeEpisodes: Episode[] = await fetch(
    `${APIRoutes.AnimeEpisodes.replace(':animeId', animeId)}?offset=${offset}&limit=${limit}`,
    {
      next: { revalidate: hoursToSeconds(3) },
    }
  )
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return []
    })

  return animeEpisodes
}
