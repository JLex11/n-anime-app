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

	const limitParam = searchParams.get('limit')
	const limit = useMemo(() => (limitParam ? Number(limitParam) : 5), [limitParam])

	useEffect(() => {
		// Primera carga cuando no hay episodios
		if (episodes.length === 0) {
			getAnimeEpisodes(animeId, 0, limit).then(newEpisodes => {
				setEpisodes(newEpisodes)
			})
			return
		}

		// Si el nuevo límite es mayor que los episodios ya cargados, cargamos más
		if (limit > episodes.length) {
			getAnimeEpisodes(animeId, episodes.length, limit - episodes.length).then(newEpisodes => {
				setEpisodes(prevEpisodes => [...prevEpisodes, ...newEpisodes])
			})
		}
	}, [animeId, limit, episodes.length])

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
