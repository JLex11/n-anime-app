import { Anime } from '@/types'
import { Carousel } from '.'

interface Props {
  animesPromise: () => Promise<Anime[]>
}

export async function CarouselHero({ animesPromise }: Props) {
  const carouselAnimes = await animesPromise()
  return <Carousel animes={carouselAnimes} showInfo />
}
