import { Banner } from '@/components/Banner/Banner'
import Header from '@/components/Header'
import { API, APP_ROUTES } from '@/constants'
import { Anime } from '@/types'
import { monthsToSeconds } from '@/utils/convertTime'
import Head from 'next/head'
import RootLayout from '../layout'
import styles from './Anime.module.css'
import { AnimeAside } from './AnimeAside'
import { AnimeHeader } from './AnimeHeader'

interface Props {
  params: {
    animeId: string
  }
}

const getAnimeInfo = async (animeId: string) => {
  const animeInfoResponse = await fetch(`${API.routes.InfoAnime}/${animeId}`, {
    next: { revalidate: monthsToSeconds(1) },
  })

  const animeInfo: Anime = await animeInfoResponse.json()
  return animeInfo
}

export default async function AnimePage({ params }: Props) {
  const { animeId } = params
  const animeInfo = await getAnimeInfo(animeId)

  return (
    <RootLayout>
      <Head>
        <title>{animeInfo.title}</title>
        <link rel='preload' as='image' href={animeInfo.images?.bannerImages?.at(0)?.link ?? ''} />
        <link rel='preload' as='image' href={animeInfo.images?.coverImage ?? ''} />
      </Head>
      <Header pages={APP_ROUTES} />
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
    </RootLayout>
  )
}
