'use client'

import { useEffect } from 'react'
import { CommentsList } from './CommentsList'
import { useCommentsContext } from './CommentsContext'
import type { CommentWithReplies } from '@/types'
import styles from './Comments.module.css'

interface Props {
	initialComments: CommentWithReplies[]
	currentUserId?: string
	currentUserProfile?: {
		username: string | null
		avatar_url: string | null
	} | null
}

export function CommentsListManager({
	initialComments,
	currentUserId,
	currentUserProfile
}: Props) {
	const {
		displayedComments,
		setComments,
		handleCommentDeleted,
		handleCommentUpdated,
		handleCommentAdded
	} = useCommentsContext()

	// Inicializar comentarios cuando lleguen del servidor
	useEffect(() => {
		setComments(initialComments)
	}, [initialComments, setComments])

	return (
		<>
			{displayedComments.length > 0 ? (
				<CommentsList
					comments={displayedComments}
					currentUserId={currentUserId}
					onCommentDeleted={handleCommentDeleted}
					onCommentUpdated={handleCommentUpdated}
					onCommentAdded={handleCommentAdded}
					currentUserProfile={currentUserProfile}
				/>
			) : (
				<p className={styles.noComments}>Sé el primero en comentar</p>
			)}
		</>
	)
}
