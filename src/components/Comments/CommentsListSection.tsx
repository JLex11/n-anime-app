import { getComments } from '@/app/actions/comments'
import { getUser, getUserProfile } from '@/app/actions/auth'
import { CommentsListManager } from './CommentsListManager'

interface Props {
	animeId: string
	episodeId?: string | null
}

export async function CommentsListSection({ animeId, episodeId }: Props) {
	const [comments, user, profile] = await Promise.all([
		getComments(animeId, episodeId),
		getUser(),
		getUserProfile(),
	])

	return (
		<CommentsListManager
			initialComments={comments}
			currentUserId={user?.id}
			currentUserProfile={profile}
		/>
	)
}
