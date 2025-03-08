// import type { Anime } from '@/types'

// const indexedAnimes = new Map<Anime['animeId'], Anime>()

// /**
//  * Añade un anime al índice.
//  * @param anime - El anime a añadir.
//  * @returns El anime añadido.
//  */
// export function addAnimeToIndex(anime: Anime) {
//   indexedAnimes.set(anime.animeId, anime)
//   return anime
// }

// /**
//  * Elimina un anime del índice.
//  * @param animeId - El ID del anime a eliminar.
//  * @returns El ID del anime eliminado.
//  */
// export function removeIndexedAnime(animeId: Anime['animeId']) {
//   indexedAnimes.delete(animeId)
//   return animeId
// }

// /**
//  * Obtiene un anime del índice.
//  * @param animeId - El ID del anime a obtener.
//  * @returns El anime correspondiente al ID, o undefined si no se encuentra.
//  */
// export function getIndexedAnime(animeId: Anime['animeId']) {
//   return indexedAnimes.get(animeId)
// }

// /**
//  * Obtiene todos los animes del índice.
//  * @returns Un array con todos los animes indexados.
//  */
// export function getAllIndexedAnimes() {
//   return Array.from(indexedAnimes.values())
// }

import type { Anime } from '@/types'

interface CachedAnime {
  data: Anime
  timestamp: number
}

// Constantes
const CACHE_DURATION = 1000 * 60 * 60 * 12 // 12 horas
const store = new Map<Anime['animeId'], CachedAnime>()

// Funciones auxiliares privadas
function isExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CACHE_DURATION
}

function isValidAnime(anime: Anime): boolean {
  return Boolean(
    anime?.animeId &&
    anime.title
  )
}

function cleanExpired(): void {
  const now = Date.now()
  for (const [id, cached] of store.entries()) {
    if (isExpired(cached.timestamp)) {
      store.delete(id)
    }
  }
}

// Funciones públicas exportadas
export function addAnimeToIndex(anime: Anime): Anime {
  if (!isValidAnime(anime)) return anime

  store.set(anime.animeId, {
    data: anime,
    timestamp: Date.now()
  })
  return anime
}

export function addAnimesToIndex(animes: Anime[]): Anime[] {
  const timestamp = Date.now()
  for (const anime of animes) {
    if (isValidAnime(anime)) {
      store.set(anime.animeId, {
        data: anime,
        timestamp
      })
    }
  }
  return animes
}

export function getIndexedAnime(animeId: Anime['animeId']): Anime | undefined {
  const cached = store.get(animeId)
  if (!cached) return undefined

  if (isExpired(cached.timestamp)) {
    store.delete(animeId)
    return undefined
  }

  return cached.data
}

export function removeIndexedAnime(animeId: Anime['animeId']): void {
  store.delete(animeId)
}

export function getAllIndexedAnimes(): Anime[] {
  cleanExpired()
  return Array.from(store.values()).map(cached => cached.data)
}

export function getStoreSize(): number {
  cleanExpired()
  return store.size
}