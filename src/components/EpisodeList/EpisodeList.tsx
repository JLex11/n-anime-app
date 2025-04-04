import type { Episode } from '@/types'
import { ButtonMore } from './ButtonMore'
import styles from './EpisodeList.module.css'
import { ListItem } from './ListItem'

interface Props {
	limit: string | number
	episodes: Episode[]
	animeImage?: string | null
	animeTitle?: string
	currentEpisode?: number
	pathname?: string
}

export function EpisodeList({ limit, episodes, currentEpisode, animeImage, animeTitle, pathname = '' }: Props) {
	const createItemLink = (episode: Episode) => `${pathname}${episode.episode}${limit ? `?limit=${limit}` : ''}`
	const firstEpisodeInList = episodes.some(({ episode }) => episode === 1)

	return (
		<ul className={styles.episodeList}>
			{episodes.map(episode => (
				<ListItem
					key={episode.episodeId}
					link={createItemLink(episode)}
					episode={episode}
					isSeeing={Number(currentEpisode) === Number(episode.episode)}
					animeImage={animeImage}
					animeTitle={animeTitle}
				/>
			))}
			{!firstEpisodeInList && <ButtonMore limit={episodes.length + 5} />}
		</ul>
	)
}

export function EpisodeListSkeleton() {
	return (
		<ul className={styles.episodeList}>
			{Array.from({ length: 5 }).map(() => (
				<li key={Math.random()}>
					<span className={styles.listItem} />
				</li>
			))}
		</ul>
	)
}
