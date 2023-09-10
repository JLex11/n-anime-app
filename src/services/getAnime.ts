import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { daysToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'
import { fetchData } from './fetchData'

export const getAnime = async (animeId: string): Promise<Anime | null> => {
  const fetchConfig = {
    next: { revalidate: daysToSeconds(1) }
  }

  const anime = await fetchData(`${APIRoutes.InfoAnime}/${animeId}`, fetchConfig)
  return anime && filterUnsupportDomains(anime)
}
