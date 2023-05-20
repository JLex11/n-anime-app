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

export const SearchLauncher = ({ className: cssClass, children }: Props) => {
  const [autocompleteIsLaunch, setAutocompleteIsLaunch] = useState(false)

  const handleToggleSearch = () => {
    setAutocompleteIsLaunch(!autocompleteIsLaunch)
  }

  const handleCloseAutocomplete = () => {
    setAutocompleteIsLaunch(false)
  }

  const hotkeysOptions = {
    preventDefault: true,
    enableOnFormTags: true,
  }

  useHotkeys(autoCompleteHotKeys.CTRL_K, handleToggleSearch, hotkeysOptions)
  useHotkeys(autoCompleteHotKeys.ESCAPE, handleCloseAutocomplete, hotkeysOptions)

  return (
    <>
      <button onClick={() => setAutocompleteIsLaunch(true)} className={cssClass}>
        {children}
      </button>
      {autocompleteIsLaunch && <Autocomplete handleLaunchAutocomplete={setAutocompleteIsLaunch} />}
    </>
  )
}
