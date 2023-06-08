import { APIRoutes } from '@/enums'
import { Episode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'

export const getLatestEpisodes = async () => {
  const response = await fetch(APIRoutes.LatestEpisodes, {
    next: { revalidate: minToSeconds(10) },
  })

  const episodes: Episode[] = await response.json()
  return episodes ?? []
}
