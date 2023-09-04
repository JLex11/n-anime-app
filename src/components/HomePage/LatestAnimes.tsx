import { getLatestAnimes } from '@/services/getLatestAnimes'
import { HomeCard } from './HomeCard'

export const LatestAnimes = async () => {
  const latestAnimes = await getLatestAnimes()

  const animeData = latestAnimes.map(anime => {
    const imageSrc = anime.images?.coverImage ?? anime.images?.carouselImages?.at(-1)?.link ?? ''
    const fbSrc = anime.images?.carouselImages?.at(-2)?.link ?? ''

    return {
      key: anime.animeId,
      title: anime.title,
      image: {
        src: imageSrc,
        fbSrc,
        width: 300,
        height: 350,
        lazy: true
      },
      link: `/animes/${anime.animeId}`
      /* showOnHover: <CardDetails description={anime.description} status={anime.status} rank={anime.rank} genres={anime.genres} /> */
    }
  })

  return (
    <>
      {animeData.map(({ key, title, link, image /* , showOnHover */ }) => (
        <HomeCard key={key} image={image} title={title} link={link} /* showOnHover={showOnHover} */ />
      ))}
    </>
  )
}
