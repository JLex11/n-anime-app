import { VideoSection } from '@/components/EpisodePage/VideoSection'
import { getAnime } from '@/services/getAnime'
import { getEpisodeSources } from '@/services/getEpisodeSources'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { toCap } from '@/utils/textConverts'

interface Props {
  params: {
    animeId: string
    episode: number
  }
}

export default async function EpisodePage({ params }: Props) {
  const { animeId, episode } = params
  const episodeSources = await getEpisodeSources(`${animeId}-${episode}`)
  const animeInfo = await getAnime(animeId)

  if (!(episodeSources?.videos.SUB || episodeSources?.videos.SUB)) return <h2>Episodio no encontrado.</h2>

  return (
    <VideoSection
      iframesData={episodeSources.videos}
      title={toCap(`episodio ${episode} de ${animeInfo?.title ?? animeId.replaceAll('-', ' ')}`)}
    />
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
