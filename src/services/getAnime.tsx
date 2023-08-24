import { APIRoutes } from '@/enums'
import { Anime } from '@/types'
import { daysToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'

export const getAnime = async (animeId: string): Promise<Anime | null> => {
  const anime = await fetch(`${APIRoutes.InfoAnime}/${animeId}`, {
    next: { revalidate: daysToSeconds(1) },
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return null
    })

  return anime && filterUnsupportDomains(anime)
}
