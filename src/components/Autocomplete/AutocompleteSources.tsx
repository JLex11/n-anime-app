import { getAnimesByQuery } from '@/api/getAnimeByQuery'
import { getAnimeEpisodes } from '@/api/getAnimeEpisodes'
import { APP_ROUTES } from '@/constants'
import { AutocompleteItem, AutocompleteItemChilds } from '@/hooks/useAutocomplete.types'
import AppWindow from '../Icons/AppWindow'

const mapRouteItem = (route: (typeof APP_ROUTES)[number]) => ({
	id: route.link,
	title: route.name,
	image: <AppWindow width={50} />,
	link: route.link,
	description: route.description,
})

export const getRoutesItems = (query: string) => {
	if (query.length < 1) return APP_ROUTES.map(mapRouteItem)

	const regex = new RegExp(query, 'gi')
	const filteredRoutes = APP_ROUTES.filter(route => regex.test(route.name) || regex.test(route.description))

	return filteredRoutes.map(mapRouteItem)
}

const getAnimeItemChilds = async (animeId: AutocompleteItem['id']): Promise<AutocompleteItemChilds> => {
	const episodes = await getAnimeEpisodes(animeId, 0, 10)
	const mappedEpisodes = episodes.map(episode => ({
		id: episode.episodeId,
		title: episode.episode,
		image: {
			src: episode.image || '/lights-blur.webp',
			alt: episode.title,
		},
		link: `/animes/${episode.animeId}/${episode.episode}`,
	}))

	return {
		items: mappedEpisodes,
		title: 'Episodios',
	}
}

export const getAnimeItems = async (query: string) => {
	if (query.length < 1) return []

	const limit = 10 + query.length * 2
	const animes = await getAnimesByQuery(encodeURIComponent(query), limit)

	return animes
		.map(anime => ({
			id: anime.animeId,
			title: anime.title,
			image: anime.images?.coverImage || anime.images?.carouselImages[0]?.link || '/lights-blur.webp',
			link: `/animes/${anime.animeId}`,
			description: anime.description ?? 'Descripcion no disponible',
			type: anime.type ?? 'Anime',
			rank: anime.rank ?? 0,
			childsCallback: () => getAnimeItemChilds(anime.animeId),
		}))
		.sort((a, b) => b.rank - a.rank)
}
