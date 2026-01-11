'use client'

import { useEffect } from 'react'
import { CommentsList } from './CommentsList'
import { LoadMoreButton } from './LoadMoreButton'
import { useCommentsContext } from './CommentsContext'
import type { CommentWithReplies } from '@/types'
import styles from './Comments.module.css'

interface Props {
	initialComments: CommentWithReplies[]
	hasMore: boolean
	nextCursor: string | null
	totalCount: number
	animeId: string
	episodeId?: string | null
	currentUserId?: string
	currentUserProfile?: {
		username: string | null
		avatar_url: string | null
	} | null
}

export function CommentsListManager({
	initialComments,
	hasMore,
	nextCursor,
	totalCount,
	animeId,
	episodeId,
	currentUserId,
	currentUserProfile
}: Props) {
	const {
		displayedComments,
		setComments,
		setPaginationState,
		handleCommentDeleted,
		handleCommentUpdated,
		handleCommentAdded,
		handleLoadMoreComments,
		isLoadingMore,
		hasMore: hasMoreInContext,
	} = useCommentsContext()

	useEffect(() => {
		setComments(initialComments)
		setPaginationState(hasMore, nextCursor, animeId, episodeId || null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialComments, hasMore, nextCursor, animeId, episodeId])

	return (
		<>
			{displayedComments.length > 0 ? (
				<>
					<CommentsList
						comments={displayedComments}
						currentUserId={currentUserId}
						onCommentDeleted={handleCommentDeleted}
						onCommentUpdated={handleCommentUpdated}
						onCommentAdded={handleCommentAdded}
						currentUserProfile={currentUserProfile}
					/>

					{hasMoreInContext && (
						<LoadMoreButton
							onClick={handleLoadMoreComments}
							isLoading={isLoadingMore}
							label="Cargar más comentarios"
						/>
					)}
				</>
			) : (
				<p className={styles.noComments}>Sé el primero en comentar</p>
			)}
		</>
	)
}
