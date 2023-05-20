import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { monthsToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'

export const getAnime = async (animeId: string): Promise<Anime> => {
  const response = await fetch(`${APIRoutes.InfoAnime}/${animeId}`, {
    next: { revalidate: monthsToSeconds(1) },
  })

  const anime: Anime = await response.json()
  return filterUnsupportDomains(anime)
}
