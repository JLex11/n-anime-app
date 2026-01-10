import { APIRoutes } from '@/enums'
import { fetchAnimeHelper } from '@/services/fetchAnimeHelper'
import type { Anime } from '@/types'
import { daysToSeconds } from '@/utils/convertTime'

export const getRatingAnimes = async (limit = 10): Promise<Anime[]> => {
	const animes = await fetchAnimeHelper<Anime[]>(
		APIRoutes.RatingAnimes,
		{ revalidate: daysToSeconds(1) },
		{ limit }
	)
	return animes || []
}
