import { getAnime } from '@/api/getAnime'
import { getEpisodeSources } from '@/api/getEpisodeSources'
import { getLatestEpisodes } from '@/api/getLatestEpisodes'
import { BackgroundBlurredImage } from '@/components/BackgroundBlurredImage'
import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { VideoSection } from '@/components/VideoSection'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { toCap } from '@/utils/textConverts'
import clsx from 'clsx'
import { EpisodePageContextProvider } from './PageContext'

interface Props {
	params: Promise<{ animeId: string; episode: string }>
	searchParams: Promise<{ limit: string }>
}

export default async function EpisodePage({ params, searchParams }: Props) {
	const { animeId, episode } = await params

	const [episodeSources, animeInfo] = await Promise.all([getEpisodeSources(`${animeId}-${episode}`), getAnime(animeId)])

	const episodeWasFound = Boolean(episodeSources?.videos.SUB)
	const mainContentClass = clsx(styles.mainContent, !episodeWasFound && styles.episodeNotFound)

	return (
		<EpisodePageContextProvider>
			<section className={mainContentClass}>
				{episodeWasFound ? (
					<VideoSection
						iframesData={episodeSources?.videos}
						title={toCap(`episodio ${episode} de ${animeInfo?.title ?? normalizeAnimeId(animeId)}`)}
					/>
				) : (
					<h2>Episodio no encontrado.</h2>
				)}
				{!episodeWasFound && <hr />}
				<Aside
					searchParams={await searchParams}
					animeId={animeId}
					animeTitle={animeInfo?.title ?? normalizeAnimeId(animeId)}
					animeImage={animeInfo?.images?.coverImage}
					currentEpisode={Number(episode)}
				/>
			</section>
			<BackgroundBlurredImage
				src={animeInfo?.images?.carouselImages[0]?.link || animeInfo?.images?.coverImage || '/lights-blur.webp'}
				alt={normalizeAnimeId(animeId)}
			/>
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
