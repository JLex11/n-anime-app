'use client'

import { useCommentsContext } from './CommentsContext'
import styles from './Comments.module.css'

export function CommentsHeader() {
	const { count } = useCommentsContext()

	return (
		<div className={styles.commentsHeader}>
			<h2 className={styles.commentsTitle}>
				Comentarios {count > 0 && `(${count})`}
			</h2>
		</div>
	)
}
