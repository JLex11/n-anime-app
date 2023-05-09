import { BreadCrumb } from '@/components/Common/BreadCrumb'
import { Iframe } from '@/components/EpisodePage/Iframe'
import { IframeToggle } from '@/components/EpisodePage/IframeToggle'
import { getEpisodeSources } from '@/services/getEpisodeSources'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import styles from '@/styles/Episode.module.css'
import { toCap } from '@/utils/textConverts'

interface Props {
  params: {
    episodeId: string
  }
}

export async function generateMetadata({ params }: Props) {
  const { episodeId } = params

  return {
    title: toCap(episodeId).replace(/\-/g, ' '),
  }
}

export async function generateStaticParams() {
  const latestEpisodes = await getLatestEpisodes()
  return latestEpisodes.map(episode => ({ episodeId: episode.episodeId }))
}

export default async function AnimePage({ params }: Props) {
  const { episodeId } = params
  const episodeSources = await getEpisodeSources(episodeId)

  const iframeId = 'episode_iframe'

  const src = episodeSources.videos.SUB?.[0].code
  const title = episodeSources.videos.SUB?.[0].title

  const crumbs = [{ name: 'Episodes', path: `/episodes` }, { name: `Episode ${episodeId}` }]

  return (
    <main className={styles.main}>
      <BreadCrumb crumbs={crumbs} />
      <h1>{toCap(episodeId).replace(/\-/g, ' ')}</h1>
      <div className={styles.videoContainer}>
        <IframeToggle iframesData={episodeSources.videos.SUB || episodeSources.videos.DUB || []} iframeId={iframeId} />
        {src && <Iframe src={src} title={title} id={iframeId} />}
      </div>
    </main>
  )
}
