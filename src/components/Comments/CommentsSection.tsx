'use client'

import { useState, useEffect, useMemo } from 'react'
import { CommentsList } from './CommentsList'
import { CommentForm } from './CommentForm'
import type { CommentWithReplies } from '@/types'
import {
	addReplyToThread,
	deleteCommentFromState,
	updateCommentInState,
	findRootThreadId,
} from '@/services/commentsState'
import styles from './Comments.module.css'

interface Props {
	animeId: string
	episodeId?: string | null
	initialComments: CommentWithReplies[]
	initialCount: number
	currentUserId?: string
	isAuthenticated: boolean
	currentUserProfile?: {
		username: string | null
		avatar_url: string | null
	} | null
}

export function CommentsSection({
	animeId,
	episodeId,
	initialComments,
	initialCount,
	currentUserId,
	isAuthenticated,
	currentUserProfile,
}: Props) {
	const [comments, setComments] = useState(initialComments)
	const [optimisticQueue, setOptimisticQueue] = useState<CommentWithReplies[]>([])

	useEffect(() => {
		setComments(initialComments)
	}, [initialComments])

	const displayedComments = useMemo(() => {
		let combined = [...comments]

		optimisticQueue.forEach(optimisticComment => {
			if (optimisticComment.parent_id) {
				combined = addReplyToThread(combined, optimisticComment)
			} else {
				combined = [optimisticComment, ...combined]
			}
		})

		return combined
	}, [comments, optimisticQueue])

	const handleCommentAdded = (
		newComment: CommentWithReplies,
		realComment?: CommentWithReplies
	) => {
		if (!realComment) {
			let correctedComment = { ...newComment }
			// Si es una respuesta, intentar corregir el thread_id al root correcto
			if (correctedComment.parent_id) {
				const rootId = findRootThreadId(comments, correctedComment.parent_id)
				if (rootId) {
					correctedComment.thread_id = rootId
				}
			}

			// 1. Añadir optimista a la cola
			setOptimisticQueue(prev => [...prev, correctedComment])
		} else {
			// 2. Reemplazo atómico: Quitar optimista y añadir real a la base
			setOptimisticQueue(prev => prev.filter(c => c.id !== newComment.id))

			setComments(prevComments => {
				if (realComment.parent_id) {
					return addReplyToThread(prevComments, realComment)
				}
				return [realComment, ...prevComments]
			})
		}
	}

	const handleCommentError = (optimisticId: string) => {
		setOptimisticQueue(prev => prev.filter(c => c.id !== optimisticId))
	}

	const handleCommentDeleted = (commentId: string) => {
		setComments(prevComments => deleteCommentFromState(prevComments, commentId))
	}

	const handleCommentUpdated = (commentId: string, content: string) => {
		setComments(prevComments => updateCommentInState(prevComments, commentId, content))
	}

	const count = useMemo(() => {
		const countAllComments = (comments: CommentWithReplies[]): number => {
			return comments.reduce((total, comment) => {
				return total + 1 + (comment.replies ? countAllComments(comment.replies as CommentWithReplies[]) : 0)
			}, 0)
		}
		return countAllComments(displayedComments)
	}, [displayedComments])

	return (
		<div className={styles.commentsSection}>
			<div className={styles.commentsHeader}>
				<h2 className={styles.commentsTitle}>
					Comentarios {count > 0 && `(${count})`}
				</h2>
			</div>

			<CommentForm
				animeId={animeId}
				episodeId={episodeId}
				isAuthenticated={isAuthenticated}
				onCommentAdded={handleCommentAdded}
				onCommentError={handleCommentError}
				currentUserId={currentUserId}
				currentUserProfile={currentUserProfile}
			/>

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
		</div>
	)
}


