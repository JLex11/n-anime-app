import { getRelatedAnimes } from '@/api/getRelatedAnimes'
import Link from 'next/link'
import { cacheLife, cacheTag } from 'next/cache'
import styles from './RelatedAnimes.module.css'

interface Props {
	animeId: string
}

export async function RelatedAnimes({ animeId }: Props) {
	'use cache'
	cacheLife('animeDetails')
	cacheTag(`anime-${animeId}`)

	const relatedAnimes = await getRelatedAnimes(animeId)

	if (!relatedAnimes || relatedAnimes.length === 0) return null

	const uniqueRelatedAnimes = relatedAnimes.filter(
		(anime, index, animes) =>
			animes.findIndex(
				(candidate) => candidate.animeId === anime.animeId && candidate.relation === anime.relation
			) === index
	)

	return (
		<section className={styles.section}>
			<h2 className={styles.title}>Relacionados</h2>
			<div className={styles.grid}>
				{uniqueRelatedAnimes.map((anime) => (
					<Link
						key={JSON.stringify([anime.animeId, anime.relation])}
						href={`/animes/${anime.animeId}`}
						className={styles.card}
					>
						<span className={styles.relation}>{anime.relation}</span>
						<span className={styles.animeTitle}>{anime.title}</span>
					</Link>
				))}
			</div>
		</section>
	)
}
