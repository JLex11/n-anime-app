import { autoCompleteHotKeys } from '@/enums'
import { SearchLauncher } from '../Autocomplete/SearchLauncher'
import { ShortcutLetter } from '../Common/ShortcutLetter'
import UserIcon from '../Icons/UserIcon'
import styles from './Header.module.css'

export const Tools = () => {
  return (
    <div className={styles.tools}>
      <SearchLauncher className={styles.searchButton}>
        <span>Buscar</span>
        <ShortcutLetter letters={autoCompleteHotKeys.LAUNCH} />
      </SearchLauncher>
      <UserIcon />
    </div>
  )
}
