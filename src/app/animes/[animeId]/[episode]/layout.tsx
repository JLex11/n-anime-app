import { BreadCrumb } from '@/components/Common/BreadCrumb'
import { Aside } from '@/components/EpisodePage/Aside'
import styles from '@/components/EpisodePage/Episode.module.css'
import { getAnime } from '@/services/getAnime'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { toCap } from '@/utils/textConverts'
import clsx from 'clsx'
import Image from 'next/image'

interface Props {
  children: React.ReactNode
  params: {
    animeId: string
    episode: string
  }
}

export default async function EpisodeLayout({ children, params }: Props) {
  const { animeId, episode } = params
  const animeInfo = await getAnime(animeId)
  const animeEpisodes = await getAnimeEpisodes(animeId, 0, 5)

  const bgImage = animeInfo?.images?.carouselImages[0]?.link ?? animeInfo?.images?.coverImage

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: toCap(animeInfo?.title ?? animeId.replaceAll('-', ' ')), path: `/animes/${animeId}` },
    { name: `Episodio ${episode}` }
  ]

  const episodeWasFound = animeEpisodes.some(animeEpisode => animeEpisode.episode === Number(episode))
  const mainContentClass = clsx(styles.mainContent, !episodeWasFound && styles.episodeNotFound)

  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumb}>
        <BreadCrumb crumbs={crumbs} />
      </nav>
      <section className={mainContentClass}>
        {children}
        {!episodeWasFound && <hr />}
        <Aside
          animeId={animeId}
          animeTitle={animeInfo?.title ?? animeId.replaceAll('-', ' ')}
          animeImage={animeInfo?.images?.coverImage}
          episodes={animeEpisodes}
          currentEpisode={Number(episode)}
        />
      </section>
      {bgImage && (
        <Image
          src={bgImage}
          alt={animeInfo?.title ?? animeId.replaceAll('-', ' ')}
          width={500}
          height={600}
          decoding='async'
          className={styles.bgImage}
        />
      )}
    </main>
  )
}
