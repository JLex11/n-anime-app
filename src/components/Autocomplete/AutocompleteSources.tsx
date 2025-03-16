import { getAnimesByQuery } from '@/api/getAnimeByQuery'
import { getAnimeEpisodes } from '@/api/getAnimeEpisodes'
import { APP_ROUTES } from '@/constants'
import type { AutocompleteItem, AutocompleteItemChilds } from '@/hooks/useAutocomplete.types'
import blurImage from '@/public/lights-blur.webp'
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

	const filteredRoutes = APP_ROUTES.filter(route => {
		const routeName = route.name.toLowerCase()
		const routeDescription = route.description.toLowerCase()
		const lowerQuery = query.toLowerCase()

		return routeName.includes(lowerQuery) || routeDescription.includes(lowerQuery) || route.link.includes(lowerQuery)
	})

	return filteredRoutes.map(mapRouteItem)
}

const getAnimeItemChilds = async (animeId: AutocompleteItem['id']): Promise<AutocompleteItemChilds> => {
	const episodes = await getAnimeEpisodes(animeId, 0, 10)
	const mappedEpisodes = episodes.map(episode => ({
		id: episode.episodeId,
		title: episode.episode,
		image: {
			src: episode.image || blurImage.src,
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

	const limit = Math.min(10 + query.length * 2, 15)
	const animes = await getAnimesByQuery(encodeURIComponent(query), limit)

	return animes
		.map(anime => {
			const descriptionTooLong = anime.description.length > 100
			const truncatedDescription = `${anime.description.slice(0, 100)}${descriptionTooLong ? '...' : ''}`

			return {
				id: anime.animeId,
				title: anime.title,
				image: anime.images?.coverImage || anime.images?.carouselImages[0]?.link || blurImage.src,
				link: `/animes/${anime.animeId}`,
				description: truncatedDescription ?? 'Descripcion no disponible',
				type: anime.type ?? 'Anime',
				rank: anime.rank ?? 0,
				genres: anime.genres,
				childsCallback: () => getAnimeItemChilds(anime.animeId),
			}
		})
		.sort((a, b) => b.rank - a.rank)
}
