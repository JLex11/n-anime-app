import { Anime } from '@/types'

interface CardDetailsProps {
  description?: Anime['description']
  status?: Anime['status']
  rank?: Anime['rank']
  genres?: Anime['genres']
}

export const CardDetails = ({ description, status, genres, rank }: CardDetailsProps) => {
  return (
    <>
      <header>
        <span>{status}</span>
        <span>
          {'⭐'.repeat(Number(rank))} {rank}
        </span>
      </header>
      <p>{description}</p>
      <ul>
        {genres?.map(genre => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </>
  )
}
