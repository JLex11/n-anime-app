import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'
import { addAnimeToIndex } from './animesState'
import { fetchData } from './fetchData'

export const getLatestAnimes = async (limit = 10): Promise<Anime[]> => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(3) }
  }

  const animes = await fetchData<Anime[]>(`${APIRoutes.LatestAnimes}?limit=${limit}`, fetchConfig)
  return animes?.map(anime => addAnimeToIndex(filterUnsupportDomains(anime))) || []
}
