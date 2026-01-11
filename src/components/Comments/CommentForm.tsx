'use client'

import LoadingIcon from '@/components/Icons/LoadingIcon'
import { MarkdownEditor } from './MarkdownEditor'
import type { Comment, CommentWithReplies } from '@/types'
import styles from './Comments.module.css'
import { useCommentForm } from './hooks/useCommentForm'

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
	const {
		content,
		setContent,
		error,
		isPending,
		handleSubmit,
		handleKeyDown,
	} = useCommentForm({
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
	})

	const editorAutoFocus = !!editingComment

	return (
		<form 
			onSubmit={handleSubmit} 
			className={styles.commentForm}
			style={{ 
				viewTransitionName: editingComment 
					? `edit-form-${editingComment.id.replace(/[^a-zA-Z0-9]/g, '_')}` 
					: parentId 
						? `reply-form-${parentId.replace(/[^a-zA-Z0-9]/g, '_')}` 
						: 'main-comment-form' 
			} as any}
		>
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
