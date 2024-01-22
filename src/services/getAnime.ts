import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'
import { addAnimeToIndex, getIndexedAnime } from './animesState'
import { fetchData } from './fetchData'

export const getAnime = async (animeId: string): Promise<Anime | undefined> => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(12) }
  }

  const animePromise = fetchData(
    `${APIRoutes.InfoAnime}/${animeId}`,
    fetchConfig
  )
    .then(anime => {
      if (!anime) return
      return addAnimeToIndex(filterUnsupportDomains(anime))
    })
    .catch(() => {
      console.error(`Failed to fetch anime ${animeId}`)
      return undefined
    })

  const indexedAnime = getIndexedAnime(animeId)
  if (indexedAnime) return indexedAnime

  return animePromise
}
