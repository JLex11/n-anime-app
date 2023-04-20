import { Banner } from '@/components/Banner/Banner'
import { API } from '@/constants'
import { getRatingAnimes } from '@/services/getAnimes'
import { Anime } from '@/types'
import { monthsToSeconds } from '@/utils/convertTime'
import styles from './Anime.module.css'
import { AnimeAside } from './AnimeAside'
import { AnimeHeader } from './AnimeHeader'

interface Props {
  params: {
    animeId: string
  }
}

export async function generateStaticParams() {
  const animes = await getRatingAnimes(20)
  return animes.map(anime => ({ slug: anime.animeId }))
}

const getAnimeInfo = async (animeId: string): Promise<Anime> => {
  const animeInfoResponse = await fetch(`${API.routes.InfoAnime}/${animeId}`, {
    next: { revalidate: monthsToSeconds(1) },
  })

  return animeInfoResponse.json()
}

export default async function AnimePage({ params: { animeId } }: Props) {
  const animeInfo = await getAnimeInfo(animeId)

  return (
    <>
      <Banner animes={[animeInfo]} />
      <main className={styles.main}>
        <AnimeAside
          image={animeInfo.images?.coverImage ?? ''}
          status={animeInfo?.status}
          title={animeInfo.title}
        />
        <section className={styles.section}>
          <AnimeHeader title={animeInfo.title} otherTitles={animeInfo.otherTitles} />
        </section>
      </main>
    </>
  )
}
