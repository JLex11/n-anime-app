import styles from '@/styles/CustomElements.module.css'
import clsx from 'clsx'

interface Props {
  letters: string | string[]
  className?: string
  children?: React.ReactNode
}

export const ShortcutLetter = ({ letters, className: externalClass, children }: Props) => {
  const lettersArray = Array.isArray(letters) ? letters : letters.split(' ')

  const shortcutContainerClass = clsx(styles.shortcutLetters, externalClass)

  return (
    <div className={shortcutContainerClass}>
      {lettersArray.map((letter, index) => (
        <code key={index}>{letter}</code>
      ))}
      {children}
    </div>
  )
}
