import styles from './CardsSection.module.css'

interface Props {
  title: string
  icon: React.ReactNode
}

export function CardsSectionHeader({ icon, title }: Props) {
  return (
    <header className={styles.contentHeader}>
      <h2 className={styles.title}>
        {icon}
        {title}
      </h2>
    </header>
  )
}
