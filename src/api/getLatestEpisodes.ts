'use cache'

import { APIRoutes } from '@/enums'
import type { Episode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'
import { fetchData } from '../services/fetchData'

export const getLatestEpisodes = async () => {
	const fetchConfig = {
		next: { revalidate: minToSeconds(5) },
	}

	const episodes = await fetchData<Episode[]>(APIRoutes.LatestEpisodes, fetchConfig).catch(error => {
		console.error('Error fetching latest episodes:', error)
		return undefined
	})

	return episodes || []
}
