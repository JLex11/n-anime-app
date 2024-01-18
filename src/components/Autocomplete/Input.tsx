import clsx from 'clsx'
import { ShortcutLetter } from '../Common/ShortcutLetter'
import LoadingIcon from '../Icons/LoadingIcon'
import styles from './Autocomplete.module.css'

interface InputProps {
  status: 'loading' | 'idle' | 'stalled' | 'error'
  inputRef: React.RefObject<HTMLInputElement>
  inputProps: any
}

export function Input({ status, inputRef, inputProps }: InputProps) {
  const loadingIconClass = clsx(styles.inputIcon, styles.loadingIcon)

  return (
    <div className={styles.inputContainer}>
      <input className={styles.inputSearch} ref={inputRef} {...inputProps} />
      <div className={styles.containerInputIcons}>
        {status === 'loading' && <LoadingIcon className={loadingIconClass} />}
        {status !== 'loading' && (
          <ShortcutLetter letters='esc' className={styles.inputIcon} />
        )}
      </div>
    </div>
  )
}
