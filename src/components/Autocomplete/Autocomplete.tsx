import { useAutocomplete } from '@/hooks/useAutocomplete'
import clsx from 'clsx'
import { useId } from 'react'
import styles from './Autocomplete.module.css'
import { CollectionsPanel } from './CollectionsPanel'
import { AutocompleteContext } from './Contexts'
import { Input } from './Input'

interface Props {
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}

export const Autocomplete = ({ handleLaunchAutocomplete }: Props) => {
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

  const resultsPanelClassName = clsx(styles.resultsPanel, autocomplete.isOpen && styles.isOpen)
  const formClassName = clsx(styles.form, autocomplete.isOpen && styles.isOpen)

  const providerValue = {
    activeItemId: autocomplete.activeItemId ?? 0,
    setActiveItemId,
    handleLaunchAutocomplete,
  }

  return (
    <AutocompleteContext.Provider value={providerValue}>
      <div className={styles.autocompleteLayer} id={autocompleteId} onClick={handleClick}>
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
