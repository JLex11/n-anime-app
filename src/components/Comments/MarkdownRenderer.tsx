'use client'

import { memo } from 'react'
import styles from './Comments.module.css'

interface Props {
	content: string
}

/**
 * Simple markdown renderer
 * Uses browser's native rendering for basic markdown
 * Can be replaced with react-markdown if needed
 */
export const MarkdownRenderer = memo(function MarkdownRenderer({ content }: Props) {
	// Basic markdown parsing
	const parseMarkdown = (text: string): string => {
		let html = text

		// Escape HTML
		html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

		// Bold
		html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

		// Italic
		html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

		// Code inline
		html = html.replace(/`(.+?)`/g, '<code>$1</code>')

		// Links
		html = html.replace(
			/\[(.+?)\]\((.+?)\)/g,
			'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
		)

		// @mentions
		html = html.replace(/@([a-zA-Z0-9_.-]+)/g, '<span class="' + styles.mention + '">@$1</span>')

		// Line breaks
		html = html.replace(/\n/g, '<br />')

		return html
	}

	return <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
})
