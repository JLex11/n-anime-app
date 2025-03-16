import clsx from 'clsx'
import styles from './Carousel.module.css'
import { NavigationButton } from './NavigationButton'

type buttonData = {
	title: string
	animeId: string
	images: (string | undefined | null)[]
}

interface Props {
	buttonsData: buttonData[]
	currentSlideId: string
	setCurrentSlide: (animeId: string) => void
}

export function CarouselNavigation({ buttonsData, currentSlideId, setCurrentSlide }: Props) {
	const createButtonClassName = (animeId: string) =>
		clsx(styles.navigateButton, animeId === currentSlideId && styles.active)

	const createHandleClick = (animeId: string) => () => setCurrentSlide(animeId)

	return (
		<div className={styles.navigateButtons}>
			<div className={styles.containerButtons}>
				{buttonsData.map(({ title, animeId, images }) => (
					<NavigationButton
						key={animeId}
						animeId={animeId}
						title={title}
						className={createButtonClassName(animeId)}
						images={images}
						onClick={createHandleClick(animeId)}
					/>
				))}
			</div>
		</div>
	)
}
