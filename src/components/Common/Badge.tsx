import styles from './CustomElements.module.css'

interface CSSProps extends React.CSSProperties {
  '--padding'?: string
  '--bd-radius'?: string
  '--bg-color'?: string
}

interface BadgeProps {
  children: React.ReactNode
  padding?: string
  radius?: string
  background?: string
}

export function Badge({ children, padding, radius, background }: BadgeProps) {
  const cssStyles: CSSProps = {
    '--padding': padding || '0.3rem 0.6rem',
    '--bd-radius': radius || '0.6rem',
    '--bg-color': background || '#ffffff38'
  }

  return (
    <span style={cssStyles} className={styles.badge}>
      {children}
    </span>
  )
}
