'use client'

import { getAnimeEpisodes } from '@/api/getAnimeEpisodes'
import { EpisodeList, EpisodeListSkeleton } from '@/components/EpisodeList/EpisodeList'
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

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Episodios</h2>
			{episodes.length > 0 ? (
				<EpisodeList
					pathname={`${animeId}/`}
					animeTitle={animeTitle}
					episodes={episodes}
					limit={limit}
					animeImage={fallbackImg}
				/>
			) : (
				<EpisodeListSkeleton />
			)}
		</section>
	)
}
