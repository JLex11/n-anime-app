import { BackgroundBlurredImage } from '@/components/BackgroundBlurredImage'
import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { VideoSection } from '@/components/VideoSection'
import { getAnime } from '@/services/getAnime'
import { getEpisodeSources } from '@/services/getEpisodeSources'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { toCap } from '@/utils/textConverts'
import clsx from 'clsx'
import { EpisodePageContextProvider } from './PageContext'

interface Props {
  params: { animeId: string; episode: string }
  searchParams: { limit: string }
}

export default async function EpisodePage({ params: { animeId, episode }, searchParams }: Props) {
  const [episodeSources, animeInfo] = await Promise.all([
    getEpisodeSources(`${animeId}-${episode}`),
    getAnime(animeId)
  ])

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
          searchParams={searchParams}
          animeId={animeId}
          animeTitle={animeInfo?.title ?? normalizeAnimeId(animeId)}
          animeImage={animeInfo?.images?.coverImage}
          currentEpisode={Number(episode)}
        />
      </section>
      <BackgroundBlurredImage
        src={
          animeInfo?.images?.carouselImages[0]?.link ||
          animeInfo?.images?.coverImage ||
          '/lights-blur.webp'
        }
        alt={normalizeAnimeId(animeId)}
      />
    </EpisodePageContextProvider>
  )
}

export async function generateMetadata({ params: { animeId, episode } }: Props) {
  return {
    title: `Episodio ${episode} de ${animeId.replace(/\-/g, ' ')}`
  }
}

export async function generateStaticParams() {
  const latestEpisodes = await getLatestEpisodes()
  return latestEpisodes.map(episode => ({
    animeId: episode.animeId,
    episode: episode.episode.toString()
  }))
}
