import clsx from 'clsx'
import styles from './Pill.module.css'

interface CSSProps extends React.CSSProperties {
  '--pill-color'?: string
  '--pill-bg'?: string
}

export interface PillProps {
  label?: string
  color?: string
  bgColor?: string
  className?: string
}

const dfGradient = 'linear-gradient(175deg, #ffb800, #c38c00)'
const dfColor = '#fff'

export function Pill({
  label,
  color = dfColor,
  bgColor = dfGradient,
  className
}: PillProps) {
  const pillStyles: CSSProps = {
    '--pill-color': color,
    '--pill-bg': bgColor
  }

  return (
    <span className={clsx(styles.pill, className)} style={pillStyles}>
      {label}
    </span>
  )
}
