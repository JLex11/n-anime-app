import styles from './GridContainer.module.css'

interface Props {
  children: React.ReactNode
  width?: string
  height?: string
  gap?: string
}

interface CSSProperties extends React.CSSProperties {
  '--grid-width'?: string
  '--grid-height'?: string
  '--grid-gap'?: string
}

export function GridContainer({ children, width, height, gap }: Props) {
  const gridStyles: CSSProperties = {
    '--grid-width': width || '200px',
    '--grid-height': height || '360px',
    '--grid-gap': gap || '2rem'
  }

  return (
    <div className={styles.gridContainer} style={gridStyles}>
      {children}
    </div>
  )
}
