import { Anime } from '@/types'

export const normalizeAnimeId = (animeId: Anime['animeId']) => animeId.replaceAll('-', ' ')
