'use client'

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react'
import type { CommentWithReplies } from '@/types'
import {
	addReplyToThread,
	deleteCommentFromState,
	updateCommentInState,
	findRootThreadId,
} from '@/services/commentsState'
import { getCommentsPaginated, getThreadReplies } from '@/app/actions/comments'

interface CommentsContextValue {
	comments: CommentWithReplies[]
	optimisticQueue: CommentWithReplies[]
	displayedComments: CommentWithReplies[]
	count: number
	hasMore: boolean
	nextCursor: string | null
	isLoadingMore: boolean
	animeId: string
	episodeId: string | null
	handleCommentAdded: (
		newComment: CommentWithReplies,
		realComment?: CommentWithReplies
	) => void
	handleCommentError: (optimisticId: string) => void
	handleCommentDeleted: (commentId: string) => void
	handleCommentUpdated: (commentId: string, content: string) => void
	handleLoadMoreComments: () => Promise<void>
	handleLoadMoreReplies: (threadId: string, currentOffset: number) => Promise<void>
	setComments: (comments: CommentWithReplies[]) => void
	setPaginationState: (
		hasMore: boolean,
		nextCursor: string | null,
		animeId: string,
		episodeId: string | null
	) => void
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
	const [hasMore, setHasMore] = useState(false)
	const [nextCursor, setNextCursor] = useState<string | null>(null)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [animeId, setAnimeId] = useState<string>('')
	const [episodeId, setEpisodeId] = useState<string | null>(null)

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

	const handleLoadMoreComments = useCallback(async () => {
		if (!hasMore || isLoadingMore || !nextCursor || !animeId) return

		setIsLoadingMore(true)
		try {
			const response = await getCommentsPaginated(animeId, episodeId, 10, nextCursor)
			setComments(prev => [...prev, ...response.comments])
			setHasMore(response.hasMore)
			setNextCursor(response.nextCursor)
		} catch (error) {
			console.error('Error loading more comments:', error)
		} finally {
			setIsLoadingMore(false)
		}
	}, [hasMore, isLoadingMore, nextCursor, animeId, episodeId])

	const handleLoadMoreReplies = useCallback(async (threadId: string, currentOffset: number) => {
		try {
			const response = await getThreadReplies(threadId, currentOffset, 10)

			setComments(prev =>
				prev.map(comment => {
					if (comment.id === threadId) {
						return {
							...comment,
							replies: [...(comment.replies || []), ...response.replies],
							has_hidden_replies: response.hasMore,
							loaded_reply_count: (comment.loaded_reply_count || 0) + response.replies.length,
						}
					}
					return comment
				})
			)
		} catch (error) {
			console.error('Error loading more replies:', error)
		}
	}, [])

	const setPaginationState = useCallback((
		hasMore: boolean,
		nextCursor: string | null,
		animeId: string,
		episodeId: string | null
	) => {
		setHasMore(hasMore)
		setNextCursor(nextCursor)
		setAnimeId(animeId)
		setEpisodeId(episodeId)
	}, [])

	const value = {
		comments,
		optimisticQueue,
		displayedComments,
		count,
		hasMore,
		nextCursor,
		isLoadingMore,
		animeId,
		episodeId,
		handleCommentAdded,
		handleCommentError,
		handleCommentDeleted,
		handleCommentUpdated,
		handleLoadMoreComments,
		handleLoadMoreReplies,
		setComments,
		setPaginationState,
	}

	return (
		<CommentsContext.Provider value={value}>
			{children}
		</CommentsContext.Provider>
	)
}
