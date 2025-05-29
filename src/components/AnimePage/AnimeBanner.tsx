import { getAnime } from '@/api/getAnime'
import { Suspense } from 'react'
import Picture from '../Carousel/Picture'
import styles from './Anime.module.css'

export async function AnimeBanner({ animeId }: { animeId: string }) {
	const anime = await getAnime(animeId)
	if (!anime) return null

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
