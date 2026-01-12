import { APIRoutes } from '@/enums'
import { fetchData } from '@/services/fetchData'
import type { RelatedAnime } from '@/types'
import { hoursToSeconds } from '@/utils/convertTime'

export const getRelatedAnimes = async (animeId: string): Promise<RelatedAnime[] | undefined> => {
	return fetchData<RelatedAnime[]>(
		APIRoutes.RelatedAnimes.replace(':animeId', animeId),
		{
			next: { revalidate: hoursToSeconds(24) }
		}
	)
}

