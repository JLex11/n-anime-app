import { getAnime } from '@/api/getAnime'
import { Suspense } from 'react'
import Picture from '../Carousel/Picture'
import styles from './Anime.module.css'
import { cacheLife, cacheTag } from 'next/cache'

export async function AnimeBanner({ animeId }: { animeId: string }) {
	'use cache'
	cacheLife('animeDetails')
	cacheTag(`anime-${animeId}`)

	const anime = await getAnime(animeId)
	if (!anime || !animeId || !anime.title) return null

	const pictureImages = anime.images?.carouselImages.filter(carouselImage => carouselImage.link) ?? []
	const fbImage = { link: anime.images?.coverImage, isBlur: true }

	return (
		<div className={styles.banner}>
			<Suspense fallback={null}>
				<Picture
					alt={anime.title}
					images={[...pictureImages, fbImage]}
					defaultSize={{ width: 1240, height: 620 }}
					preferDefaultSize
					priority
					quality={80}
				/>
			</Suspense>
		</div>
	)
}
