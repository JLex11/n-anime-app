import { getUser } from '@/app/actions/auth'
import { isFavorite } from '@/app/actions/favorites'
import { FavoriteButton } from './FavoriteButton'

interface Props {
	animeId: string
	animeTitle: string
	animeImage?: string
}

export async function FavoriteButtonContainer({ animeId, animeTitle, animeImage }: Props) {
	const user = await getUser()
	const userIsFavorite = user ? await isFavorite(animeId) : false

	return (
		<FavoriteButton
			animeId={animeId}
			animeTitle={animeTitle}
			animeImage={animeImage}
			initialIsFavorite={userIsFavorite}
			isAuthenticated={!!user}
		/>
	)
}
