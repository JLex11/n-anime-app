import styles from '@/components/AnimePage/Anime.module.css'
import { AnimeAside } from '@/components/AnimePage/AnimeAside'
import { AnimeHeader } from '@/components/AnimePage/AnimeHeader'
import { Description } from '@/components/AnimePage/Description'
import { Episodes } from '@/components/AnimePage/Episodes'
import { Genres } from '@/components/AnimePage/Genres'
import { Carousel } from '@/components/Carousel'
import { getAnime } from '@/services/getAnime'
import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Anime } from '@/types'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    animeId: string
  }
  searchParams: {
    limit: string
  }
}

export default async function AnimePage({ params: { animeId }, searchParams: { limit } }: Props) {
  const anime = await getAnime(animeId)
  if (!anime) redirect('/404')

  return (
    <>
      <Carousel animes={[anime]} />
      <main className={styles.main}>
        <AnimeAside image={anime.images?.coverImage ?? ''} status={anime.status} title={anime.title} />
        <section className={styles.content}>
          <AnimeHeader title={anime.title} otherTitles={anime.otherTitles} />
          <Description description={anime.description} />
          <Genres genres={anime.genres} />
          <Episodes limit={limit} animeId={anime.animeId} fallbackImg={anime.images?.coverImage} animeTitle={anime.title} />
        </section>
      </main>
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { animeId } = params
  const anime = await getAnime(animeId)

  if (!anime) return {}

  const title = anime.title ?? 'Anime'
  const keywords = `${anime.genres?.join(', ')} ${anime.title} ${anime.otherTitles?.join(', ')}`

  return {
    title,
    description: anime.description,
    keywords
  }
}

export async function generateStaticParams(): Promise<{ animeId: string }[]> {
  const animesPromises = [getRatingAnimes(25), getLatestEpisodes(), getBroadcastAnimes()]
  const animesIdSettled = await Promise.allSettled(
    animesPromises.map(animePromise => animePromise.then(anime => anime.map(({ animeId }) => animeId)))
  )
  const filteredAnimesId = animesIdSettled.filter(
    (animesId): animesId is PromiseFulfilledResult<Anime['animeId'][]> => animesId.status === 'fulfilled'
  )
  const mappedAnimesId = filteredAnimesId.flatMap(filteredAnimesId => filteredAnimesId.value.map(animeId => ({ animeId })))
  return mappedAnimesId
}
