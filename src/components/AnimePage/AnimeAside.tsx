import blurImage from '@/public/lights-blur.webp'
import type { Anime } from '@/types'
import Image from 'next/image'
import { ViewTransition } from 'react'
import styles from './Anime.module.css'

const PORTRAIT_ASPECT_RATIO = 9 / 12

export async function AnimeAside({ anime }: { anime: Anime }) {
	const imageSrc = anime.images?.coverImage || blurImage
	const isExternalUrl = typeof imageSrc === 'string'

	return (
		<aside className={styles.aside}>
			<ViewTransition name={`anime-image-${anime.animeId}`}>
				<Image
					src={imageSrc}
					alt={anime.title}
					width={300}
					height={300 / PORTRAIT_ASPECT_RATIO}
					className={styles.asideImg}
					priority
					loading='eager'
					placeholder={isExternalUrl ? 'empty' : 'blur'}
					blurDataURL={!isExternalUrl ? blurImage.blurDataURL : undefined}
				/>
			</ViewTransition>
			{anime.status && (
				<div className={styles.status}>
					<span className={styles.statusValue}>{anime.status}</span>
				</div>
			)}
		</aside>
	)
}
