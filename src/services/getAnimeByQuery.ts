import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { minToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'
import { addAnimeToIndex } from './animesState'
import { fetchData } from './fetchData'

export const getAnimesByQuery = async (query: string, limit?: number) => {
  const fetchConfig = {
    next: { revalidate: minToSeconds(30) }
  }

  const animes = await fetchData<Anime[]>(`${APIRoutes.SearchAnimes}/${query}?limit=${limit}`, fetchConfig)

  return animes?.map(anime => addAnimeToIndex(filterUnsupportDomains(anime))) || []
}
