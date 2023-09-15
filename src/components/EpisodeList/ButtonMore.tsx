'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useTransition } from 'react'
import LoadingIcon from '../Icons/LoadingIcon'
import styles from './EpisodeList.module.css'

export const ButtonMore = ({ limit }: { limit: number }) => {
  const [isPending, startTransition] = useTransition()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  useEffect(() => {
    const { current: button } = buttonRef
    return () => button?.scrollIntoView({ behavior: 'smooth' })
  }, [isPending])

  const handleClick = () => {
    startTransition(() => {
      router.replace(`?limit=${limit}`, { scroll: false })
    })
  }

  const buttonClass = clsx(styles.listItem, styles.buttonMore, isPending && styles.loadingMore)

  return (
    <li>
      <button className={buttonClass} onClick={handleClick} ref={buttonRef}>
        {isPending ? (
          <div className='page-loader'>
            <LoadingIcon />
          </div>
        ) : (
          <span>Cargar mas</span>
        )}
      </button>
    </li>
  )
}
