import { getAnime } from '@/services/getAnime'
import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import { getRatingAnimes } from '@/services/getRatingAnimes'
import { Anime } from '@/types'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { Metadata } from 'next'

export interface PageProps {
  params: { animeId: string }
  searchParams: { limit: string }
}

export async function generateMetadataFromAnimeId(
  animeId: PageProps['params']['animeId']
): Promise<Metadata> {
  const anime = await getAnime(animeId)
  if (!anime) return {}

  return {
    title: anime.title ?? normalizeAnimeId(animeId),
    description: anime.description,
    keywords: `${anime.genres.join(', ')} ${anime.title} ${anime.otherTitles.join(', ')}`
  }
}

export async function generatePageStaticParams(): Promise<{ animeId: string }[]> {
  const animesPromises = [getRatingAnimes(25), getBroadcastAnimes()]

  const animesIdSettled = await Promise.allSettled(
    animesPromises.map(animePromise =>
      animePromise.then(anime => anime.map(({ animeId }) => animeId))
    )
  )

  const filteredAnimesId = animesIdSettled.filter(
    (animesId): animesId is PromiseFulfilledResult<Anime['animeId'][]> =>
      animesId.status === 'fulfilled'
  )

  const mappedAnimesId = filteredAnimesId.flatMap(filteredAnimesId =>
    filteredAnimesId.value.map(animeId => ({ animeId }))
  )

  return mappedAnimesId
}
