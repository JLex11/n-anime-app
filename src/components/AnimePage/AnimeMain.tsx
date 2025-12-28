import { getAnime } from '@/api/getAnime'
import { getUser } from '@/app/actions/auth'
import { isFavorite } from '@/app/actions/favorites'
import { SkeletonBase } from '@/components/Skeletons'
import { Suspense } from 'react'
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

export async function AnimeMain({ animeId }: Props) {
	const anime = await getAnime(animeId)
	if (!anime || !animeId || !anime.title) return null

	const user = await getUser()
	const userIsFavorite = user ? await isFavorite(animeId) : false

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
					isAuthenticated={!!user}
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
