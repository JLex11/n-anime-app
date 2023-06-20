import { autoCompleteHotKeys } from '@/enums'
import { memo } from 'react'
import { SearchLauncher } from '../Autocomplete/SearchLauncher'
import { ShortcutLetter } from '../Common/ShortcutLetter'
import UserIcon from '../Icons/UserIcon'
import styles from './Header.module.css'

const Tools = () => {
  return (
    <div className={styles.tools}>
      <SearchLauncher className={styles.searchButton}>
        Buscar
        <ShortcutLetter letters={autoCompleteHotKeys.LAUNCH} />
      </SearchLauncher>
      <UserIcon />
    </div>
  )
}

export default memo(Tools)
