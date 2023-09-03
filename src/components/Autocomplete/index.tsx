import { useAutocomplete } from '@/hooks/useAutocomplete'
import clsx from 'clsx'
import { useId, useMemo } from 'react'
import styles from './Autocomplete.module.css'
import { CollectionsPanel } from './CollectionsPanel'
import { AutocompleteContext } from './Contexts'
import { Input } from './Input'

interface Props {
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}

export function Autocomplete({ handleLaunchAutocomplete }: Props) {
  const { autocomplete, setActiveItemId, inputRef, panelRef, inputProps, panelProps } = useAutocomplete({
    handleLaunchAutocomplete,
    placeholder: 'Rey de los Piratas, Gabimaru el Hueco...'
  })

  const autocompleteId = useId()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.id === autocompleteId) {
      handleLaunchAutocomplete(false)
    }
  }

  const resultsPanelClassName = clsx(styles.collectionsPanel, autocomplete.isOpen && styles.isOpen)
  const formClassName = clsx(styles.form, autocomplete.isOpen && styles.isOpen)

  const providerValue = useMemo(
    () => ({
      activeItemId: autocomplete.activeItemId ?? 0,
      setActiveItemId,
      handleLaunchAutocomplete
    }),
    [autocomplete.activeItemId, setActiveItemId, handleLaunchAutocomplete]
  )

  return (
    <AutocompleteContext.Provider value={providerValue}>
      <div className={styles.autocompleteContainer} id={autocompleteId} onClick={handleClick}>
        <form className={formClassName}>
          <Input status={autocomplete.status} inputRef={inputRef} inputProps={inputProps} />
          {autocomplete.isOpen && (
            <CollectionsPanel
              collections={autocomplete.collections}
              panelRef={panelRef}
              panelProps={panelProps}
              className={resultsPanelClassName}
            />
          )}
        </form>
      </div>
    </AutocompleteContext.Provider>
  )
}
