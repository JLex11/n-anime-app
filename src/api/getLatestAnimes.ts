'use cache'

import { APIRoutes } from '@/enums'
import { fetchAnimeHelper } from '@/services/fetchAnimeHelper'
import type { Anime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getLatestAnimes = async (limit = 10): Promise<Anime[]> => {
	return await fetchAnimeHelper<Anime[]>(
		APIRoutes.LatestAnimes,
		{ revalidate: hoursToSeconds(3) },
		{ limit }
	) || []
}
