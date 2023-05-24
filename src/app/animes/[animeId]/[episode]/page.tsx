import { BreadCrumb } from '@/components/Common/BreadCrumb'
import { Iframe } from '@/components/EpisodePage/Iframe'
import { IframeToggle } from '@/components/EpisodePage/IframeToggle'
import { getEpisodeSources } from '@/services/getEpisodeSources'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import styles from '@/styles/Episode.module.css'
import { toCap } from '@/utils/textConverts'

interface Props {
  params: {
    animeId: string
    episode: number
  }
}

export async function generateMetadata({ params }: Props) {
  const { animeId, episode } = params

  return {
    title: toCap(`Episode ${episode} - ${toCap(animeId.replace(/\-/g, ' '))}`),
  }
}

export async function generateStaticParams() {
  const latestEpisodes = await getLatestEpisodes()
  return latestEpisodes.map(episode => ({ animeId: episode.animeId, episode: episode.episode.toString() }))
}

export default async function AnimePage({ params }: Props) {
  const { animeId, episode } = params
  const episodeSources = await getEpisodeSources(`${animeId}-${episode}`)

  const iframeId = 'episode_iframe'

  const src = episodeSources.videos.SUB?.[0].code
  const title = episodeSources.videos.SUB?.[0].title

  const crumbs = [{ name: toCap(animeId.replaceAll('-', ' ')), path: `/animes/${animeId}` }, { name: `Episode ${episode}` }]

  return (
    <main className={styles.main}>
      <BreadCrumb crumbs={crumbs} />
      <h1>{toCap(`${episode} - ${animeId}`).replace(/\-/g, ' ')}</h1>
      <div className={styles.videoContainer}>
        <IframeToggle iframesData={episodeSources.videos.SUB || episodeSources.videos.DUB || []} iframeId={iframeId} />
        {src && <Iframe src={src} title={title} id={iframeId} />}
      </div>
    </main>
  )
}
