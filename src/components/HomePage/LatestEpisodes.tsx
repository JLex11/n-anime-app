import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { CardsSection } from '../CardsSection/CardsSection'
import LatestIcon from '../Icons/LatestIcon'

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
      height: 250,
    }
  })

  return <CardsSection title='Últimos episodios' icon={<LatestIcon />} data={episodeData} gridWidth={230} gridHeight={190} />
}
