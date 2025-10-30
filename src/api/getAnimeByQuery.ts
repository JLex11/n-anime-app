'use cache'

import { APIRoutes } from '@/enums'
import { fetchAnimeHelper } from '@/services/fetchAnimeHelper'
import type { Anime } from '@/types'
import { minToSeconds } from '@/utils/convertTime'

export const getAnimesByQuery = async (query: string, limit?: number, page?: number): Promise<Anime[]> => {
	return (
		(await fetchAnimeHelper<Anime[]>(
			`${APIRoutes.SearchAnimes}/${query}`,
			{ revalidate: minToSeconds(1) },
			{ pageSize: limit, page }
		)) || []
	)
}
