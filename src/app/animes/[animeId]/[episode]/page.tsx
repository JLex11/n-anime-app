import { Suspense } from 'react'
import { getAnime } from '@/api/getAnime'
import { getEpisodeSources } from '@/api/getEpisodeSources'
import { getLatestEpisodes } from '@/api/getLatestEpisodes'
import { getWatchProgress } from '@/app/actions/watch-progress'
import { BackgroundBlurredImage } from '@/components/BackgroundBlurredImage'
import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { VideoSection } from '@/components/VideoSection'
import { CommentsSection, CommentsSkeleton } from '@/components/Comments'
import { EpisodeAsideSkeleton, EpisodeContentSkeleton, EpisodeVideoSkeleton } from '@/components/Skeletons'
import { WatchProgressTracker } from '@/components/EpisodePage/WatchProgressTracker'
import blurImage from '@/public/lights-blur.webp'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { toCap } from '@/utils/textConverts'
import { EpisodePageContextProvider } from './PageContext'

interface Props {
	params: Promise<{ animeId: string; episode: string }>
	searchParams: Promise<{ limit: string }>
}

interface EpisodeContentProps {
	animeId: string
	episode: string
	searchParams: Promise<{ limit: string }>
}

interface EpisodeVideoContentProps {
	animeId: string
	episode: string
	episodeSourcesPromise: ReturnType<typeof getEpisodeSources>
	animeInfoPromise: ReturnType<typeof getAnime>
}

async function EpisodeVideoContent({
	animeId,
	episode,
	episodeSourcesPromise,
	animeInfoPromise,
}: EpisodeVideoContentProps) {
	const [episodeSources, animeInfo] = await Promise.all([episodeSourcesPromise, animeInfoPromise])
	const animeTitle = animeInfo?.title ?? normalizeAnimeId(animeId)
	const episodeWasFound = Boolean(episodeSources?.videos?.SUB)
	const formattedTitle = toCap(`episodio ${episode} de ${animeTitle}`)

	return (
		<>
			{episodeWasFound ? (
				<VideoSection iframesData={episodeSources.videos} title={formattedTitle} />
			) : (
				<h2>Episodio no encontrado.</h2>
			)}
			{!episodeWasFound && <hr />}
		</>
	)
}

async function EpisodeWatchProgress({
	animeId,
	episodeNumber,
}: {
	animeId: string
	episodeNumber: number
}) {
	const watchProgress = await getWatchProgress(animeId, `${animeId}-${episodeNumber}`)

	return (
		<WatchProgressTracker
			animeId={animeId}
			episodeNumber={episodeNumber}
			initialProgressSeconds={watchProgress?.progress_seconds || 0}
		/>
	)
}

async function EpisodeAsideContent({
	animeId,
	episode,
	searchParams,
	animeInfoPromise,
}: EpisodeContentProps & { animeInfoPromise: ReturnType<typeof getAnime> }) {
	const [animeInfo, resolvedSearchParams] = await Promise.all([animeInfoPromise, searchParams])

	return (
		<Aside
			searchParams={resolvedSearchParams}
			animeId={animeId}
			animeTitle={animeInfo?.title ?? normalizeAnimeId(animeId)}
			animeImage={animeInfo?.images?.coverImage}
			currentEpisode={Number(episode)}
		/>
	)
}

async function EpisodeBackground({ animeId, animeInfoPromise }: { animeId: string; animeInfoPromise: ReturnType<typeof getAnime> }) {
	const animeInfo = await animeInfoPromise
	const coverImage = animeInfo?.images?.coverImage
	const bannerImage = animeInfo?.images?.carouselImages?.[0]?.link || coverImage || blurImage

	return <BackgroundBlurredImage src={bannerImage} alt={normalizeAnimeId(animeId)} />
}

function EpisodeContent({ animeId, episode, searchParams }: EpisodeContentProps) {
	const episodeId = `${animeId}-${episode}`
	const episodeSourcesPromise = getEpisodeSources(episodeId)
	const animeInfoPromise = getAnime(animeId)

	return (
		<>
			<Suspense fallback={null}>
				<EpisodeWatchProgress animeId={animeId} episodeNumber={Number(episode)} />
			</Suspense>
			<section className={styles.mainContent}>
				<Suspense fallback={<EpisodeVideoSkeleton />}>
					<EpisodeVideoContent
						animeId={animeId}
						episode={episode}
						episodeSourcesPromise={episodeSourcesPromise}
						animeInfoPromise={animeInfoPromise}
					/>
				</Suspense>
				<Suspense fallback={<EpisodeAsideSkeleton />}>
					<EpisodeAsideContent
						animeId={animeId}
						episode={episode}
						searchParams={searchParams}
						animeInfoPromise={animeInfoPromise}
					/>
				</Suspense>
			</section>
			<Suspense fallback={<CommentsSkeleton />}>
				<CommentsSection animeId={animeId} episodeId={episodeId} />
			</Suspense>
			<Suspense fallback={null}>
				<EpisodeBackground animeId={animeId} animeInfoPromise={animeInfoPromise} />
			</Suspense>
		</>
	)
}

async function EpisodeContentWithParams({ params, searchParams }: Props) {
	const { animeId, episode } = await params

	return <EpisodeContent animeId={animeId} episode={episode} searchParams={searchParams} />
}

export default function EpisodePage({ params, searchParams }: Props) {
	return (
		<EpisodePageContextProvider>
			<Suspense fallback={<EpisodeContentSkeleton />}>
				<EpisodeContentWithParams params={params} searchParams={searchParams} />
			</Suspense>
		</EpisodePageContextProvider>
	)
}

export async function generateMetadata({ params }: Props) {
	const { animeId, episode } = await params

	return {
		title: `Episodio ${episode} de ${animeId.replace(/-/g, ' ')}`,
	}
}

export async function generateStaticParams() {
	try {
		const latestEpisodes = await getLatestEpisodes()
		return latestEpisodes.map(episode => ({
			animeId: episode.animeId,
			episode: episode.episode.toString(),
		}))
	} catch (error) {
		console.warn('Skipping episode static params generation:', error)
		return []
	}
}
