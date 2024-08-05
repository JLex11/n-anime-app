import type { Anime } from '@/types'
import { CarouselWrapper } from './CarouselWrapper'
import { Item } from './Item'

interface Props {
	animes: Anime[]
	showInfo?: boolean
}

export function Carousel({ animes, showInfo }: Props) {
	if (!animes) return null

	return (
		<CarouselWrapper animes={animes}>
			{animes.map((anime, i) => (
				<Item key={anime.animeId} anime={anime} showInfo={showInfo} index={i} />
			))}
		</CarouselWrapper>
	)
}
