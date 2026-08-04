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
	const activeIndex = Math.max(
		buttonsData.findIndex(({ animeId }) => animeId === currentSlideId),
		0,
	)

	const createButtonClassName = (animeId: string) =>
		clsx(styles.navigateButton, animeId === currentSlideId && styles.active)

	const createButtonStyle = (index: number) => {
		const distanceFromActive = Math.abs(index - activeIndex)

		return {
			'--navigation-scale':
				distanceFromActive === 0 ? 1.14 : Math.max(0.9, 1.1 - distanceFromActive * 0.055),
			'--navigation-depth': buttonsData.length - distanceFromActive,
		} as React.CSSProperties
	}

	const createHandleClick = (animeId: string) => () => setCurrentSlide(animeId)

	return (
		<div className={styles.navigateButtons}>
			<div className={styles.containerButtons}>
				{buttonsData.map(({ title, animeId, images }, index) => (
					<NavigationButton
						key={animeId}
						animeId={animeId}
						title={title}
						className={createButtonClassName(animeId)}
						style={createButtonStyle(index)}
						images={images}
						onClick={createHandleClick(animeId)}
					/>
				))}
			</div>
		</div>
	)
}
