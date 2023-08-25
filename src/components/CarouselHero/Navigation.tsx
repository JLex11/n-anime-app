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

export const CarouselNavigation = ({ buttonsData, currentSlideId, setCurrentSlide }: Props) => {
  return (
    <div className={styles.navigateButtons}>
      <div className={styles.containerButtons}>
        {buttonsData.map(({ title, animeId }) => {
          const buttonClass = clsx(styles.navigateButton, animeId === currentSlideId && styles.active)

          return (
            <button
              key={animeId}
              className={buttonClass}
              data-anime-id={animeId}
              title={title}
              onClick={() => setCurrentSlide(animeId)}
            />
          )
        })}
      </div>
    </div>
  )
}
