'use client'

import { useRef, useLayoutEffect } from 'react'
import { CommentForm } from './CommentForm'
import { MarkdownRenderer } from './MarkdownRenderer'
import { CommentsList } from './CommentsList'
import LoadingIcon from '@/components/Icons/LoadingIcon'
import type { CommentWithReplies } from '@/types'
import styles from './Comments.module.css'
import { useCommentActions } from './hooks/useCommentActions'
import { CommentItemHeader } from './CommentItemHeader'
import { CommentItemFooter } from './CommentItemFooter'

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
	const commentRef = useRef<HTMLDivElement>(null)
	const prevReplyCountRef = useRef(comment.replies?.length || 0)

	const {
		isEditing,
		setIsEditing,
		showReplyForm,
		setShowReplyForm,
		isDeleting,
		showReplies,
		setShowReplies,
		isLoadingReplies,
		handleDelete,
		handleLoadMoreRepliesClick,
		formatDate,
	} = useCommentActions({ comment, onCommentDeleted, level })

	const isOwner = currentUserId === comment.user_id
	const username = comment.user_profile?.username || 'Usuario Anónimo'
	const avatarUrl = comment.user_profile?.avatar_url

	// Auto-expandir y hacer scroll cuando se agregan nuevas respuestas
	useLayoutEffect(() => {
		const currentReplyCount = comment.replies?.length || 0
		const hasNewReply = currentReplyCount > prevReplyCountRef.current

		if (hasNewReply && level === 1) {
			if (!showReplies) {
				setShowReplies(true)
			}

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
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

		if (level === 2 && hasNewReply && onExpandReplies) {
			onExpandReplies()
		}

		prevReplyCountRef.current = currentReplyCount
	}, [comment.replies?.length, level, showReplies, onExpandReplies, setShowReplies])

	if (isDeleting) {
		return (
			<div className={`${styles.commentItem} ${styles.commentDeleted}`}>
				<p>Eliminando comentario...</p>
			</div>
		)
	}

	return (
		<div 
			ref={commentRef} 
			className={styles.commentItem} 
			data-level={level}
			data-comment-id={comment.id}
			data-parent-id={comment.parent_id || ''}
			style={{ 
				viewTransitionName: `comment-${comment.id.replace(/[^a-zA-Z0-9]/g, '_')}` 
			} as any}
		>
			<CommentItemHeader
				username={username}
				avatarUrl={avatarUrl}
				date={formatDate(comment.created_at)}
				edited={comment.edited}
				replyingToUsername={comment.replying_to_username}
				parentId={comment.parent_id}
				isOwner={isOwner}
				isEditing={isEditing}
				onEditClick={() => setIsEditing(true)}
				onDeleteClick={handleDelete}
			/>

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

			<CommentItemFooter
				commentId={comment.id}
				likeCount={comment.like_count || 0}
				userHasLiked={comment.user_has_liked || false}
				dislikeCount={comment.dislike_count || 0}
				userHasDisliked={comment.user_has_disliked || false}
				isAuthenticated={!!currentUserId}
				canReply={true}
				onReplyClick={() => setShowReplyForm(!showReplyForm)}
				replyCount={comment.replies?.length || 0}
				showReplies={showReplies}
				onToggleReplies={() => setShowReplies(!showReplies)}
				level={level}
			/>

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

						{level === 0 && comment.has_hidden_replies && (
							<div className={styles.loadMoreRepliesContainer}>
								<button
									onClick={handleLoadMoreRepliesClick}
									disabled={isLoadingReplies}
									className={styles.loadMoreRepliesButton}
									type="button"
								>
									{isLoadingReplies ? (
										<>
											<LoadingIcon width={16} />
											<span>Cargando...</span>
										</>
									) : (
										`Ver más respuestas (${(comment.reply_count || 0) - (comment.loaded_reply_count || comment.replies.length)})`
									)}
								</button>
							</div>
						)}
					</div>
				)}
		</div>
	)
}
