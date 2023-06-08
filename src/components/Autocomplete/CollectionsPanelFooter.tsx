import styles from '@/styles/Autocomplete.module.css'
import { ShortcutLetter } from '../Common/ShortcutLetter'

export const CollectionsPanelFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.shortcuts}>
        <ShortcutLetter letters='↵' className={styles.footerIcon}>
          <span className={styles.footerText}>Seleccionar</span>
        </ShortcutLetter>
        <ShortcutLetter letters='↑ ↓' className={styles.footerIcon}>
          <span className={styles.footerText}>Navegar</span>
        </ShortcutLetter>
      </div>
      <p className={styles.footerText}>
        <span className={styles.footerText}>Creado por Alex ❤️</span>
      </p>
    </footer>
  )
}
