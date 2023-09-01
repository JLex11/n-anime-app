import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { VideoSection } from '@/components/EpisodePage/VideoSection'
import { getAnime } from '@/services/getAnime'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { getEpisodeSources } from '@/services/getEpisodeSources'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { toCap } from '@/utils/textConverts'
import clsx from 'clsx'
import { EpisodePageContextProvider } from './PageContext'

interface Props {
  params: {
    animeId: string
    episode: string
  }
  searchParams: {
    limit: string
  }
}

export default async function EpisodePage({ params, searchParams }: Props) {
  const { animeId, episode } = params
  const { limit } = searchParams

  const episodeSources = await getEpisodeSources(`${animeId}-${episode}`)
  const animeInfo = await getAnime(animeId)
  const animeEpisodes = await getAnimeEpisodes(animeId, 0, Number(limit) || 5)

  const episodeWasFound = Boolean(episodeSources?.videos.SUB)
  const mainContentClass = clsx(styles.mainContent, !episodeWasFound && styles.episodeNotFound)

  return (
    <EpisodePageContextProvider>
      <section className={mainContentClass}>
        {episodeWasFound ? (
          <VideoSection
            iframesData={episodeSources!.videos}
            title={toCap(`episodio ${episode} de ${animeInfo?.title ?? animeId.replaceAll('-', ' ')}`)}
          />
        ) : (
          <h2>Episodio no encontrado.</h2>
        )}
        {!episodeWasFound && <hr />}
        <Aside
          limit={limit}
          animeId={animeId}
          animeTitle={animeInfo?.title ?? animeId.replaceAll('-', ' ')}
          animeImage={animeInfo?.images?.coverImage}
          episodes={animeEpisodes}
          currentEpisode={Number(episode)}
        />
      </section>
    </EpisodePageContextProvider>
  )
}

export async function generateMetadata({ params }: Props) {
  const { animeId, episode } = params

  return {
    title: `Episodio ${episode} de ${animeId.replace(/\-/g, ' ')}`
  }
}

export async function generateStaticParams() {
  const latestEpisodes = await getLatestEpisodes()
  return latestEpisodes.map(episode => ({ animeId: episode.animeId, episode: episode.episode.toString() }))
}
