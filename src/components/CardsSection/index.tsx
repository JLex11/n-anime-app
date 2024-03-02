import { GridContainer } from '../Common/GridContainer'
import styles from './CardsSection.module.css'
import { CardsSectionHeader } from './CardsSectionHeader'

interface Props {
  title?: string
  icon?: React.ReactNode
  gridProps?: {
    width?: string
    height?: string
    gap?: string
    column?: string
  }
  style?: React.CSSProperties
  children: React.ReactNode
}

export function CardsSection({ title, icon, gridProps, style, children }: Props) {
  return (
    <section className={styles.latestSection} style={style}>
      <div className={styles.content}>
        {title && <CardsSectionHeader title={title} icon={icon} />}
        <GridContainer {...gridProps}>{children}</GridContainer>
      </div>
    </section>
  )
}
