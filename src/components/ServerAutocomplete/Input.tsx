'use client'

import { useDebounce } from '@/hooks/useDebounce'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ShortcutLetter } from '../Common/ShortcutLetter'
import styles from './ServerAutocomplete.module.css'
import { AutocompleteVars } from './autocompleteTypes'

interface InputProps {
  query: string
}

export function AutocompleteInput({ query }: InputProps) {
  const [queryValue, setQueryValue] = useState('')
  const searchQuery = useDebounce(queryValue, 300)
  const router = useRouter()

  useEffect(() => {
    router.push(`?${AutocompleteVars.QUERY_NAME}=${searchQuery}`)
  }, [searchQuery, router, query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setQueryValue(target.value)
  }

  const inputContainerClass = clsx(styles.inputContainer, query.length > 0 && styles.active)

  return (
    <div className={inputContainerClass}>
      <input className={styles.inputSearch} type='search' defaultValue={query} onChange={handleChange} autoFocus />
      <div className={styles.containerInputIcons}>
        {/* {status === 'loading' && <LoadingIcon className={loadingIconClass} />} */}
        {/* status !== 'loading' &&  */ <ShortcutLetter letters='esc' className={styles.inputIcon} />}
      </div>
    </div>
  )
}
