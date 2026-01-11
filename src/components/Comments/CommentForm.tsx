'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { createComment, updateComment } from '@/app/actions/comments'
import LoadingIcon from '@/components/Icons/LoadingIcon'
import { MarkdownEditor } from './MarkdownEditor'
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
	currentUserProfile?: {
		username: string | null
		avatar_url: string | null
	} | null
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
	currentUserProfile,
}: Props) {
	const [content, setContent] = useState(editingComment?.content || '')
	const [error, setError] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition()
	const editorAutoFocus = !!editingComment

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

		if (editingComment) {
			// Para ediciones, sí bloqueamos el formulario ya que es una actualización
			startTransition(async () => {
				// Primero hacer el optimistic update
				if (onCommentUpdated) {
					onCommentUpdated(editingComment.id, content)
				}
				
				const result = await updateComment(editingComment.id, content)
				
				if (result.error) {
					setError(result.error)
					return
				}

				setContent('')
				onSuccess?.()
			})
		} else {
			// Para nuevos comentarios, NO bloqueamos el formulario con startTransition
			// Crear comentario optimista
			const tempId = `temp-${Date.now()}`
			const contentToSend = content.trim()
			const optimisticComment: CommentWithReplies = {
				id: tempId,
				user_id: currentUserId || '',
				anime_id: animeId,
				episode_id: episodeId || null,
				parent_id: parentId || null,
				thread_id: parentId || tempId,
				replying_to_username: replyingToUser || null,
				content: contentToSend,
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
			
			// Mostrar comentario optimista inmediatamente
			if (onCommentAdded) {
				onCommentAdded(optimisticComment)
			}
			
			// Limpiar formulario inmediatamente para permitir escribir otro comentario
			setContent('')
			onSuccess?.()
			
			// Enviar al servidor en background (sin bloquear el formulario)
			createComment(
				animeId,
				contentToSend,
				episodeId || null,
				parentId || null
			).then((result) => {
				const typedResult = result as { error?: string; data?: Comment; success?: boolean }
				
				if (typedResult.error) {
					if (onCommentError) {
						onCommentError(tempId)
					}
					// Mostrar error pero no en el formulario actual ya que está limpio
					console.error('Error al crear comentario:', typedResult.error)
					return
				}
				
				// Cuando llega la respuesta del servidor, actualizar con el comentario real
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
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		// Ctrl/Cmd + Enter to submit
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			handleSubmit(e as any)
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.commentForm}>
			<MarkdownEditor
				value={content}
				onChange={setContent}
				placeholder={placeholder}
				disabled={isPending}
				onKeyDown={handleKeyDown}
				autoFocus={editorAutoFocus}
			/>

			{error && <div className={styles.commentError}>{error}</div>}

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
		</form>
	)
}
