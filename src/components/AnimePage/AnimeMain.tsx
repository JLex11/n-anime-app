import { getAnime } from '@/api/getAnime'
import { Suspense } from 'react'
import styles from './Anime.module.css'
import { AnimeAside } from './AnimeAside'
import { AnimeHeader } from './AnimeHeader'
import { Description } from './DescriptionSection'
import { Episodes } from './EpisodesSection'
import { Genres } from './GenresSection'

interface Props {
	animeId: string
}

export async function AnimeMain({ animeId }: Props) {
	const anime = await getAnime(animeId)
	if (!anime || !animeId || !anime.title) return null

	return (
		<main className={styles.main}>
			<AnimeAside anime={anime} />
			<section className={styles.content}>
				<AnimeHeader animeId={anime.animeId} title={anime.title} otherTitles={anime.otherTitles} />
				<Description description={anime.description} />
				<Genres genres={anime.genres} />
				<Suspense>
					<Episodes animeId={anime.animeId} fallbackImg={anime.images?.coverImage} animeTitle={anime.title} />
				</Suspense>
			</section>
		</main>
	)
}
