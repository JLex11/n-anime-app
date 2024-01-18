import clsx from 'clsx'
import styles from './Carousel.module.css'

type buttonData = {
  title: string
  animeId: string
}

interface Props {
  buttonsData: buttonData[]
  currentSlideId: string
  setCurrentSlide: (animeId: string) => void
}

export function CarouselNavigation({
  buttonsData,
  currentSlideId,
  setCurrentSlide
}: Props) {
  const createButtonClass = (animeId: string) =>
    clsx(styles.navigateButton, animeId === currentSlideId && styles.active)

  const createHandleClick = (animeId: string) => () => setCurrentSlide(animeId)

  return (
    <div className={styles.navigateButtons}>
      <div className={styles.containerButtons}>
        {buttonsData.map(({ title, animeId }) => (
          <button
            key={animeId}
            type='button'
            className={createButtonClass(animeId)}
            data-anime-id={animeId}
            title={title}
            onClick={createHandleClick(animeId)}
          />
        ))}
      </div>
    </div>
  )
}
