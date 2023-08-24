import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '../utils/filterUnsupportDomains'

export const getLatestAnimes = async (limit = 10): Promise<Anime[]> => {
  const animes: Anime[] = await fetch(`${APIRoutes.LatestAnimes}?limit=${limit}`, {
    next: { revalidate: hoursToSeconds(6) },
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return []
    })

  return animes.map(filterUnsupportDomains)
}
