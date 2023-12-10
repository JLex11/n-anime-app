import styles from '@/components/AnimePage/Anime.module.css'
import { AnimeAside } from '@/components/AnimePage/AnimeAside'
import { AnimeCarousel } from "@/components/AnimePage/AnimeCarousel"
import { AnimeContent } from "@/components/AnimePage/AnimeContent"
import { CarouselLoader } from "@/components/Carousel/CarouselHero"
import { getAnime } from '@/services/getAnime'
import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Anime } from '@/types'
import { Metadata } from 'next'
import { Suspense } from "react"

interface Props {
  params: {
    animeId: string
  }
  searchParams: {
    limit: string
  }
}

export default async function AnimePage({
	params: { animeId },
	searchParams: { limit },
}: Props) {
	return (
		<>
			<Suspense fallback={<CarouselLoader />}>
				<AnimeCarousel animeId={animeId} />
			</Suspense>
			<main className={styles.main}>
				<Suspense fallback={<span>Loading...</span>}>
					<AnimeAside animeId={animeId} />
					<AnimeContent animeId={animeId} limit={limit} />
				</Suspense>
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
