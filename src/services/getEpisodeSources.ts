import { APIRoutes } from '@/enums'
import { EpisodeSources } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { fetchData } from './fetchData'

export const getEpisodeSources = async (episodeId: string) => {
  const fetchConfig = {
    next: { revalidate: hoursToSeconds(3) }
  }

  const episodeSources: EpisodeSources | null = await fetchData(
    `${APIRoutes.VideoStreaming}/${episodeId}`,
    fetchConfig
  )
  return episodeSources
}
