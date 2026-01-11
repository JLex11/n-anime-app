'use client'

import { CommentForm } from './CommentForm'
import { useCommentsContext } from './CommentsContext'

interface Props {
	animeId: string
	episodeId?: string | null
	currentUserId: string
	currentUserProfile: {
		username: string | null
		avatar_url: string | null
	} | null
}

export function CommentFormClient({
	animeId,
	episodeId,
	currentUserId,
	currentUserProfile
}: Props) {
	const { handleCommentAdded, handleCommentError } = useCommentsContext()

	return (
		<CommentForm
			animeId={animeId}
			episodeId={episodeId}
			isAuthenticated={true}
			currentUserId={currentUserId}
			currentUserProfile={currentUserProfile}
			onCommentAdded={handleCommentAdded}
			onCommentError={handleCommentError}
		/>
	)
}
