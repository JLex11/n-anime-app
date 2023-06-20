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

export const GridContainer = ({ children, width, height, gap }: Props) => {
  const gridStyles: CSSProperties = {
    '--grid-width': `${width || 270}px`,
    '--grid-height': `${height || 450}px`,
    '--grid-gap': gap || '2rem',
  }

  return (
    <div className={styles.gridContainer} style={gridStyles}>
      {children}
    </div>
  )
}
