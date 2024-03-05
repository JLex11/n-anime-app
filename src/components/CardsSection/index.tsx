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
  order?: number
  column?: string
  children: React.ReactNode
}

export function CardsSection({ title, icon, gridProps, order, column, children }: Props) {
  const cssVariables = {
    '--section-grid-order': order,
    '--section-grid-column': column
  } as React.CSSProperties

  return (
    <section className={styles.latestSection} style={cssVariables}>
      <div className={styles.content}>
        {title && <CardsSectionHeader title={title} icon={icon} />}
        <GridContainer {...gridProps}>{children}</GridContainer>
      </div>
    </section>
  )
}
