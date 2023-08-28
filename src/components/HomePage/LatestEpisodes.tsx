import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { HomeCard } from './HomeCard'

export const LatestEpisodes = async () => {
  const latestEpisodes = await getLatestEpisodes()

  const episodeData = latestEpisodes.map(episode => {
    return {
      key: episode.episodeId,
      imageSrc: episode.image ?? '',
      title: episode.title,
      link: `/animes/${episode.animeId}/${episode.episode}`,
      pill: { label: `Episodio ${episode.episode}` },
      width: 350,
      height: 250
    }
  })

  return (
    <>
      {episodeData.map(({ key, title, link, pill, imageSrc, width, height }) => (
        <HomeCard key={key} image={{ src: imageSrc, width, height }} title={title} link={link} pill={pill} />
      ))}
    </>
  )
}
