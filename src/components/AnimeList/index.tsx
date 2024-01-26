import { Anime } from '@/types'
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
    const fbSrc =
      anime.images?.carouselImages?.at(-1)?.link ?? '/lights-blur.webp'

    return {
      key: anime.animeId,
      title: anime.title,
      image: {
        src: imageSrc,
        fbSrc,
        width: 300,
        height: 350,
        lazy: false
      },
      link: `/animes/${anime.animeId}`
      /* showOnHover: <CardDetails description={anime.description} status={anime.status} rank={anime.rank} genres={anime.genres} /> */
    }
  }

  const animesData = animes.map(mapAnimes)

  return (
    <AnimeListWrapper>
      <CardsSection gridProps={{ width: GRID_WIDTH, height: GRID_HEIGHT }}>
        {animesData.map(({ key, title, link, image /* , showOnHover */ }) => (
          <Card
            key={key}
            image={image}
            title={title}
            link={link} /* showOnHover={showOnHover} */
          />
        ))}
      </CardsSection>
    </AnimeListWrapper>
  )
}
