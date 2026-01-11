import { CommentItem } from './CommentItem'
import type { CommentWithReplies } from '@/types'
import styles from './Comments.module.css'

interface Props {
	comments: CommentWithReplies[]
	currentUserId?: string
	level?: number
	onCommentDeleted?: (commentId: string) => void
	onCommentUpdated?: (commentId: string, content: string) => void
	onCommentAdded?: (optimisticComment: CommentWithReplies, realComment?: CommentWithReplies) => void
	currentUserProfile?: {
		username: string | null
		avatar_url: string | null
	} | null
	onExpandReplies?: () => void
}

export function CommentsList({
	comments,
	currentUserId,
	level = 0,
	onCommentDeleted,
	onCommentUpdated,
	onCommentAdded,
	currentUserProfile,
	onExpandReplies,
}: Props) {
	return (
		<div className={styles.commentsList} data-level={level}>
			{comments.map(comment => (
				<CommentItem
					key={comment.id}
					comment={comment}
					currentUserId={currentUserId}
					level={level}
					onCommentDeleted={onCommentDeleted}
					onCommentUpdated={onCommentUpdated}
					onCommentAdded={onCommentAdded}
					currentUserProfile={currentUserProfile}
					onExpandReplies={onExpandReplies}
				/>
			))}
		</div>
	)
}
