import clsx from 'clsx'
import styles from './SkeletonBase.module.css'

interface SkeletonBaseProps {
	width?: string
	height?: string
	variant?: 'rectangle' | 'circle' | 'text'
	className?: string
	style?: React.CSSProperties
}

export function SkeletonBase({
	width = '100%',
	height = '1.3rem',
	variant = 'rectangle',
	className,
	style
}: SkeletonBaseProps) {
	const variantClass = {
		rectangle: styles.skeleton,
		circle: styles.skeletonCircle,
		text: styles.skeletonText
	}[variant]

	return (
		<div
			className={clsx(variantClass, className)}
			style={{ width, height, ...style }}
			aria-busy='true'
			aria-label='Cargando...'
		/>
	)
}
