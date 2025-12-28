import { getAnime } from '@/api/getAnime'
import { getBroadcastAnimes } from '@/api/getBroadcastAnimes'
import { getRatingAnimes } from '@/api/getRatingAnimes'
import type { Anime } from '@/types'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import type { Metadata } from 'next'

export interface PageProps {
	params: Promise<{ animeId: string }>
}

export async function generateMetadataFromAnimeId(animeId: string): Promise<Metadata> {
	const anime = await getAnime(animeId)
	if (!anime) return {}

	return {
		title: anime.title ?? normalizeAnimeId(animeId),
		description: anime.description,
		keywords: `${anime.genres.join(', ')} ${anime.title} ${anime.otherTitles.join(', ')}`,
	}
}

export async function generatePageStaticParams(): Promise<{ animeId: string }[]> {
	// Pre-renderizar top 50 animes mejor rankeados + animes en emisión
	const animesPromises = [getRatingAnimes(50), getBroadcastAnimes()]

	const animesIdSettled = await Promise.allSettled(
		animesPromises.map(animePromise => animePromise.then(anime => anime.map(({ animeId }) => animeId)))
	)

	const filteredAnimesId = animesIdSettled.filter(
		(animesId): animesId is PromiseFulfilledResult<Anime['animeId'][]> => animesId.status === 'fulfilled'
	)

	const mappedAnimesId = filteredAnimesId.flatMap(filteredAnimesId =>
		filteredAnimesId.value.map(animeId => ({ animeId }))
	)

	// Eliminar duplicados
	const uniqueAnimes = Array.from(new Set(mappedAnimesId.map(a => a.animeId))).map(animeId => ({ animeId }))

	return uniqueAnimes
}
