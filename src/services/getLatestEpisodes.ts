import { APIRoutes } from '@/enums'
import { Episode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'
import { fetchData } from './fetchData'

export const getLatestEpisodes = async () => {
  const fetchConfig = {
    next: { revalidate: minToSeconds(5) }
  }

  const episodes = await fetchData<Episode[]>(APIRoutes.LatestEpisodes, fetchConfig)
  return episodes || []
}
