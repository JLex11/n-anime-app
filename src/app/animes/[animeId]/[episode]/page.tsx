import { Suspense } from 'react'
import { getAnime } from '@/api/getAnime'
import { getEpisodeSources } from '@/api/getEpisodeSources'
import { getLatestEpisodes } from '@/api/getLatestEpisodes'
import { getWatchProgress } from '@/app/actions/watch-progress'
import { BackgroundBlurredImage } from '@/components/BackgroundBlurredImage'
import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { VideoSection } from '@/components/VideoSection'
import { EpisodeContentSkeleton } from '@/components/Skeletons'
import { WatchProgressTracker } from '@/components/EpisodePage/WatchProgressTracker'
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
	const episodeId = `${animeId}-${episode}`
	const [episodeSources, animeInfo, watchProgress] = await Promise.all([
		getEpisodeSources(episodeId),
		getAnime(animeId),
		getWatchProgress(animeId, episodeId)
	])

	const animeTitle = animeInfo?.title ?? normalizeAnimeId(animeId)
	const coverImage = animeInfo?.images?.coverImage
	const bannerImage = animeInfo?.images?.carouselImages?.[0]?.link || coverImage || blurImage
	const episodeWasFound = Boolean(episodeSources?.videos?.SUB)
	const mainContentClass = clsx(styles.mainContent, !episodeWasFound && styles.episodeNotFound)

	const formattedTitle = toCap(`episodio ${episode} de ${animeTitle}`)

	return (
		<>
			<WatchProgressTracker 
				animeId={animeId} 
				episodeNumber={Number(episode)} 
				initialProgressSeconds={watchProgress?.progress_seconds || 0}
			/>
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
			<Suspense fallback={<EpisodeContentSkeleton />}>
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
