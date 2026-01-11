'use client'

import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import type { CommentWithReplies } from '@/types'
import {
	addReplyToThread,
	deleteCommentFromState,
	updateCommentInState,
	findRootThreadId,
} from '@/services/commentsState'

interface CommentsContextValue {
	comments: CommentWithReplies[]
	optimisticQueue: CommentWithReplies[]
	displayedComments: CommentWithReplies[]
	count: number
	handleCommentAdded: (
		newComment: CommentWithReplies,
		realComment?: CommentWithReplies
	) => void
	handleCommentError: (optimisticId: string) => void
	handleCommentDeleted: (commentId: string) => void
	handleCommentUpdated: (commentId: string, content: string) => void
	setComments: (comments: CommentWithReplies[]) => void
}

const CommentsContext = createContext<CommentsContextValue | null>(null)

export function useCommentsContext() {
	const context = useContext(CommentsContext)
	if (!context) {
		throw new Error('useCommentsContext must be used within CommentsProvider')
	}
	return context
}

interface Props {
	children: ReactNode
}

export function CommentsProvider({ children }: Props) {
	const [comments, setComments] = useState<CommentWithReplies[]>([])
	const [optimisticQueue, setOptimisticQueue] = useState<CommentWithReplies[]>([])

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

	const count = useMemo(() => {
		const countAllComments = (comments: CommentWithReplies[]): number => {
			return comments.reduce((total, comment) => {
				return total + 1 + (comment.replies ? countAllComments(comment.replies as CommentWithReplies[]) : 0)
			}, 0)
		}
		return countAllComments(displayedComments)
	}, [displayedComments])

	const handleCommentAdded = (
		newComment: CommentWithReplies,
		realComment?: CommentWithReplies
	) => {
		if (!realComment) {
			let correctedComment = { ...newComment }
			if (correctedComment.parent_id) {
				const rootId = findRootThreadId(comments, correctedComment.parent_id)
				if (rootId) {
					correctedComment.thread_id = rootId
				}
			}
			setOptimisticQueue(prev => [...prev, correctedComment])
		} else {
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

	const value = {
		comments,
		optimisticQueue,
		displayedComments,
		count,
		handleCommentAdded,
		handleCommentError,
		handleCommentDeleted,
		handleCommentUpdated,
		setComments,
	}

	return (
		<CommentsContext.Provider value={value}>
			{children}
		</CommentsContext.Provider>
	)
}
