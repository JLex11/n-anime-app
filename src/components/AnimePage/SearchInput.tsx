'use client'

import { useDebounce } from '@/hooks/useDebounce'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './Anime.module.css'

interface InputProps {
  query: string
}

export function SearchInput({ query }: InputProps) {
  const [queryValue, setQueryValue] = useState(query)
  const searchQuery = useDebounce(queryValue, 300)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    searchQuery.length > 0
      ? params.set('query', searchQuery)
      : params.delete('query')
    router.replace(`?${params.toString()}`)
  }, [searchQuery, router, searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setQueryValue(target.value)
  }

  const inputContainerClass = clsx(
    styles.inputContainer,
    query.length > 0 && styles.active
  )

  return (
    <div className={inputContainerClass}>
      <input
        className={styles.inputSearch}
        type='search'
        defaultValue={query}
        onChange={handleChange}
      />
    </div>
  )
}
