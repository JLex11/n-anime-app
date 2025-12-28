import { getContinueWatching } from '@/app/actions/watch-progress'
import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { WatchProgress } from '@/types'

export const metadata: Metadata = {
	title: 'Continuar Viendo - One Anime',
}

async function ContinueWatchingContent() {

	const user = await getUser()

	if (!user) {
		redirect('/login?redirect=/mi-lista')
	}

	const continueWatching: WatchProgress[] = await getContinueWatching()

	return (
		<>
			<h1>Continuar Viendo</h1>

			{continueWatching.length === 0 ? (
				<p style={{ marginTop: '2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
					No tienes episodios pendientes. ¡Empieza a ver animes!
				</p>
			) : (
				<div style={{ marginTop: '2rem' }}>
					{continueWatching.map((item) => {
						const progressPercent = item.duration_seconds
							? Math.round((item.progress_seconds / item.duration_seconds) * 100)
							: 0

						return (
							<Link
								key={item.id}
								href={`/animes/${item.anime_id}/${item.episode_id}`}
								style={{
									display: 'block',
									background: 'rgba(26, 26, 26, 0.9)',
									padding: '1.5rem',
									borderRadius: '8px',
									marginBottom: '1rem',
									textDecoration: 'none',
									color: 'inherit',
									transition: 'background 0.2s',
								}}
							>
								<h3 style={{ margin: '0 0 0.5rem 0' }}>
									{item.anime_id} - Episodio {item.episode_number}
								</h3>

								<div
									style={{
										background: 'rgba(255, 255, 255, 0.1)',
										height: '8px',
										borderRadius: '4px',
										overflow: 'hidden',
										marginTop: '1rem',
									}}
								>
									<div
										style={{
											background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
											height: '100%',
											width: `${progressPercent}%`,
											transition: 'width 0.3s',
										}}
									/>
								</div>

								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginTop: '0.5rem',
										color: 'rgba(255, 255, 255, 0.7)',
										fontSize: '0.875rem',
									}}
								>
									<span>Progreso: {progressPercent}%</span>
									<span>
										Última vez:{' '}
										{new Date(item.last_watched).toLocaleDateString('es-ES')}
									</span>
								</div>
							</Link>
						)
					})}
				</div>
			)}
		</>
	)
}

export default async function ContinueWatchingPage() {
	return (
		<main style={{ padding: '2rem' }}>
			<Suspense fallback={<div>Cargando...</div>}>
				<ContinueWatchingContent />
			</Suspense>
		</main>
	)
}
