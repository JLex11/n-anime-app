'use client'

import { useTransition, useOptimistic } from 'react'
import { toggleCommentLike, toggleCommentDislike } from '@/app/actions/comments'
import styles from './Comments.module.css'
import clsx from 'clsx'

interface Props {
	commentId: string
	initialLikeCount: number
	initialIsLiked: boolean
	initialDislikeCount: number
	initialIsDisliked: boolean
	isAuthenticated: boolean
}

export function LikeButton({
	commentId,
	initialLikeCount,
	initialIsLiked,
	initialDislikeCount,
	initialIsDisliked,
	isAuthenticated,
}: Props) {
	const [isPending, startTransition] = useTransition()
	const [optimisticState, setOptimisticState] = useOptimistic(
		{ 
			likeCount: initialLikeCount, 
			isLiked: initialIsLiked,
			dislikeCount: initialDislikeCount,
			isDisliked: initialIsDisliked,
		},
		(state, action: { type: 'like' | 'dislike' }) => {
			if (action.type === 'like') {
				const newIsLiked = !state.isLiked
				return {
					...state,
					likeCount: state.likeCount + (newIsLiked ? 1 : -1),
					isLiked: newIsLiked,
					// Si damos like, quitar dislike si existe
					dislikeCount: state.isDisliked ? state.dislikeCount - 1 : state.dislikeCount,
					isDisliked: false,
				}
			} else {
				const newIsDisliked = !state.isDisliked
				return {
					...state,
					dislikeCount: state.dislikeCount + (newIsDisliked ? 1 : -1),
					isDisliked: newIsDisliked,
					// Si damos dislike, quitar like si existe
					likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount,
					isLiked: false,
				}
			}
		}
	)

	const handleLike = () => {
		if (!isAuthenticated) {
			window.location.href = `/login?redirect=${window.location.pathname}`
			return
		}

		startTransition(async () => {
			setOptimisticState({ type: 'like' })
			await toggleCommentLike(commentId)
		})
	}

	const handleDislike = () => {
		if (!isAuthenticated) {
			window.location.href = `/login?redirect=${window.location.pathname}`
			return
		}

		startTransition(async () => {
			setOptimisticState({ type: 'dislike' })
			await toggleCommentDislike(commentId)
		})
	}

	return (
		<div className={styles.likeDislikeContainer}>
			<button
				onClick={handleLike}
				disabled={isPending}
				className={clsx(styles.likeButton, optimisticState.isLiked && styles.likeButtonActive)}
				type='button'
				aria-label={optimisticState.isLiked ? 'Quitar like' : 'Dar like'}
			>
				<svg
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill={optimisticState.isLiked ? 'currentColor' : 'none'}
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
				</svg>
				{optimisticState.likeCount > 0 && <span>{optimisticState.likeCount}</span>}
			</button>

			<button
				onClick={handleDislike}
				disabled={isPending}
				className={clsx(styles.dislikeButton, optimisticState.isDisliked && styles.dislikeButtonActive)}
				type='button'
				aria-label={optimisticState.isDisliked ? 'Quitar dislike' : 'Dar dislike'}
			>
				<svg
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill={optimisticState.isDisliked ? 'currentColor' : 'none'}
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M17 14V2' />
					<path d='M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z' />
				</svg>
				{optimisticState.dislikeCount > 0 && <span>{optimisticState.dislikeCount}</span>}
			</button>
		</div>
	)
}
