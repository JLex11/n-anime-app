import type { Anime } from '@/types'
import { CarouselWrapper } from './CarouselWrapper'
import { Item } from './Item'
import { unstable_ViewTransition as ViewTransition } from 'react'

interface Props {
	animes: Anime[]
	showInfo?: boolean
}

export function Carousel({ animes, showInfo }: Props) {
	if (!animes) return null

	return (
		<ViewTransition name='carousel'>
			<CarouselWrapper animes={animes}>
				{animes.map((anime, i) => (
					<Item key={anime.animeId} anime={anime} showInfo={showInfo} index={i} />
				))}
			</CarouselWrapper>
		</ViewTransition>
	)
}
