// fetchAnimeHelper.ts
import { APIRoutes } from '@/enums'
import type { Anime } from '@/types'
import { daysToSeconds, hoursToSeconds, minToSeconds } from '@/utils/convertTime'
import { filterUnsupportDomains } from '@/utils/filterUnsupportDomains'
import { sortByRank } from '@/utils/sortByRank'
import { addAnimeToIndex, getIndexedAnime } from '../services/animesState'
import { fetchData } from '../services/fetchData'

interface FetchConfig {
  revalidate: number
  useCache?: boolean
}

/**
 * Procesa un anime o array de animes aplicando filtros y guardándolos en caché
 */
function processAnimeData(data: Anime | Anime[] | undefined): Anime | Anime[] | undefined {
  if (!data) return undefined

  if (Array.isArray(data)) {
    return data
      .map(anime => addAnimeToIndex(filterUnsupportDomains(anime)))
      .filter(Boolean)
  }

  return addAnimeToIndex(filterUnsupportDomains(data))
}

/**
 * Función base para obtener datos de anime con soporte para caché
 */
export async function fetchAnimeHelper<T extends Anime | Anime[]>(
  endpoint: string,
  config: FetchConfig,
  params?: Record<string, string | number | undefined>
): Promise<T | undefined> {
  // Construir URL con parámetros
  const queryParams = params
    ? `?${new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    ).toString()}`
    : ''

  const url = `${endpoint}${queryParams}`

  // Verificar caché si está habilitado
  if (config.useCache && !Array.isArray(params)) {
    const cachedData = getIndexedAnime(String(params))
    if (cachedData) return cachedData as T
  }

  try {
    const data = await fetchData<T>(url, {
      next: { revalidate: config.revalidate }
    })
    return processAnimeData(data) as T
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error)
    return undefined
  }
}

// Funciones específicas refactorizadas
export const getAnime = async (animeId: string): Promise<Anime | undefined> => {
  return fetchAnimeHelper<Anime>(
    `${APIRoutes.InfoAnime}/${animeId}`,
    { revalidate: hoursToSeconds(12), useCache: true }
  )
}

export const getRatingAnimes = async (limit = 10): Promise<Anime[]> => {
  const animes = await fetchAnimeHelper<Anime[]>(
    APIRoutes.RatingAnimes,
    { revalidate: daysToSeconds(1) },
    { limit }
  )
  return animes?.sort(sortByRank) || []
}

export const getLatestAnimes = async (limit = 10): Promise<Anime[]> => {
  const animes = await fetchAnimeHelper<Anime[]>(
    APIRoutes.LatestAnimes,
    { revalidate: hoursToSeconds(3) },
    { limit }
  )
  return animes || []
}

export const getBroadcastAnimes = async (limit?: number): Promise<Anime[]> => {
  const animes = await fetchAnimeHelper<Anime[]>(
    APIRoutes.BroadcastAnimes,
    { revalidate: hoursToSeconds(6) },
    { limit }
  )
  return animes || []
}

export const getAnimesByQuery = async (query: string, limit?: number): Promise<Anime[]> => {
  const animes = await fetchAnimeHelper<Anime[]>(
    `${APIRoutes.SearchAnimes}/${query}`,
    { revalidate: minToSeconds(30) },
    { limit }
  )
  return animes || []
}