import styles from '@/components/AnimePage/Anime.module.css'
import { AnimeAside } from '@/components/AnimePage/AnimeAside'
import { AnimeHeader } from '@/components/AnimePage/AnimeHeader'
import { Description } from '@/components/AnimePage/Description'
import { Episodes } from '@/components/AnimePage/Episodes'
import { Genres } from '@/components/AnimePage/Genres'
import { CarouselHero } from '@/components/Carousel'
import { getAnime } from '@/services/getAnime'
import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { getRatingAnimes } from '@/services/getRatingAnimes'
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
      <CarouselHero animes={[anime]} />
      <main className={styles.main}>
        <AnimeAside image={anime.images?.coverImage ?? ''} status={anime.status} title={anime.title} />
        <section className={styles.content}>
          <AnimeHeader title={anime.title} otherTitles={anime.otherTitles} />
          <Description description={anime.description} />
          <Genres genres={anime.genres} />
          <Episodes limit={limit} animeId={animeId} fallbackImg={anime.images?.coverImage} animeTitle={anime.title} />
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
    keywords,
  }
}

export async function generateStaticParams() {
  const animes = await getRatingAnimes(20)
  const animesFromEpisodes = await getLatestEpisodes()
  const animesFromBroadcast = await getBroadcastAnimes()

  return [...animes, ...animesFromEpisodes, ...animesFromBroadcast].map(anime => ({ animeId: anime.animeId }))
}
