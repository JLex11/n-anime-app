import styles from '@/styles/Autocomplete.module.css'
import { ShortcutLetter } from '../Common/ShortcutLetter'

export const CollectionsPanelFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.shortcuts}>
        <ShortcutLetter letters='↵' className={styles.footerIcon}>
          <span className={styles.footerText}>To select</span>
        </ShortcutLetter>
        <ShortcutLetter letters='↑ ↓' className={styles.footerIcon}>
          <span className={styles.footerText}>To navigate</span>
        </ShortcutLetter>
      </div>
      <p className={styles.footerText}>
        <span className={styles.footerText}>Create by Alex ❤️</span>
      </p>
    </footer>
  )
}
