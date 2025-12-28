import { getFavorites } from '@/app/actions/favorites'
import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { UserFavorite } from '@/types'

export const metadata: Metadata = {
	title: 'Mis Favoritos - One Anime',
}

async function FavoritesContent() {

	const user = await getUser()

	if (!user) {
		redirect('/login?redirect=/favoritos')
	}

	const favorites: UserFavorite[] = await getFavorites()

	return (
		<>
			<h1>Mis Favoritos</h1>

			{favorites.length === 0 ? (
				<p style={{ marginTop: '2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
					No tienes animes favoritos aún. ¡Empieza a agregar tus animes
					favoritos!
				</p>
			) : (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
						gap: '1.5rem',
						marginTop: '2rem',
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
							}}
						>
							{fav.anime_image && (
								<img
									src={fav.anime_image}
									alt={fav.anime_title}
									style={{
										width: '100%',
										height: '300px',
										objectFit: 'cover',
									}}
								/>
							)}
							<div style={{ padding: '1rem' }}>
								<h3 style={{ margin: 0, fontSize: '1rem' }}>
									{fav.anime_title}
								</h3>
								<p
									style={{
										margin: '0.5rem 0 0 0',
										fontSize: '0.875rem',
										color: 'rgba(255, 255, 255, 0.6)',
									}}
								>
									Agregado el{' '}
									{new Date(fav.created_at).toLocaleDateString('es-ES')}
								</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</>
	)
}

export default async function FavoritesPage() {
	return (
		<main style={{ padding: '2rem' }}>
			<Suspense fallback={<div>Cargando favoritos...</div>}>
				<FavoritesContent />
			</Suspense>
		</main>
	)
}
