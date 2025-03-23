import clsx from 'clsx'
import { memo } from 'react'
import { ShortcutLetter } from '../Common/ShortcutLetter'
import LoadingIcon from '../Icons/LoadingIcon'
import styles from './Autocomplete.module.css'

interface InputProps {
	status: 'loading' | 'idle' | 'stalled' | 'error'
	inputRef: React.RefObject<HTMLInputElement>
	inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export const Input = memo(function Input({ status, inputRef, inputProps }: InputProps) {
	const loadingIconClass = clsx(styles.inputIcon, styles.loadingIcon)
	const isLoading = status === 'loading'

	return (
		<div className={styles.inputContainer}>
			<input 
				className={styles.inputSearch} 
				ref={inputRef} 
				aria-label="Buscar animes o páginas"
				{...inputProps} 
			/>
			<div className={styles.containerInputIcons}>
				{isLoading ? (
					<LoadingIcon className={loadingIconClass} aria-hidden="true" />
				) : (
					<ShortcutLetter 
						letters='esc' 
						className={styles.inputIcon} 
						aria-label="Presiona Escape para cerrar"
					/>
				)}
			</div>
		</div>
	)
})
