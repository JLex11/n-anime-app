import { APIRoutes } from '@/enums'
import { EpisodeSources } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getEpisodeSources = async (episodeId: string) => {
  const episodeSources: EpisodeSources | null = await fetch(`${APIRoutes.VideoStreaming}/${episodeId}`, {
    next: { revalidate: hoursToSeconds(3) },
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return null
    })

  return episodeSources
}
