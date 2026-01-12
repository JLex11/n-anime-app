import { APIRoutes } from '@/enums'
import { fetchAnimeHelper } from '@/services/fetchAnimeHelper'
import type { RelatedAnime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getRelatedAnimes = async (animeId: string): Promise<RelatedAnime[] | null> => {
	return fetchAnimeHelper<RelatedAnime[]>(
		APIRoutes.RelatedAnimes.replace(':animeId', animeId),
		{
			revalidate: hoursToSeconds(24),
			useCache: true
		}
	)
}
