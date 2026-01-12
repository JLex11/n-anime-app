import { getAnime } from '@/api/getAnime'
import { SkeletonBase, RelatedAnimesSkeleton } from '@/components/Skeletons'
import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'
import styles from './Anime.module.css'
import { AnimeAside } from './AnimeAside'
import { AnimeHeader } from './AnimeHeader'
import { Description } from './DescriptionSection'
import { Episodes } from './EpisodesSection'
import { Genres } from './GenresSection'
import { CommentsSection } from '../Comments';
import { RelatedAnimes } from './RelatedAnimes'


interface Props {
	animeId: string
	favoriteButtonSlot: React.ReactNode
	commentsSlot?: React.ReactNode
}

export async function AnimeMain({ animeId, favoriteButtonSlot, commentsSlot }: Props) {
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
				{favoriteButtonSlot}
				<Description description={anime.description} />
				<Suspense fallback={<RelatedAnimesSkeleton />}>
					<RelatedAnimes animeId={animeId} />
				</Suspense>
				<Genres genres={anime.genres} />
				<Suspense
					fallback={
						<div className={styles.section}>
							<SkeletonBase height='10rem' />
						</div>
					}
				>
					<Episodes animeId={anime.animeId} fallbackImg={anime.images?.coverImage} animeTitle={anime.title} />
					{commentsSlot}
				</Suspense>
			</section>
		</main>
	)
}
