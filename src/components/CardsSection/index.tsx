import { GridContainer } from '../Common/GridContainer'
import styles from './CardsSection.module.css'
import { CardsSectionHeader } from './CardsSectionHeader'

interface Props {
  title?: string
  icon?: React.ReactNode
  gridWidth?: number
  gridHeight?: number
  gridGap?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export function CardsSection({
  title,
  icon,
  gridWidth,
  gridHeight,
  gridGap,
  style,
  children
}: Props) {
  return (
    <section className={styles.latestSection} style={style}>
      <div className={styles.content}>
        {!!title && <CardsSectionHeader title={title} icon={icon} />}
        <GridContainer width={gridWidth} height={gridHeight} gap={gridGap}>
          {children}
        </GridContainer>
      </div>
    </section>
  )
}
