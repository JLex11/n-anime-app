import type { Anime } from '@/types'
import Picture from '../Carousel/Picture'
import styles from './Anime.module.css'

interface Props {
	animeImages: Anime['images']
	title: Anime['title']
}

export function Banner({ animeImages, title }: Props) {
	const pictureImages = animeImages?.carouselImages.filter(animeImage => animeImage.link) ?? []
	const fbImage = { link: animeImages?.coverImage, isBlur: true }

	return (
		<div className={styles.banner}>
			<Picture
				alt={title}
				images={[...pictureImages, fbImage]}
				defaultSize={{ width: 1240, height: 620 }}
				preferDefaultSize
				priority
				quality={80}
				decoding='async'
				/* style={{ backgroundPosition: carouselImage.position ?? 'center' }} */
			/>
		</div>
	)
}
