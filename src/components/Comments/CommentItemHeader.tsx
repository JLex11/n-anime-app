'use client'

import clsx from 'clsx'
import styles from './Comments.module.css'
import { CommentItemAvatar } from './CommentItemAvatar'

interface CommentItemHeaderProps {
	username: string
	avatarUrl?: string | null
	date: string
	edited?: boolean
	replyingToUsername?: string | null
	parentId?: string | null
	isOwner: boolean
	isEditing: boolean
	onEditClick: () => void
	onDeleteClick: () => void
}

export function CommentItemHeader({
	username,
	avatarUrl,
	date,
	edited,
	replyingToUsername,
	parentId,
	isOwner,
	isEditing,
	onEditClick,
	onDeleteClick,
}: CommentItemHeaderProps) {
	const handleReplyingToClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (parentId) {
			const allHighlighted = document.querySelectorAll(`.${styles.commentHighlight}`)
			allHighlighted.forEach(el => el.classList.remove(styles.commentHighlight))
			
			const parentElement = document.querySelector(
				`.${styles.commentItem}[data-comment-id="${parentId}"]`
			) as HTMLElement
			
			if (parentElement) {
				parentElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
				parentElement.classList.add(styles.commentHighlight)
				setTimeout(() => {
					parentElement.classList.remove(styles.commentHighlight)
				}, 1500)
			}
		}
	}

	return (
		<div className={styles.commentHeader}>
			<div className={styles.commentAuthor}>
				<CommentItemAvatar avatarUrl={avatarUrl} username={username} />
				<span className={styles.commentUsername}>{username}</span>
				{replyingToUsername && (
					<>
						<span className={styles.replyArrow}>›</span>
						<span 
							className={styles.replyingTo}
							onClick={handleReplyingToClick}
						>
							@{replyingToUsername}
						</span>
					</>
				)}
				<span className={styles.commentDate}>{date}</span>
				{edited && <span className={styles.commentEdited}>(editado)</span>}
			</div>

			{isOwner && !isEditing && (
				<div className={styles.commentActions}>
					<button
						onClick={onEditClick}
						className={styles.commentActionButton}
						type='button'
					>
						Editar
					</button>
					<button
						onClick={onDeleteClick}
						className={clsx(styles.commentActionButton, styles.deleteButton)}
						type='button'
					>
						Eliminar
					</button>
				</div>
			)}
		</div>
	)
}
