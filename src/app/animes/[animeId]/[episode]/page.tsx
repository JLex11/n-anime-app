import { Suspense } from 'react'
import { getAnime } from '@/api/getAnime'
import { getEpisodeSources } from '@/api/getEpisodeSources'
import { getLatestEpisodes } from '@/api/getLatestEpisodes'
import { BackgroundBlurredImage } from '@/components/BackgroundBlurredImage'
import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { VideoSection } from '@/components/VideoSection'
import blurImage from '@/public/lights-blur.webp'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { toCap } from '@/utils/textConverts'
import clsx from 'clsx'
import { EpisodePageContextProvider } from './PageContext'

interface Props {
	params: Promise<{ animeId: string; episode: string }>
	searchParams: Promise<{ limit: string }>
}

async function EpisodeContent({ animeId, episode, searchParams }: { animeId: string; episode: string; searchParams: Promise<{ limit: string }> }) {
	const [episodeSources, animeInfo] = await Promise.all([getEpisodeSources(`${animeId}-${episode}`), getAnime(animeId)])

	const animeTitle = animeInfo?.title ?? normalizeAnimeId(animeId)
	const coverImage = animeInfo?.images?.coverImage
	const bannerImage = animeInfo?.images?.carouselImages?.[0]?.link || coverImage || blurImage
	const episodeWasFound = Boolean(episodeSources?.videos?.SUB)
	const mainContentClass = clsx(styles.mainContent, !episodeWasFound && styles.episodeNotFound)

	const formattedTitle = toCap(`episodio ${episode} de ${animeTitle}`)

	return (
		<>
			<section className={mainContentClass}>
				{episodeWasFound ? (
					<VideoSection iframesData={episodeSources?.videos} title={formattedTitle} />
				) : (
					<h2>Episodio no encontrado.</h2>
				)}
				{!episodeWasFound && <hr />}
				<Aside
					searchParams={await searchParams}
					animeId={animeId}
					animeTitle={animeTitle}
					animeImage={coverImage}
					currentEpisode={Number(episode)}
				/>
			</section>
			<BackgroundBlurredImage src={bannerImage} alt={normalizeAnimeId(animeId)} />
		</>
	)
}

export default async function EpisodePage({ params, searchParams }: Props) {
	const { animeId, episode } = await params

	return (
		<EpisodePageContextProvider>
			<Suspense fallback={<div className={styles.mainContent}>Cargando episodio...</div>}>
				<EpisodeContent animeId={animeId} episode={episode} searchParams={searchParams} />
			</Suspense>
		</EpisodePageContextProvider>
	)
}

export async function generateMetadata({ params }: Props) {
	const { animeId, episode } = await params

	return {
		title: `Episodio ${episode} de ${animeId.replace(/\-/g, ' ')}`,
	}
}

export async function generateStaticParams() {
	const latestEpisodes = await getLatestEpisodes()
	return latestEpisodes.map(episode => ({
		animeId: episode.animeId,
		episode: episode.episode.toString(),
	}))
}
