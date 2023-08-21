import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { daysToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'

export const getAnime = async (animeId: string): Promise<Anime> => {
  const response = await fetch(`${APIRoutes.InfoAnime}/${animeId}`, {
    next: { revalidate: daysToSeconds(1) },
  })

  const anime: Anime = await response.json()
  return filterUnsupportDomains(anime)
}
