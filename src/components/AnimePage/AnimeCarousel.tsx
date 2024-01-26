import { getAnime } from '@/services/getAnime'
import { Carousel } from '../Carousel'

export async function AnimeCarousel({ animeId }: { animeId: string }) {
  const anime = await getAnime(animeId)
  if (!anime) return null

  return <Carousel animes={[anime]} />
}
