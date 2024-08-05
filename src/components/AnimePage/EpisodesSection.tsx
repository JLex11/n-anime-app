'use client'

import { EpisodeList, EpisodeListSkeleton } from '@/components/EpisodeList/EpisodeList'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import type { Episode } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './Anime.module.css'

interface EpisodesProps {
	animeId: string
	animeTitle: string
	fallbackImg?: string | null
}

export function Episodes({ animeId, animeTitle, fallbackImg }: EpisodesProps) {
	const [episodes, setEpisodes] = useState<Episode[]>([])
	const searchParams = useSearchParams()
	const limit = useMemo(() => Number(searchParams.get('limit')) || 5, [searchParams])

	useEffect(() => {
		getAnimeEpisodes(animeId, 0, limit).then(setEpisodes)
	}, [animeId, limit])

	if (episodes.length === 0) return null

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Episodios</h2>
			<EpisodeList
				animeId={animeId}
				animeTitle={animeTitle}
				episodes={episodes}
				limit={limit}
				animeImage={fallbackImg}
			/>
		</section>
	)
}

export function EpisodesSkeleton() {
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Episodios</h2>
			<EpisodeListSkeleton />
		</section>
	)
}
