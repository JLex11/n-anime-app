'use client'

import { useRef, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { MDEditorProps } from '@uiw/react-md-editor'
import styles from './MarkdownEditor.module.css'

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor').then(mod => mod.default), {
	ssr: false,
})

interface MarkdownEditorProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
	onKeyDown?: (e: React.KeyboardEvent) => void
	autoFocus?: boolean
}

export function MarkdownEditor({
	value,
	onChange,
	placeholder = 'Escribe un comentario... (Markdown soportado)',
	disabled = false,
	onKeyDown,
	autoFocus = false,
}: MarkdownEditorProps) {
	const editorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (autoFocus && editorRef.current) {
			const textarea = editorRef.current.querySelector('textarea')
			if (textarea) {
				textarea.focus()
			}
		}
	}, [autoFocus])

	const handleChange = useCallback(
		(newValue?: string) => {
			onChange(newValue || '')
		},
		[onChange]
	)

	const handleEditorKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			// Permitir Ctrl/Cmd + Enter para enviar
			if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				onKeyDown?.(e)
				return
			}

			// Manejar otros atajos
			if (e.ctrlKey || e.metaKey) {
				switch (e.key) {
					case 'b': // Bold
					case 'i': // Italic
					case 'k': // Link
						// Dejar que el editor maneje estos
						return
					default:
						break
				}
			}
		},
		[onKeyDown]
	)

	return (
		<div className={styles.editorContainer} ref={editorRef}>
			<div className={styles.editorContent} onKeyDown={handleEditorKeyDown}>
				<MDEditor
					value={value}
					onChange={handleChange}
					preview='live'
					visibleDragbar={false}
					height="auto"
					textareaProps={{
						placeholder,
						disabled,
					}}
					previewOptions={{
						rehypeRewrite: (node: any) => {
							// Asegurar que los links se abran en nueva pestaña
							if (node.tagName === 'a') {
								node.properties = {
									...node.properties,
									target: '_blank',
									rel: 'noopener noreferrer',
								}
							}
						},
					}}
				/>
			</div>

			<div className={styles.editorHint}>
				<span>Usa @ para mencionar usuarios</span>
				<span>•</span>
				<span>Ctrl/Cmd + Enter para enviar</span>
			</div>
		</div>
	)
}
