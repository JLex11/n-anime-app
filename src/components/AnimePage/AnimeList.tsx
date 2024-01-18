import { Anime } from '@/types'
import { Card } from '../Card'
import { CardsSection } from '../CardsSection'
import { AnimeListWrapper } from './AnimeListWrapper'

export const AnimeList = async ({ animesSource }: { animesSource: Anime[] | Promise<Anime[]> }) => {
  const animes = await animesSource ?? []

  const animesData = animes.map(anime => {
    const imageSrc = anime.images?.coverImage
    const fbSrc = anime.images?.carouselImages?.at(-1)?.link ?? '/lights-blur.webp'

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
  })

  return (
    <AnimeListWrapper>
      <CardsSection gridWidth={180} gridHeight={270}>
        {animesData.map(({ key, title, link, image /* , showOnHover */ }) => (
          <Card key={key} image={image} title={title} link={link} /* showOnHover={showOnHover} */ />
        ))}
      </CardsSection>
    </AnimeListWrapper>
  )
}
