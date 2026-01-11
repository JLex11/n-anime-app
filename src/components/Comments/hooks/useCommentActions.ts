'use client'

import { useState, useTransition, useCallback } from 'react'
import { deleteComment } from '@/app/actions/comments'
import { useCommentsContext } from '../CommentsContext'
import { useViewTransition } from '@/hooks/useViewTransition'
import type { CommentWithReplies } from '@/types'

interface UseCommentActionsProps {
	comment: CommentWithReplies
	onCommentDeleted?: (commentId: string) => void
	level: number
}

export function useCommentActions({ 
	comment, 
	onCommentDeleted,
	level 
}: UseCommentActionsProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [showReplyForm, setShowReplyForm] = useState(false)
	const [isDeleting, startDeleteTransition] = useTransition()
	const [showReplies, setShowReplies] = useState(level === 0)
	const [isLoadingReplies, setIsLoadingReplies] = useState(false)
	
	const { handleLoadMoreReplies } = useCommentsContext()
	const { startTransition } = useViewTransition()

	const handleDelete = useCallback(() => {
		if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
			return
		}

		// Llamar al callback optimista primero
		onCommentDeleted?.(comment.id)

		startDeleteTransition(async () => {
			await deleteComment(comment.id)
		})
	}, [comment.id, onCommentDeleted])

	const handleLoadMoreRepliesClick = useCallback(async () => {
		if (isLoadingReplies) return

		setIsLoadingReplies(true)
		try {
			const currentOffset = comment.loaded_reply_count || comment.replies?.length || 0
			await handleLoadMoreReplies(comment.id, currentOffset)
		} finally {
			setIsLoadingReplies(false)
		}
	}, [comment.id, comment.loaded_reply_count, comment.replies?.length, handleLoadMoreReplies, isLoadingReplies])

	const formatDate = useCallback((dateString: string) => {
		// ... existing formatDate logic ...
		const date = new Date(dateString)
		const now = new Date()
		const diffMs = now.getTime() - date.getTime()
		const diffMins = Math.floor(diffMs / 60000)
		const diffHours = Math.floor(diffMs / 3600000)
		const diffDays = Math.floor(diffMs / 86400000)

		if (diffMins < 1) return 'Ahora'
		if (diffMins < 60) return `Hace ${diffMins}m`
		if (diffHours < 24) return `Hace ${diffHours}h`
		if (diffDays < 7) return `Hace ${diffDays}d`

		return date.toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'short',
			year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
		})
	}, [])

	const handleSetShowReplyForm = useCallback((show: boolean) => {
		startTransition(() => setShowReplyForm(show))
	}, [startTransition])

	const handleSetShowReplies = useCallback((show: boolean) => {
		startTransition(() => setShowReplies(show))
	}, [startTransition])

	const handleSetIsEditing = useCallback((editing: boolean) => {
		startTransition(() => setIsEditing(editing))
	}, [startTransition])

	return {
		isEditing,
		setIsEditing: handleSetIsEditing,
		showReplyForm,
		setShowReplyForm: handleSetShowReplyForm,
		isDeleting,
		showReplies,
		setShowReplies: handleSetShowReplies,
		isLoadingReplies,
		handleDelete,
		handleLoadMoreRepliesClick,
		formatDate,
	}
}
