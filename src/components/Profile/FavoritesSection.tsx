import { getFavorites } from '@/app/actions/favorites'
import type { UserFavorite } from '@/types'
import Link from 'next/link'

export async function FavoritesSection() {
	const favorites: UserFavorite[] = await getFavorites()

	return (
		<section>
			<h2 style={{ marginBottom: '1.5rem' }}>Mis Favoritos</h2>

			{favorites.length === 0 ? (
				<p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
					No tienes animes favoritos aún.
				</p>
			) : (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
						gap: '1.5rem',
					}}
				>
					{favorites.map((fav) => (
						<Link
							key={fav.id}
							href={`/animes/${fav.anime_id}`}
							style={{
								background: 'rgba(26, 26, 26, 0.9)',
								borderRadius: '8px',
								overflow: 'hidden',
								textDecoration: 'none',
								color: 'inherit',
								transition: 'transform 0.2s',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{fav.anime_image && (
								<img
									src={fav.anime_image}
									alt={fav.anime_title}
									style={{
										width: '100%',
										height: '250px',
										objectFit: 'cover',
									}}
								/>
							)}
							<div style={{ padding: '1rem', flex: 1 }}>
								<h3 style={{ margin: 0, fontSize: '1rem', lineHeight: '1.4' }}>
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
