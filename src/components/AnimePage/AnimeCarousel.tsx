import { getAnime } from '@/api/getAnime'
import { Carousel } from '../Carousel'
import { Suspense } from 'react'

export async function AnimeCarousel({ animeId }: { animeId: string }) {
	const anime = await getAnime(animeId)
	if (!anime) return null

	return (
		<Suspense fallback={null}>
			<Carousel animes={[anime]} />
		</Suspense>
	)
}
