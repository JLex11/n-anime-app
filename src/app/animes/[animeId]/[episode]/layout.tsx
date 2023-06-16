import { BreadCrumb } from '@/components/Common/BreadCrumb'
import { Aside } from '@/components/EpisodePage/Aside'
import { getAnime } from '@/services/getAnime'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import styles from '@/styles/Episode.module.css'
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

  const bgImage = animeInfo.images?.coverImage

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: toCap(animeInfo.title), path: `/animes/${animeInfo.animeId}` },
    { name: `Episodio ${episode}` },
  ]

  return (
    <main className={styles.main}>
      <BreadCrumb crumbs={crumbs} className={styles.breadcrumb} />
      <section className={styles.mainContent}>
        {children}
        <Aside animeInfo={animeInfo} episodes={episodes} />
      </section>
      {bgImage && <Image src={bgImage} alt={animeInfo.title} width={1000} height={900} className={styles.bgImage} priority={true} />}
    </main>
  )
}
