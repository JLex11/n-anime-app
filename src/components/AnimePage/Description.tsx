import styles from '@/styles/Anime.module.css'

export const Description = ({ description }: { description: string }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Description</h2>
      <p className={styles.description}>{description || 'No description available'}</p>
    </section>
  )
}
