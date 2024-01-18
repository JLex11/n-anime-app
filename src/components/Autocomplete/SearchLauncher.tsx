'use client'

import { autoCompleteHotKeys } from '@/enums'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const Autocomplete = dynamic(() => import('./Autocomplete').then(mod => mod.Autocomplete))

interface Props {
  className?: string
  children?: React.ReactNode
}

export function SearchLauncher({ className: cssClass, children }: Props) {
  const [autocompleteLaunched, setAutocompleteLaunched] = useState(false)

  const handleToggleSearch = () => setAutocompleteLaunched(!autocompleteLaunched)
  const handleCloseAutocomplete = () => setAutocompleteLaunched(false)

  const hotkeysOptions = {
    preventDefault: true,
    enableOnFormTags: true
  }

  useHotkeys(autoCompleteHotKeys.LAUNCH, handleToggleSearch, hotkeysOptions)
  useHotkeys(autoCompleteHotKeys.OUT, handleCloseAutocomplete, hotkeysOptions)

  return (
    <>
      <button onClick={() => setAutocompleteLaunched(true)} className={cssClass} type='button' >
        {children}
      </button>
      {autocompleteLaunched && <Autocomplete handleLaunchAutocomplete={setAutocompleteLaunched} />}
    </>
  )
}


/* const searchParams = useSearchParams()
const router = useRouter()

const handleToggleSearch = () => {
  const searchParamsEntries = [...searchParams.entries()]
  !searchParamsEntries.find(([key]) => key === AutocompleteVars.QUERY_NAME) && searchParamsEntries.push([AutocompleteVars.QUERY_NAME, ''])

  router.push(`?${searchParamsEntries.map(([key, value]) => `${key}=${value}`).join('&')}`)
}

const handleCloseAutocomplete = () => {
  const searchParamsEntries = [...searchParams.entries()]
  const filteredSearchParams = searchParamsEntries.filter(([key]) => key !== AutocompleteVars.QUERY_NAME)

  router.push(`?${filteredSearchParams.map(([key, value]) => `${key}=${value}`).join('&')}`)
} */