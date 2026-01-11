'use client'

import { ReactNode } from 'react'
import { CommentsProvider } from './CommentsContext'
import { CommentsHeader } from './CommentsHeader'
import styles from './Comments.module.css'

interface Props {
	children: ReactNode
}

export function CommentsContainer({ children }: Props) {
	return (
		<CommentsProvider>
			<div className={styles.commentsSection}>
				{/* 1. Header - Se muestra INMEDIATAMENTE */}
				<CommentsHeader />

				{/* 2. Form y Lista - Pasados como children desde el Server Component */}
				{children}
			</div>
		</CommentsProvider>
	)
}
