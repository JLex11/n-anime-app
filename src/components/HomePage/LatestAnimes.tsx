'use cache'

import { getLatestAnimes } from '@/api/getLatestAnimes'
import { AnimeCard } from '../AnimeCard'
import { cacheLife } from 'next/cache'

export const LatestAnimes = async () => {
	cacheLife('animeList')

	const latestAnimes = await getLatestAnimes()

	const animesData = latestAnimes.map(anime => {
		const imageSrc = anime.images?.coverImage ?? anime.images?.carouselImages?.at(-1)?.link ?? ''
		const fbSrc = anime.images?.carouselImages?.at(-2)?.link ?? ''

		return {
			animeId: anime.animeId,
			title: anime.title,
			image: {
				src: imageSrc,
				fbSrc,
				width: 300,
				height: 350,
				loading: 'lazy' as const,
			},
			link: `/animes/${anime.animeId}`,
			labels: [anime.status, anime.type || 'anime'],
			rank: anime.rank,
			description: anime.description,
		}
	})

	return animesData.map(animeData => <AnimeCard key={animeData.animeId} {...animeData} />)
}
