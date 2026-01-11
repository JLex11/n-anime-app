import { getFavorites } from '@/app/actions/favorites'
import type { UserFavorite } from '@/types'
import Link from 'next/link'
import styles from './FavoritesSection.module.css'
import Image from 'next/image'

export async function FavoritesSection() {
	const favorites: UserFavorite[] = await getFavorites()

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Mis Favoritos</h2>

			{favorites.length === 0 ? (
				<p className={styles.emptyState}>
					No tienes animes favoritos aún.
				</p>
			) : (
				<div className={styles.grid}>
					{favorites.map((fav) => (
						<Link
							key={fav.id}
							href={`/animes/${fav.anime_id}`}
							className={styles.card}
						>
							{fav.anime_image && (
								<div className={styles.imageContainer}>
									<Image
										src={fav.anime_image}
										alt={fav.anime_title}
										className={styles.image}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
									<Image
										src={fav.anime_image}
										alt=""
										className={styles.glow}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										aria-hidden="true"
									/>
								</div>
							)}
							<div className={styles.content}>
								<h3 className={styles.animeTitle}>
									{fav.anime_title}
								</h3>
							</div>
						</Link>
					))}
				</div>
			)}
		</section>
	)
}
