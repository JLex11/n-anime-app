'use client'

import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import styles from './Comments.module.css'

interface Props {
	content: string
}

/**
 * Markdown renderer usando react-markdown
 * Soporta GitHub Flavored Markdown y sanitiza HTML
 */
export const MarkdownRenderer = memo(function MarkdownRenderer({ content }: Props) {
	return (
		<div className={styles.markdown}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeSanitize]}
				components={{
					// Links abiertos en nueva pestaña
					a: ({ node, ...props }) => (
						<a {...props} target="_blank" rel="noopener noreferrer" />
					),
					// Mantener estilos de código inline
					code: ({ node, ...props }) => <code {...props} />,
					// Párrafos con breaks
					p: ({ node, ...props }) => <p {...props} />,
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	)
})
