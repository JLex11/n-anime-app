import clsx from 'clsx'
import { GridContainer } from '../Common/GridContainer'
import { HomeCard } from '../HomePage/HomeCard'
import styles from './CardsSection.module.css'

interface SectionData {
  key: string
  title: string
  link: string
  pill?: { label: string }
  imageSrc: string
  fbSrc?: string
  width: number
  height: number
}

interface Props {
  title: string
  icon: React.ReactNode
  data: SectionData[]
  gridWidth?: number
  gridHeight?: number
  children?: React.ReactNode
}

export const CardsSection = ({ title, icon, data, gridWidth, gridHeight, children }: Props) => {
  const cssClass = clsx(styles.latestSection, [children && styles.hasAside])

  return (
    <section className={cssClass}>
      <div className={styles.content}>
        <header className={styles.contentHeader}>
          <h2 className={styles.title}>
            {icon}
            {title}
          </h2>
        </header>
        <GridContainer width={gridWidth} height={gridHeight}>
          {data.map(({ key, title, link, pill, imageSrc, fbSrc, width, height }) => (
            <HomeCard key={key} image={{ src: imageSrc, fbSrc, width, height }} title={title} link={link} pill={pill} />
          ))}
        </GridContainer>
      </div>
      {children}
    </section>
  )
}
