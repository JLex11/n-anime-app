import { BreadCrumb } from '@/components/Common/BreadCrumb'
import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { getAnime } from '@/services/getAnime'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { toCap } from '@/utils/textConverts'
import Image from 'next/image'

interface Props {
  children: React.ReactNode
  params: {
    animeId: string
    episode: number
  }
}

export default async function EpisodeLayout({ children, params }: Props) {
  const { animeId, episode } = params
  const animeInfo = await getAnime(animeId)
  const episodes = await getAnimeEpisodes(animeId)

  const bgImage = animeInfo.images?.carouselImages[0]?.link ?? animeInfo.images?.coverImage

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: toCap(animeInfo.title), path: `/animes/${animeInfo.animeId}` },
    { name: `Episodio ${episode}` },
  ]

  return (
    <main className={styles.main}>
      <div className={styles.breadcrumb}>
        <BreadCrumb crumbs={crumbs} />
      </div>
      <section className={styles.mainContent}>
        {children}
        <Aside animeInfo={animeInfo} episodes={episodes} currentEpisode={episode} />
      </section>
      {bgImage && <Image src={bgImage} alt={animeInfo.title} width={1000} height={900} className={styles.bgImage} />}
    </main>
  )
}
