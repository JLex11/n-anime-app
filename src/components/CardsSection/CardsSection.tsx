import { GridContainer } from '../Common/GridContainer'
import { HomeCard } from '../HomePage/HomeCard'
import styles from './CardsSection.module.css'
import { CardsSectionHeader } from './CardsSectionHeader'

interface SectionData {
  key: string
  title: string
  link: string
  pill?: { label: string }
  imageSrc: string
  fbSrc?: string
  width: number
  height: number
  showOnHover?: React.ReactNode
}

interface Props {
  title: string
  icon: React.ReactNode
  data: SectionData[]
  gridWidth?: number
  gridHeight?: number
}

export const CardsSection = ({ title, icon, data, gridWidth, gridHeight }: Props) => (
  <section className={styles.latestSection}>
    <div className={styles.content}>
      <CardsSectionHeader title={title} icon={icon} />
      <GridContainer width={gridWidth} height={gridHeight}>
        {data.map(({ key, title, link, pill, imageSrc, fbSrc, width, height, showOnHover }) => (
          <HomeCard
            key={key}
            image={{ src: imageSrc, fbSrc, width, height }}
            title={title}
            link={link}
            pill={pill}
            showOnHover={showOnHover}
          />
        ))}
      </GridContainer>
    </div>
  </section>
)
