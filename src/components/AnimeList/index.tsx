import type { Anime } from '@/types'
import { Card } from '../Card'
import { CardsSection } from '../CardsSection'
import { AnimeListWrapper } from './AnimeListWrapper'

const DEFAULT_IMAGE = '/lights-blur.webp'
const GRID_WIDTH = '180px'
const GRID_HEIGHT = '270px'

interface Props {
  animesSource: Anime[] | Promise<Anime[]>
}

export const AnimeList = async ({ animesSource }: Props) => {
  const animes = (await animesSource) ?? []

  const mapAnimes = (anime: Anime) => {
    const imageSrc = anime.images?.coverImage
    const fbSrc = anime.images?.carouselImages?.at(-1)?.link ?? DEFAULT_IMAGE

    return {
      key: anime.animeId,
      animeId: anime.animeId,
      title: anime.title,
      image: {
        src: imageSrc,
        fbSrc,
        width: 300,
        height: 350
      },
      link: `/animes/${anime.animeId}`
    }
  }

  const animesData = animes.map(mapAnimes)

  return (
    <AnimeListWrapper>
      <CardsSection gridProps={{ width: GRID_WIDTH, height: GRID_HEIGHT }}>
        {animesData.map(({ key, title, link, image, animeId }) => (
          <Card key={key} image={image} title={title} link={link} animeId={animeId} />
        ))}
      </CardsSection>
    </AnimeListWrapper>
  )
}
