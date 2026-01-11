'use client'

import { useState, useTransition, useRef, useLayoutEffect } from 'react'
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
	currentUserProfile?: {
		username: string | null
		avatar_url: string | null
	} | null
	onExpandReplies?: () => void
}

export function CommentItem({
	comment,
	currentUserId,
	level,
	onCommentDeleted,
	onCommentUpdated,
	onCommentAdded,
	currentUserProfile,
	onExpandReplies,
}: Props) {
	const [isEditing, setIsEditing] = useState(false)
	const [showReplyForm, setShowReplyForm] = useState(false)
	const [isDeleting, startDeleteTransition] = useTransition()
	const [showReplies, setShowReplies] = useState(level === 0)
	const commentRef = useRef<HTMLDivElement>(null)
	const prevReplyCountRef = useRef(comment.replies?.length || 0)

	// Auto-expandir y hacer scroll cuando se agregan nuevas respuestas a comentarios de nivel 1
	useLayoutEffect(() => {
		const currentReplyCount = comment.replies?.length || 0
		const hasNewReply = currentReplyCount > prevReplyCountRef.current

		if (hasNewReply && level === 1) {
			// Si este es un comentario de nivel 1 y recibió una nueva respuesta,
			// expandir las respuestas si están ocultas
			if (!showReplies) {
				setShowReplies(true)
			}

			// Usar requestAnimationFrame para sincronizar con el ciclo de renderizado
			requestAnimationFrame(() => {
				// Doble RAF para asegurar que el layout se haya calculado
				requestAnimationFrame(() => {
					// Buscar el último comentario hijo (la nueva respuesta)
					const lastReply = commentRef.current?.querySelector(
						`.${styles.commentReplies} > .${styles.commentsList} > div:last-child`
					)

					if (lastReply) {
						lastReply.scrollIntoView({
							behavior: 'smooth',
							block: 'nearest',
						})
					}
				})
			})
		}

		// Si este comentario recién se agregó como respuesta a un nivel 1, notificar al padre
		if (level === 2 && hasNewReply && onExpandReplies) {
			onExpandReplies()
		}

		prevReplyCountRef.current = currentReplyCount
	}, [comment.replies?.length, level, showReplies, onExpandReplies])

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
		<div ref={commentRef} className={styles.commentItem} data-level={level}>
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
					currentUserProfile={currentUserProfile}
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

				{comment.replies && comment.replies.length > 0 && level <= 1 && (
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
						currentUserProfile={currentUserProfile}
					/>
				</div>
			)}

			{((showReplies && level <= 1) || level > 1) &&
				comment.replies &&
				comment.replies.length > 0 && (
					<div className={styles.commentReplies}>
						<CommentsList
							comments={comment.replies as any}
							currentUserId={currentUserId}
							level={level + 1}
							onCommentDeleted={onCommentDeleted}
							onCommentUpdated={onCommentUpdated}
							onCommentAdded={onCommentAdded}
							currentUserProfile={currentUserProfile}
							onExpandReplies={level === 1 ? () => setShowReplies(true) : undefined}
						/>
					</div>
				)}
		</div>
	)
}
