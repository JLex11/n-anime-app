import { APIRoutes } from '@/enums'
import type { EpisodeSources } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'
import { fetchData } from '../services/fetchData'

export const getEpisodeSources = async (episodeId: string) => {
	const fetchConfig = {
		next: { revalidate: hoursToSeconds(3) },
	}

	const episodeSources = await fetchData<EpisodeSources>(`${APIRoutes.VideoStreaming}/${episodeId}`, fetchConfig)
	return episodeSources || { episode: '', videos: { SUB: [] } }
}
