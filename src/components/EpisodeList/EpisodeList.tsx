'use client'

import { getAnimeEpisodes } from '@/api/getAnimeEpisodes'
import type { Episode } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import { ButtonMore } from './ButtonMore'
import styles from './EpisodeList.module.css'
import { ListItem } from './ListItem'

interface Props {
	animeId: string
	initialEpisodes: Episode[]
	animeImage?: string | null
	animeTitle?: string
	currentEpisode?: number
	pathname?: string
}

export function EpisodeList({ animeId, initialEpisodes, currentEpisode, animeImage, animeTitle, pathname = '' }: Props) {
	const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes)
	const [isPending, startTransition] = useTransition()
	const searchParams = useSearchParams()

	const limitParam = searchParams.get('limit')
	const limit = useMemo(() => Number(limitParam) || 5, [limitParam])

	const loadMoreEpisodes = () => {
		getAnimeEpisodes(animeId, limit, limit + 5).then(newEpisodes => {
			startTransition(() => {
				setEpisodes(prevEpisodes => noDups([...prevEpisodes, ...newEpisodes]))
				window.history.replaceState({}, '', `?limit=${limit + 5}`)
			})
		})
	}

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
			{!firstEpisodeInList && <ButtonMore handleClick={loadMoreEpisodes} isPending={isPending} />}
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

function noDups(episodes: Episode[]): Episode[] {
	const seen = new Set()
	return episodes.filter(episode => {
		const id = episode.episodeId || episode.title
		if (seen.has(id)) return false
		seen.add(id)
		return true
	})
}
