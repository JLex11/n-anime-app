import { APIRoutes } from '@/enums'
import { Episode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'

export const getLatestEpisodes = async () => {
  const episodes: Episode[] = await fetch(APIRoutes.LatestEpisodes, {
    next: { revalidate: minToSeconds(10) },
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return []
    })

  return episodes
}
