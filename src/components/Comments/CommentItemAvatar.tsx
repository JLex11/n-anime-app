'use client'

import styles from './Comments.module.css'

interface CommentItemAvatarProps {
	avatarUrl?: string | null
	username: string
}

export function CommentItemAvatar({ avatarUrl, username }: CommentItemAvatarProps) {
	if (!avatarUrl) return null
	
	return (
		<img src={avatarUrl} alt={username} className={styles.commentAvatar} />
	)
}
