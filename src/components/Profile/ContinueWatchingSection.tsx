import { getContinueWatching } from '@/app/actions/watch-progress'
import type { WatchProgress } from '@/types'
import Link from 'next/link'

export async function ContinueWatchingSection() {
	const continueWatching: WatchProgress[] = await getContinueWatching()

	return (
		<section>
			<h2 style={{ marginBottom: '1.5rem' }}>Continuar Viendo</h2>

			{continueWatching.length === 0 ? (
				<p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
					No tienes episodios pendientes.
				</p>
			) : (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 450px), 1fr))',
						gap: '1rem',
					}}
				>
					{continueWatching.map((item) => {
						const progressPercent = item.duration_seconds
							? Math.round((item.progress_seconds / item.duration_seconds) * 100)
							: 0

						return (
							<Link
								key={item.id}
								href={`/animes/${item.anime_id}/${item.episode_number}?limit=5`}
								style={{
									display: 'block',
									background: 'rgba(26, 26, 26, 0.9)',
									padding: '1.5rem',
									borderRadius: '8px',
									textDecoration: 'none',
									color: 'inherit',
									transition: 'background 0.2s',
								}}
							>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
									<h3 style={{ margin: 0, fontSize: '1.1rem' }}>
										{item.anime_id}
									</h3>
									<span style={{ 
										background: 'rgba(255, 255, 255, 0.1)', 
										padding: '0.2rem 0.6rem', 
										borderRadius: '4px',
										fontSize: '0.9rem' 
									}}>
										Episodio {item.episode_number}
									</span>
								</div>

								<div
									style={{
										background: 'rgba(255, 255, 255, 0.1)',
										height: '6px',
										borderRadius: '3px',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
											height: '100%',
											width: `${progressPercent}%`,
										}}
									/>
								</div>

								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginTop: '0.5rem',
										color: 'rgba(255, 255, 255, 0.5)',
										fontSize: '0.8rem',
									}}
								>
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
