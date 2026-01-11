import { getUser, getUserProfile } from '@/app/actions/auth'
import { CommentFormClient } from './CommentFormClient'

interface Props {
	animeId: string
	episodeId?: string | null
}

export async function CommentFormSection({ animeId, episodeId }: Props) {
	const [user, profile] = await Promise.all([
		getUser(),
		getUserProfile(),
	])

	// Si no está autenticado, no mostrar formulario
	if (!user) {
		return null
	}

	return (
		<CommentFormClient
			animeId={animeId}
			episodeId={episodeId}
			currentUserId={user.id}
			currentUserProfile={profile}
		/>
	)
}
