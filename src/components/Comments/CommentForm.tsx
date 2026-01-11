'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { createComment, updateComment } from '@/app/actions/comments'
import LoadingIcon from '@/components/Icons/LoadingIcon'
import type { Comment, CommentWithReplies } from '@/types'
import styles from './Comments.module.css'

interface Props {
	animeId: string
	episodeId?: string | null
	parentId?: string | null
	editingComment?: Comment
	onCancel?: () => void
	onSuccess?: () => void
	onCommentAdded?: (optimisticComment: CommentWithReplies, realComment?: CommentWithReplies) => void
	onCommentUpdated?: (commentId: string, content: string) => void
	onCommentError?: (commentId: string) => void
	isAuthenticated: boolean
	placeholder?: string
	currentUserId?: string
	replyingToUser?: string
}

export function CommentForm({
	animeId,
	episodeId,
	parentId,
	editingComment,
	onCancel,
	onSuccess,
	onCommentAdded,
	onCommentUpdated,
	onCommentError,
	isAuthenticated,
	placeholder = 'Escribe un comentario... (Markdown soportado)',
	currentUserId,
	replyingToUser,
}: Props) {
	const [content, setContent] = useState(editingComment?.content || '')
	const [error, setError] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition()
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (editingComment && textareaRef.current) {
			textareaRef.current.focus()
		}
	}, [editingComment])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!isAuthenticated) {
			window.location.href = `/login?redirect=${window.location.pathname}`
			return
		}

		setError(null)

		if (!content.trim()) {
			setError('El comentario no puede estar vacío')
			return
		}

		startTransition(async () => {
			if (editingComment) {
				// Para ediciones, primero hacer el optimistic update
				if (onCommentUpdated) {
					onCommentUpdated(editingComment.id, content)
				}
				
				const result = await updateComment(editingComment.id, content)
				
				if (result.error) {
					setError(result.error)
					return
				}
			} else {
				// Para nuevos comentarios, crear optimistic primero
				const tempId = `temp-${Date.now()}`
				const optimisticComment: CommentWithReplies = {
					id: tempId,
					user_id: currentUserId || '',
					anime_id: animeId,
					episode_id: episodeId || null,
					parent_id: parentId || null,
					thread_id: parentId || tempId,
					replying_to_username: replyingToUser || null,
					content: content.trim(),
					edited: false,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
					user_profile: {
						username: 'Tú',
						avatar_url: null,
					},
					like_count: 0,
					dislike_count: 0,
					user_has_liked: false,
					user_has_disliked: false,
					replies: [],
				}
				
				// Llamar al callback optimista primero
				if (onCommentAdded) {
					onCommentAdded(optimisticComment)
				}
				
				// Luego enviar al servidor
				const result = (await createComment(
					animeId,
					content,
					episodeId || null,
					parentId || null
				)) as { error?: string; data?: Comment; success?: boolean }
				
				if (result.error) {
					if (onCommentError) {
						onCommentError(tempId)
					}
					setError(result.error)
					return
				}
				
				// Cuando llega la respuesta del servidor, actualizar con el comentario real
				if (result.data && onCommentAdded) {
					const realComment: CommentWithReplies = {
						...result.data,
						user_profile: result.data.user_profile || {
							username: 'Tú',
							avatar_url: null,
						},
						like_count: 0,
						dislike_count: 0,
						user_has_liked: false,
						user_has_disliked: false,
						replies: [],
					}
					onCommentAdded(optimisticComment, realComment)
				}
			}

			setContent('')
			onSuccess?.()
		})
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// Ctrl/Cmd + Enter to submit
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			handleSubmit(e as any)
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.commentForm}>
			<textarea
				ref={textareaRef}
				value={content}
				onChange={e => setContent(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				disabled={isPending}
				className={styles.commentTextarea}
				rows={3}
			/>

			{error && <div className={styles.commentError}>{error}</div>}

			<div className={styles.commentFormFooter}>
				<div className={styles.commentFormHint}>
					<span>Markdown soportado</span>
					<span>Usa @username para mencionar</span>
				</div>

				<div className={styles.commentFormActions}>
					{onCancel && (
						<button
							type='button'
							onClick={onCancel}
							disabled={isPending}
							className={styles.commentCancelButton}
						>
							Cancelar
						</button>
					)}

					<button
						type='submit'
						disabled={isPending || !content.trim()}
						className={styles.commentSubmitButton}
					>
						{isPending ? (
							<>
								<LoadingIcon />
								{editingComment ? 'Guardando...' : 'Publicando...'}
							</>
						) : editingComment ? (
							'Guardar'
						) : (
							'Comentar'
						)}
					</button>
				</div>
			</div>
		</form>
	)
}
