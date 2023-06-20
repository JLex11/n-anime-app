import { ShortcutLetter } from '../Common/ShortcutLetter'
import styles from './Autocomplete.module.css'

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
