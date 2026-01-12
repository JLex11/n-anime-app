import { getRelatedAnimes } from '@/api/getRelatedAnimes'
import Link from 'next/link'
import styles from './RelatedAnimes.module.css'

interface Props {
	animeId: string
}

export async function RelatedAnimes({ animeId }: Props) {
	const relatedAnimes = await getRelatedAnimes(animeId)

	if (!relatedAnimes || relatedAnimes.length === 0) return null

	return (
		<section className={styles.section}>
			<h2 className={styles.title}>Relacionados</h2>
			<div className={styles.grid}>
				{relatedAnimes.map((anime) => (
					<Link
						key={anime.animeId}
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
