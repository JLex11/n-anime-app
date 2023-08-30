import { GridContainer } from '../Common/GridContainer'
import styles from './CardsSection.module.css'
import { CardsSectionHeader } from './CardsSectionHeader'

interface Props {
  title?: string
  icon?: React.ReactNode
  gridWidth?: number
  gridHeight?: number
  children: React.ReactNode
}

export function CardsSection({ title, icon, gridWidth, gridHeight, children }: Props) {
  return (
    <section className={styles.latestSection}>
      <div className={styles.content}>
        {!!title && <CardsSectionHeader title={title} icon={icon} />}
        <GridContainer width={gridWidth} height={gridHeight}>
          {children}
        </GridContainer>
      </div>
    </section>
  )
}
