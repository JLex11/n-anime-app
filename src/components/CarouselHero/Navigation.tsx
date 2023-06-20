import styles from './Carousel.module.css'

type buttonData = {
  title: string
  animeId: string
  isActive: boolean
}

interface Props {
  buttonsData: buttonData[]
  setCurrentSlide: (animeId: string) => void
}

export const CarouselNavigation = ({ buttonsData, setCurrentSlide }: Props) => {
  return (
    <div className={styles.navigateButtons}>
      <div className={styles.containerButtons}>
        {buttonsData.map(({ title, animeId, isActive }) => (
          <button
            key={animeId}
            className={`${styles.navigateButton} ${isActive ? styles.active : ''}`}
            data-anime-id={animeId}
            title={title}
            onClick={() => setCurrentSlide(animeId)}
          />
        ))}
      </div>
    </div>
  )
}
