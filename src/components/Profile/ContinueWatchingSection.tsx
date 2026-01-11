import { getContinueWatching } from '@/app/actions/watch-progress'
import type { WatchProgress } from '@/types'
import Link from 'next/link'
import styles from './ContinueWatchingSection.module.css'

export async function ContinueWatchingSection() {
	const continueWatching: WatchProgress[] = await getContinueWatching()

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Continuar Viendo</h2>

			{continueWatching.length === 0 ? (
				<p className={styles.emptyState}>
					No tienes episodios pendientes.
				</p>
			) : (
				<div className={styles.grid}>
					{continueWatching.map((item) => {
						const progressPercent = item.duration_seconds
							? Math.round((item.progress_seconds / item.duration_seconds) * 100)
							: 0

						return (
							<Link
								key={item.id}
								href={`/animes/${item.anime_id}/${item.episode_number}?limit=5`}
								className={styles.card}
							>
								<div className={styles.cardHeader}>
									<h3 className={styles.animeTitle}>
										{item.anime_id}
									</h3>
									<span className={styles.episodeBadge}>
										Episodio {item.episode_number}
									</span>
								</div>

								<div className={styles.progressBarContainer}>
									<div
										className={styles.progressBar}
										style={{
											width: `${progressPercent}%`,
										}}
									/>
								</div>

								<div className={styles.cardFooter}>
									<span>{progressPercent}% completado</span>
									<span>
										{new Date(item.last_watched).toLocaleDateString('es-ES')}
									</span>
								</div>
							</Link>
						)
					})}
				</div>
			)}
		</section>
	)
}
