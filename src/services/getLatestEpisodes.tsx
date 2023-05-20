import { APIRoutes } from '@/enums'
import { LastEpisode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'

export const getLatestEpisodes = async () => {
  const response = await fetch(APIRoutes.LatestEpisodes, {
    next: { revalidate: minToSeconds(5) },
  })

  const episodes: LastEpisode[] = await response.json()
  return episodes ?? []
}
