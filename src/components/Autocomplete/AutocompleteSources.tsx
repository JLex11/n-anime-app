import { getAnimesByQuery } from '@/api/getAnimeByQuery'
import { getAnimeEpisodes } from '@/api/getAnimeEpisodes'
import { APP_ROUTES } from '@/constants'
import type { AutocompleteItem, AutocompleteItemChilds } from '@/hooks/useAutocomplete.types'
import blurImage from '@/public/lights-blur.webp'
import { debounceCallback } from '@/utils/debounceCallback'
import AppWindow from '../Icons/AppWindow'
import type { JSX } from 'react'

type RouteItem = {
    id: string;
    title: string;
    image: JSX.Element;
    link: string;
    description: string;
}

const cache = new Map<string, RouteItem[]>()

const mapRouteItem = (route: (typeof APP_ROUTES)[number]): RouteItem => ({
	id: route.link,
	title: route.name,
	image: <AppWindow width={50} />,
	link: route.link,
	description: route.description,
})

export const getRoutesItems = (query: string) => {
	// Si no hay query, devolver todas las rutas
	if (query.length < 1) return APP_ROUTES.map(mapRouteItem)
	
	// Optimizar búsqueda usando una clave compuesta para el caché
	const cacheKey = `routes_${query}`
	if (cache.has(cacheKey)) {
		return cache.get(cacheKey)!
	}

	const lowerQuery = query.toLowerCase()
	const filteredRoutes = APP_ROUTES.filter(route => {
		const routeName = route.name.toLowerCase()
		const routeDescription = route.description.toLowerCase()
		
		return routeName.includes(lowerQuery) || 
			   routeDescription.includes(lowerQuery) || 
			   route.link.includes(lowerQuery)
	})

	const result = filteredRoutes.map(mapRouteItem)
	cache.set(cacheKey, result)
	
	return result
}

// Cache para getAnimeItemChilds con tiempo de expiración
const animeChildsCache = new Map<string, { data: AutocompleteItemChilds, timestamp: number }>()
const CACHE_TIMEOUT = 5 * 60 * 1000 // 5 minutos

const getAnimeItemChilds = async (animeId: AutocompleteItem['id']): Promise<AutocompleteItemChilds> => {
	const cacheKey = `anime_childs_${animeId}`
	const now = Date.now()
	
	// Verificar caché con expiración
	if (animeChildsCache.has(cacheKey)) {
		const cached = animeChildsCache.get(cacheKey)!
		if (now - cached.timestamp < CACHE_TIMEOUT) {
			return cached.data
		}
	}
	
	try {
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

		const result = {
			items: mappedEpisodes,
			title: 'Episodios',
		}
		
		// Guardar en caché con timestamp
		animeChildsCache.set(cacheKey, { data: result, timestamp: now })
		return result
	} catch (error) {
		console.error('Error fetching anime episodes:', error)
		return { items: [], title: 'Episodios' }
	}
}

// Cache para búsqueda de animes
const animeSearchCache = new Map<string, AutocompleteItem[]>()

// Fetcher con debounce para optimizar llamadas API
// 200ms es el balance óptimo para autocomplete: responsivo pero eficiente
const debouncedFetchAnimes = debounceCallback(
	async (query: string) => {
		const animes = await getAnimesByQuery(encodeURIComponent(query), 15)
		return animes
	},
	200
)

export const getAnimeItems = async (query: string): Promise<AutocompleteItem[]> => {
	if (query.length < 1) return []

	const cacheKey = `anime_search_${query}`

	// Verificar cache primero (retorno instantáneo)
	if (animeSearchCache.has(cacheKey)) {
		return animeSearchCache.get(cacheKey)!
	}

	// Cache miss - hacer debounce de la llamada API
	try {
		const animes = await debouncedFetchAnimes(query)

		const result = animes
			.map(anime => {
				const descriptionTooLong = anime.description?.length > 100
				const description = anime.description || 'Descripción no disponible'
				const truncatedDescription = descriptionTooLong
					? `${description.slice(0, 100)}...`
					: description

				return {
					id: anime.animeId,
					title: anime.title,
					image: anime.images?.coverImage ||
						   anime.images?.carouselImages?.[0]?.link ||
						   blurImage.src,
					link: `/animes/${anime.animeId}`,
					description: truncatedDescription,
					type: anime.type ?? 'Anime',
					rank: anime.rank ?? 0,
					genres: anime.genres,
					childsCallback: () => getAnimeItemChilds(anime.animeId),
				}
			})
			.sort((a, b) => b.rank - a.rank)

		animeSearchCache.set(cacheKey, result)

		// Limitar el tamaño del caché (evicción FIFO)
		if (animeSearchCache.size > 50) {
			const firstKey = animeSearchCache.keys().next().value
			if (firstKey) animeSearchCache.delete(firstKey)
		}

		return result
	} catch (error) {
		// Manejar cancelaciones de debounce graciosamente
		if (error instanceof Error && error.message === 'Debounced request cancelled') {
			// Petición cancelada por una más reciente - retornar array vacío
			return []
		}

		// Errores reales de red
		console.error('Error searching animes:', error)
		return []
	}
}
