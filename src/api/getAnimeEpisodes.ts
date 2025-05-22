import { APIRoutes } from '@/enums'
import type { Episode } from '@/types'
import { minToSeconds } from '@/utils/convertTime'
import { fetchData } from '../services/fetchData'

export const getAnimeEpisodes = async (animeId: string, offset?: number, limit?: number) => {
	const fetchConfig = {
		next: { revalidate: minToSeconds(30) },
	}

	const animeEpisodes = await fetchData<Episode[]>(
		`${APIRoutes.AnimeEpisodes.replace(':animeId', animeId)}?offset=${offset}&limit=${limit}`,
		fetchConfig
	)

	return animeEpisodes || []
}
