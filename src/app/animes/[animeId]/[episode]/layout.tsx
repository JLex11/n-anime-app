import { BreadCrumb } from '@/components/Common/BreadCrumb'
import styles from '@/components/EpisodePage/Episode.module.css'
import { getAnime } from '@/services/getAnime'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { toCap } from '@/utils/textConverts'
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

  const bgImage = animeInfo?.images?.carouselImages[0]?.link ?? animeInfo?.images?.coverImage

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: toCap(animeInfo?.title ?? normalizeAnimeId(animeId)), path: `/animes/${animeId}` },
    { name: `Episodio ${episode}` }
  ]

  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumb}>
        <BreadCrumb crumbs={crumbs} />
      </nav>
      {children}
      {bgImage && (
        <Image
          src={bgImage}
          alt={animeInfo?.title ?? normalizeAnimeId(animeId)}
          width={500}
          height={600}
          decoding='async'
          className={styles.bgImage}
        />
      )}
    </main>
  )
}
