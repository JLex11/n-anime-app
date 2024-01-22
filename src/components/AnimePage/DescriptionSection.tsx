import styles from './Anime.module.css'

export function Description({ description }: { description: string }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Descripcion</h2>
      <p className={styles.sectionDescription}>
        {description || 'Descripcion no disponible'}
      </p>
    </section>
  )
}
