import { getAnime } from '@/api/getAnime'
import { getUser } from '@/app/actions/auth'
import { isFavorite } from '@/app/actions/favorites'
import { SkeletonBase } from '@/components/Skeletons'
import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'
import styles from './Anime.module.css'
import { AnimeAside } from './AnimeAside'
import { AnimeHeader } from './AnimeHeader'
import { Description } from './DescriptionSection'
import { Episodes } from './EpisodesSection'
import { Genres } from './GenresSection'
import { FavoriteButton } from './FavoriteButton'

interface Props {
	animeId: string
}

interface CachedAnimeContentProps {
	animeId: string
	userId: string | null
	userIsFavorite: boolean
}

// Componente cacheado que recibe datos dinámicos como props
async function CachedAnimeContent({ animeId, userId, userIsFavorite }: CachedAnimeContentProps) {
	'use cache'
	cacheLife('animeDetails')
	cacheTag(`anime-${animeId}`)

	const anime = await getAnime(animeId)
	if (!anime || !animeId || !anime.title) return null

	return (
		<main className={styles.main}>
			<AnimeAside anime={anime} />
			<section className={styles.content}>
				<AnimeHeader animeId={anime.animeId} title={anime.title} otherTitles={anime.otherTitles} />
				<FavoriteButton
					animeId={anime.animeId}
					animeTitle={anime.title}
					animeImage={anime.images?.coverImage || undefined}
					initialIsFavorite={userIsFavorite}
					isAuthenticated={!!userId}
				/>
				<Description description={anime.description} />
				<Genres genres={anime.genres} />
				<Suspense fallback={<div className={styles.section}><SkeletonBase height='10rem' /></div>}>
					<Episodes animeId={anime.animeId} fallbackImg={anime.images?.coverImage} animeTitle={anime.title} />
				</Suspense>
			</section>
		</main>
	)
}

// Wrapper que extrae datos dinámicos (cookies) y los pasa como props
export async function AnimeMain({ animeId }: Props) {
	// Extraer datos dinámicos FUERA de 'use cache'
	const user = await getUser()
	const userIsFavorite = user ? await isFavorite(animeId) : false

	// Pasar como props simples al componente cacheado
	return (
		<CachedAnimeContent
			animeId={animeId}
			userId={user?.id ?? null}
			userIsFavorite={userIsFavorite}
		/>
	)
}
