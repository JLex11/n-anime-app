import styles from './GridContainer.module.css'

interface Props {
  children: React.ReactNode
  width?: number
  height?: number
  gap?: string
}

interface CSSProperties extends React.CSSProperties {
  '--grid-width'?: string
  '--grid-height'?: string
  '--grid-gap'?: string
}

export function GridContainer({ children, width, height, gap }: Props) {
  const gridStyles: CSSProperties = {
    '--grid-width': `${width || 200}px`,
    '--grid-height': `${height || 360}px`,
    '--grid-gap': gap || '2rem'
  }

  return (
    <div className={styles.gridContainer} style={gridStyles}>
      {children}
    </div>
  )
}
