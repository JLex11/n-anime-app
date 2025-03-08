import type { Anime } from '@/types'

export const sortByRank = (a: Anime, b: Anime) => Number(b.rank ?? 0) - Number(a.rank ?? 0)
