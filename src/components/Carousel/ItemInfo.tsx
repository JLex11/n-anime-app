import Link from 'next/link'
import { ViewTransition } from 'react'
import { BadgeList } from '../BadgeList'
import styles from './Carousel.module.css'

interface Props {
	animeId: string
	title: string
	genres?: string[] | null
}

export function ItemInfo({ animeId, title, genres }: Props) {
	const safeGenres = Array.isArray(genres) ? genres : []
	const uniqueGenres = [...new Set(safeGenres)]
	const mappedGenres = uniqueGenres.map(genre => ({
		name: genre,
		url: `/animes/?genre=${genre}`,
	}))

	return (
		<div className={styles.info}>
			<div className={styles.content}>
				<Link href={`/animes/${animeId}`}>
					<ViewTransition name={`anime-title-${animeId}`}>
						<h1 className={styles.infoTitle}>{title}</h1>
					</ViewTransition>
				</Link>
				<BadgeList items={mappedGenres} width='50%' />
			</div>
		</div>
	)
}
