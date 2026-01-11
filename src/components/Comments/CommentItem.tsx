'use client'

import { useState, useTransition } from 'react'
import { deleteComment } from '@/app/actions/comments'
import { LikeButton } from './LikeButton'
import { CommentForm } from './CommentForm'
import { MarkdownRenderer } from './MarkdownRenderer'
import { CommentsList } from './CommentsList'
import type { CommentWithReplies } from '@/types'
import styles from './Comments.module.css'
import clsx from 'clsx'

interface Props {
	comment: CommentWithReplies
	currentUserId?: string
	level: number
	onCommentDeleted?: (commentId: string) => void
	onCommentUpdated?: (commentId: string, content: string) => void
	onCommentAdded?: (optimisticComment: CommentWithReplies, realComment?: CommentWithReplies) => void
}

export function CommentItem({
	comment,
	currentUserId,
	level,
	onCommentDeleted,
	onCommentUpdated,
	onCommentAdded,
}: Props) {
	const [isEditing, setIsEditing] = useState(false)
	const [showReplyForm, setShowReplyForm] = useState(false)
	const [isDeleting, startDeleteTransition] = useTransition()
	const [showReplies, setShowReplies] = useState(true)

	const isOwner = currentUserId === comment.user_id
	const canReply = true // Permitir responder en cualquier nivel (flat thread)
	const username = comment.user_profile?.username || 'Usuario Anónimo'
	const avatarUrl = comment.user_profile?.avatar_url

	const handleDelete = () => {
		if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
			return
		}

		// Llamar al callback optimista primero
		onCommentDeleted?.(comment.id)

		startDeleteTransition(async () => {
			await deleteComment(comment.id)
		})
	}

	const formatDate = (dateString: string) => {
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
	}

	if (isDeleting) {
		return (
			<div className={clsx(styles.commentItem, styles.commentDeleted)}>
				<p>Eliminando comentario...</p>
			</div>
		)
	}

	return (
		<div className={styles.commentItem} data-level={level}>
			<div className={styles.commentHeader}>
				<div className={styles.commentAuthor}>
					{avatarUrl && (
						<img src={avatarUrl} alt={username} className={styles.commentAvatar} />
					)}
					<span className={styles.commentUsername}>{username}</span>
					{comment.replying_to_username && (
						<>
							<span className={styles.replyArrow}>›</span>
							<span className={styles.replyingTo}>@{comment.replying_to_username}</span>
						</>
					)}
					<span className={styles.commentDate}>{formatDate(comment.created_at)}</span>
					{comment.edited && <span className={styles.commentEdited}>(editado)</span>}
				</div>

				{isOwner && !isEditing && (
					<div className={styles.commentActions}>
						<button
							onClick={() => setIsEditing(true)}
							className={styles.commentActionButton}
							type='button'
						>
							Editar
						</button>
						<button
							onClick={handleDelete}
							className={clsx(styles.commentActionButton, styles.deleteButton)}
							type='button'
						>
							Eliminar
						</button>
					</div>
				)}
			</div>

			{isEditing ? (
				<CommentForm
					animeId={comment.anime_id}
					episodeId={comment.episode_id}
					editingComment={comment}
					onCancel={() => setIsEditing(false)}
					onSuccess={() => setIsEditing(false)}
					onCommentUpdated={onCommentUpdated}
					isAuthenticated={true}
					currentUserId={currentUserId}
				/>
			) : (
				<div className={styles.commentContent}>
					<MarkdownRenderer content={comment.content} />
				</div>
			)}

			<div className={styles.commentFooter}>
				<LikeButton
					commentId={comment.id}
					initialLikeCount={comment.like_count || 0}
					initialIsLiked={comment.user_has_liked || false}
					initialDislikeCount={comment.dislike_count || 0}
					initialIsDisliked={comment.user_has_disliked || false}
					isAuthenticated={!!currentUserId}
				/>

				{canReply && (
					<button
						onClick={() => setShowReplyForm(!showReplyForm)}
						className={styles.replyButton}
						type='button'
					>
						Responder
					</button>
				)}

				{comment.replies && comment.replies.length > 0 && (
					<button
						onClick={() => setShowReplies(!showReplies)}
						className={styles.toggleRepliesButton}
						type='button'
					>
						{showReplies ? 'Ocultar' : 'Ver'} {comment.replies.length} respuesta
						{comment.replies.length !== 1 ? 's' : ''}
					</button>
				)}
			</div>

			{showReplyForm && (
				<div className={styles.replyFormContainer}>
					<CommentForm
						animeId={comment.anime_id}
						episodeId={comment.episode_id}
						parentId={comment.id}
						onCancel={() => setShowReplyForm(false)}
						onSuccess={() => setShowReplyForm(false)}
						onCommentAdded={onCommentAdded}
						isAuthenticated={!!currentUserId}
						placeholder={`Responder a @${username}...`}
						currentUserId={currentUserId}
						replyingToUser={username}
					/>
				</div>
			)}

			{showReplies && comment.replies && comment.replies.length > 0 && (
				<div className={styles.commentReplies}>
					<CommentsList
						comments={comment.replies as any}
						currentUserId={currentUserId}
						level={level + 1}
						onCommentDeleted={onCommentDeleted}
						onCommentUpdated={onCommentUpdated}
						onCommentAdded={onCommentAdded}
					/>
				</div>
			)}
		</div>
	)
}
