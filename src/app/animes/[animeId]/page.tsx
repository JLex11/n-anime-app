import { AnimeAside } from '@/components/AnimePage/AnimeAside'
import { AnimeHeader } from '@/components/AnimePage/AnimeHeader'
import { Description } from '@/components/AnimePage/Description'
import { Episodes } from '@/components/AnimePage/Episodes'
import { Genres } from '@/components/AnimePage/Genres'
import { CarouselHero } from '@/components/CarouselHero/Carousel'
import { getAnime } from '@/services/getAnime'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import styles from '@/styles/Anime.module.css'
import { Metadata } from 'next'

interface Props {
  params: {
    animeId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { animeId } = params
  const anime = await getAnime(animeId)
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

export default async function AnimePage({ params: { animeId } }: Props) {
  const anime = await getAnime(animeId)
  const episodes = await getAnimeEpisodes(animeId)

  return (
    <>
      <CarouselHero animes={[anime]} />
      <main className={styles.main}>
        <AnimeAside image={anime.images?.coverImage ?? ''} status={anime.status} title={anime.title} />
        <div className={styles.content}>
          <AnimeHeader title={anime.title} otherTitles={anime.otherTitles} />
          <Description description={anime.description} />
          {anime.genres?.length && <Genres genres={anime.genres} />}
          {episodes?.length && <Episodes episodes={episodes} animeTitle={anime.title} />}
        </div>
      </main>
    </>
  )
}
