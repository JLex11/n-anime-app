import { Anime } from '@/types'

const indexedAnimes = new Map<Anime['animeId'], Anime>()

export function addAnimeToIndex(anime: Anime) {
  indexedAnimes.set(anime.animeId, anime)
  return anime
}

export function removeIndexedAnime(animeId: Anime['animeId']) {
  indexedAnimes.delete(animeId)
  return animeId
}

export function getIndexedAnime(animeId: Anime['animeId']) {
  return indexedAnimes.get(animeId)
}

export function getAllIndexedAnimes() {
  return Array.from(indexedAnimes.values())
}