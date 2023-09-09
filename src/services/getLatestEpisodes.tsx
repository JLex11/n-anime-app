import { APIRoutes } from '@/enums'
import { Episode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'
import { fetchData } from './fetchData'

export const getLatestEpisodes = async () => {
  const fetchConfig = {
    next: { revalidate: minToSeconds(10) }
  }

  const episodes: Episode[] = await fetchData(APIRoutes.LatestEpisodes, fetchConfig)
  return episodes
}
