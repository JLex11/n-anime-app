import { APIRoutes } from '@/enums'
import { EpisodeSources } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getEpisodeSources = async (episodeId: string) => {
  const response = await fetch(`${APIRoutes.VideoStreaming}/${episodeId}`, {
    next: { revalidate: hoursToSeconds(3) },
  })

  const episodeSources: EpisodeSources = await response.json()
  return episodeSources ?? {}
}
