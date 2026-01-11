'use client'

import styles from './Comments.module.css'
import { LikeButton } from './LikeButton'

interface CommentItemFooterProps {
	commentId: string
	likeCount: number
	userHasLiked: boolean
	dislikeCount: number
	userHasDisliked: boolean
	isAuthenticated: boolean
	canReply: boolean
	onReplyClick: () => void
	replyCount: number
	showReplies: boolean
	onToggleReplies: () => void
	level: number
}

export function CommentItemFooter({
	commentId,
	likeCount,
	userHasLiked,
	dislikeCount,
	userHasDisliked,
	isAuthenticated,
	canReply,
	onReplyClick,
	replyCount,
	showReplies,
	onToggleReplies,
	level,
}: CommentItemFooterProps) {
	return (
		<div className={styles.commentFooter}>
			<LikeButton
				commentId={commentId}
				initialLikeCount={likeCount}
				initialIsLiked={userHasLiked}
				initialDislikeCount={dislikeCount}
				initialIsDisliked={userHasDisliked}
				isAuthenticated={isAuthenticated}
			/>

			{canReply && (
				<button
					onClick={onReplyClick}
					className={styles.replyButton}
					type='button'
				>
					Responder
				</button>
			)}

			{replyCount > 0 && level <= 1 && (
				<button
					onClick={onToggleReplies}
					className={styles.toggleRepliesButton}
					type='button'
				>
					{showReplies ? 'Ocultar' : 'Ver'} {replyCount} respuesta
					{replyCount !== 1 ? 's' : ''}
				</button>
			)}
		</div>
	)
}
