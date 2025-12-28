import { getAnimeEpisodes } from '@/api/getAnimeEpisodes'
import { EpisodeList, EpisodeListSkeleton } from '@/components/EpisodeList/EpisodeList'
import clsx from 'clsx'
import styles from './Anime.module.css'
import { cacheLife, cacheTag } from 'next/cache'

interface EpisodesProps {
	animeId: string
	animeTitle: string
	fallbackImg?: string | null
}

export async function Episodes({ animeId, animeTitle, fallbackImg }: EpisodesProps) {
	'use cache'
	cacheLife('episodes')
	cacheTag(`anime-${animeId}-episodes`)

	const episodes = await getAnimeEpisodes(animeId, 0, 5)

	return (
		<section className={clsx(styles.section, styles.episodesSection)}>
			<h2 className={styles.sectionTitle}>Episodios</h2>
			{episodes.length > 0 ? (
				<EpisodeList
					pathname={`${animeId}/`}
					animeId={animeId}
					animeTitle={animeTitle}
					initialEpisodes={episodes}
					animeImage={fallbackImg}
				/>
			) : (
				<EpisodeListSkeleton />
			)}
		</section>
	)
}
