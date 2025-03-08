import type { Anime } from '@/types'

export const normalizeAnimeId = (animeId: Anime['animeId']) => animeId.replaceAll('-', ' ')
