'use cache'

import { getLatestEpisodes } from '@/api/getLatestEpisodes'
import { Card } from '../Card'
import { cacheLife } from 'next/cache'

export async function LatestEpisodes() {
	cacheLife('episodes')

	const latestEpisodes = await getLatestEpisodes()

	const episodeData = latestEpisodes.map((episode, index) => {
		return {
			key: episode.episodeId,
			image: {
				src: episode.image ?? '',
				width: 350,
				height: 250,
				loading: index < 3 ? ('eager' as const) : ('lazy' as const),
			},
			title: episode.title,
			link: `/animes/${episode.animeId}/${episode.episode}`,
			prefetch: true,
			pill: { label: `Episodio ${episode.episode}` },
		}
	})

	return episodeData.map(({ key, ...props }) => <Card key={key} {...props} />)
}
