import { API } from '@/constants'
import { LastEpisode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'

export const getLatestEpisodes = async () => {
  const response = await fetch(API.routes.LatestEpisodes, {
    next: { revalidate: minToSeconds(10) },
  })

  const episodes: LastEpisode[] = await response.json()
  return episodes ?? []
}
