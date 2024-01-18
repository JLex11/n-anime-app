import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'
import { fetchData } from './fetchData'

export const getAnime = async (animeId: string): Promise<Anime | null> => {
  const fetchConfig = {
			next: { revalidate: hoursToSeconds(12) }
		}

  const anime = await fetchData(`${APIRoutes.InfoAnime}/${animeId}`, fetchConfig)
  return anime && filterUnsupportDomains(anime)
}
