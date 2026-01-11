'use client'

import { useState, useTransition, useCallback } from 'react'
import { createComment, updateComment } from '@/app/actions/comments'
import type { Comment, CommentWithReplies } from '@/types'

interface UseCommentFormProps {
	animeId: string
	episodeId?: string | null
	parentId?: string | null
	editingComment?: Comment
	onSuccess?: () => void
	onCommentAdded?: (optimisticComment: CommentWithReplies, realComment?: CommentWithReplies) => void
	onCommentUpdated?: (commentId: string, content: string) => void
	onCommentError?: (commentId: string) => void
	isAuthenticated: boolean
	currentUserId?: string
	replyingToUser?: string
	currentUserProfile?: {
		username: string | null
		avatar_url: string | null
	} | null
}

export function useCommentForm({
	animeId,
	episodeId,
	parentId,
	editingComment,
	onSuccess,
	onCommentAdded,
	onCommentUpdated,
	onCommentError,
	isAuthenticated,
	currentUserId,
	replyingToUser,
	currentUserProfile,
}: UseCommentFormProps) {
	const [content, setContent] = useState(editingComment?.content || '')
	const [error, setError] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition()

	const handleSubmit = useCallback((e?: React.FormEvent) => {
		if (e) e.preventDefault()

		if (!isAuthenticated) {
			window.location.href = `/login?redirect=${window.location.pathname}`
			return
		}

		setError(null)

		const trimmedContent = content.trim()
		if (!trimmedContent) {
			setError('El comentario no puede estar vacío')
			return
		}

		if (editingComment) {
			startTransition(async () => {
				if (onCommentUpdated) {
					onCommentUpdated(editingComment.id, trimmedContent)
				}
				
				const result = await updateComment(editingComment.id, trimmedContent)
				
				if (result.error) {
					setError(result.error)
					return
				}

				setContent('')
				onSuccess?.()
			})
		} else {
			const tempId = `temp-${Date.now()}`
			const optimisticComment: CommentWithReplies = {
				id: tempId,
				user_id: currentUserId || '',
				anime_id: animeId,
				episode_id: episodeId || null,
				parent_id: parentId || null,
				thread_id: parentId || tempId,
				replying_to_username: replyingToUser || null,
				content: trimmedContent,
				edited: false,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user_profile: {
					username: currentUserProfile?.username || 'Tú',
					avatar_url: currentUserProfile?.avatar_url || null,
				},
				like_count: 0,
				dislike_count: 0,
				user_has_liked: false,
				user_has_disliked: false,
				replies: [],
			}
			
			if (onCommentAdded) {
				onCommentAdded(optimisticComment)
			}
			
			setContent('')
			onSuccess?.()
			
			createComment(
				animeId,
				trimmedContent,
				episodeId || null,
				parentId || null
			).then((result) => {
				const typedResult = result as { error?: string; data?: Comment; success?: boolean }
				
				if (typedResult.error) {
					if (onCommentError) {
						onCommentError(tempId)
					}
					console.error('Error al crear comentario:', typedResult.error)
					return
				}
				
				if (typedResult.data && onCommentAdded) {
					const realComment: CommentWithReplies = {
						...typedResult.data,
						user_profile: typedResult.data.user_profile || {
							username: currentUserProfile?.username || 'Tú',
							avatar_url: currentUserProfile?.avatar_url || null,
						},
						like_count: 0,
						dislike_count: 0,
						user_has_liked: false,
						user_has_disliked: false,
						replies: [],
					}
					onCommentAdded(optimisticComment, realComment)
				}
			})
		}
	}, [
		content,
		isAuthenticated,
		editingComment,
		onCommentUpdated,
		onSuccess,
		currentUserId,
		animeId,
		episodeId,
		parentId,
		replyingToUser,
		currentUserProfile,
		onCommentAdded,
		onCommentError
	])

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			handleSubmit()
		}
	}, [handleSubmit])

	return {
		content,
		setContent,
		error,
		setError,
		isPending,
		handleSubmit,
		handleKeyDown,
	}
}
