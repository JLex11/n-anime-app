import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { daysToSeconds } from '@/utils/convertTime'
import { sortByRank } from '@/utils/sortByRank'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'
import { addAnimeToIndex } from './animesState'
import { fetchData } from './fetchData'

export const getRatingAnimes = async (limit = 10): Promise<Anime[]> => {
  const fetchConfig = {
    next: { revalidate: daysToSeconds(1) }
  }

  const animes = await fetchData<Anime[]>(`${APIRoutes.RatingAnimes}?limit=${limit}`, fetchConfig)

  if (!animes) return []

  return animes
    .sort(sortByRank)
    .map(anime => addAnimeToIndex(filterUnsupportDomains(anime)))
    .filter(anime => anime.title)
}
