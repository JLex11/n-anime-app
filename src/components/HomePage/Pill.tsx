import styles from '@/styles/HomeCard.module.css'

interface CSSProperties extends React.CSSProperties {
  '--pill-color'?: string
  '--pill-bg'?: string
}

export interface PillProps {
  label?: string
  color?: string
  bgColor?: string
}

const dfGradient = 'linear-gradient(175deg, #ffb800, #c38c00)'
const dfColor = '#fff'

export const Pill = ({ label, color = dfColor, bgColor = dfGradient }: PillProps) => {
  const pillStyles: CSSProperties = {
    '--pill-color': color,
    '--pill-bg': bgColor,
  }

  return (
    <span className={styles.pill} style={pillStyles}>
      {label}
    </span>
  )
}
