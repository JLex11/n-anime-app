import clsx from 'clsx'
import LoadingIcon from '../Icons/LoadingIcon'
import styles from './EpisodeList.module.css'

type ButtonMoreProps = {
	handleClick: () => void
	isPending?: boolean
}

export const ButtonMore = ({ handleClick, isPending = false }: ButtonMoreProps) => {
	const buttonClass = clsx(styles.listItem, styles.buttonMore, isPending && styles.loadingMore)

	return (
		<li>
			<button className={buttonClass} onClick={handleClick} type='button'>
				{isPending ? (
					<div className='page-loader'>
						<LoadingIcon />
					</div>
				) : (
					<span>Cargar mas</span>
				)}
			</button>
		</li>
	)
}
