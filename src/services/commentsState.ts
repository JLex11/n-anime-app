import type { CommentWithReplies } from '@/types'

export function addReplyToThread(
	comments: CommentWithReplies[],
	reply: CommentWithReplies
): CommentWithReplies[] {
	return comments.map(comment => {
		// Si este es el thread al que pertenece
		if (comment.id === reply.parent_id) {
			return {
				...comment,
				replies: [...(comment.replies || []), reply],
			}
		}
		// Si el thread está en las respuestas, buscar recursivamente
		if (comment.replies && comment.replies.length > 0) {
			return {
				...comment,
				replies: addReplyToThread(comment.replies as CommentWithReplies[], reply),
			}
		}
		return comment
	})
}

export function deleteCommentFromState(
	comments: CommentWithReplies[],
	commentId: string
): CommentWithReplies[] {
	return comments
		.filter(comment => comment.id !== commentId)
		.map(comment => ({
			...comment,
			replies: comment.replies
				? deleteCommentFromState(
						comment.replies as CommentWithReplies[],
						commentId
				  )
				: [],
		}))
}

export function updateCommentInState(
	comments: CommentWithReplies[],
	commentId: string,
	content: string
): CommentWithReplies[] {
	return comments.map(comment => {
		if (comment.id === commentId) {
			return { ...comment, content, edited: true }
		}
		if (comment.replies && comment.replies.length > 0) {
			return {
				...comment,
				replies: updateCommentInState(
					comment.replies as CommentWithReplies[],
					commentId,
					content
				),
			}
		}
		return comment
	})
}

export function findRootThreadId(
	comments: CommentWithReplies[],
	targetId: string
): string | null {
	for (const comment of comments) {
		if (comment.id === targetId) return comment.id

		// Buscar recursivamente en replies
		if (comment.replies && comment.replies.length > 0) {
			if (findCommentInTree(comment.replies as CommentWithReplies[], targetId)) {
				return comment.id
			}
		}
	}
	return null
}

function findCommentInTree(comments: CommentWithReplies[], id: string): boolean {
	for (const c of comments) {
		if (c.id === id) return true
		if (
			c.replies &&
			c.replies.length > 0 &&
			findCommentInTree(c.replies as CommentWithReplies[], id)
		) {
			return true
		}
	}
	return false
}
