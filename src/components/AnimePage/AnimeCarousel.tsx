import { getAnime } from '@/services/getAnime'
import { Suspense } from 'react'
import { Carousel } from '../Carousel'
import { CarouselLoader } from '../Carousel/CarouselHero'

export async function AnimeCarousel({ animeId }: {animeId: string}) {
  const anime = await getAnime(animeId)
  if (!anime) return null

  return (
    <Suspense fallback={<CarouselLoader />}>
      <Carousel animes={[anime]} />
    </Suspense>
  )
}