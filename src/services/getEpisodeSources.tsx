import { APIRoutes } from '@/enums'
import { EpisodeSources } from '@/types'
import { daysToSeconds } from '@/utils/convertTime'

export const getEpisodeSources = async (episodeId: string) => {
  const response = await fetch(`${APIRoutes.VideoStreaming}/${episodeId}`, {
    next: { revalidate: daysToSeconds(1) },
  })

  const episodeSources: EpisodeSources = await response.json()
  return episodeSources ?? {}
}
