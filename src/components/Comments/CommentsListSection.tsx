import { getCommentsPaginated } from '@/app/actions/comments'
import { getUser, getUserProfile } from '@/app/actions/auth'
import { CommentsListManager } from './CommentsListManager'

interface Props {
	animeId: string
	episodeId?: string | null
}

export async function CommentsListSection({ animeId, episodeId }: Props) {
	const [paginatedData, user, profile] = await Promise.all([
		getCommentsPaginated(animeId, episodeId, 10),
		getUser(),
		getUserProfile(),
	])

	return (
		<CommentsListManager
			initialComments={paginatedData.comments}
			hasMore={paginatedData.hasMore}
			nextCursor={paginatedData.nextCursor}
			totalCount={paginatedData.totalCount}
			animeId={animeId}
			episodeId={episodeId}
			currentUserId={user?.id}
			currentUserProfile={profile}
		/>
	)
}
