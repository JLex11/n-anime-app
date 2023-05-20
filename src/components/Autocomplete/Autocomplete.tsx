import { useAutocomplete } from '@/hooks/useAutocomplete'
import styles from '@/styles/Autocomplete.module.css'
import clsx from 'clsx'
import { useId } from 'react'
import { CollectionsPanel } from './CollectionsPanel'
import { AutocompleteContext } from './Contexts'
import { Input } from './Input'

interface Props {
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}

export const Autocomplete = ({ handleLaunchAutocomplete }: Props) => {
  const { autocomplete, setActiveItemId, inputRef, panelRef, inputProps, formProps, panelProps } = useAutocomplete({
    handleLaunchAutocomplete,
    placeholder: 'Rey de los Piratas, Gabimaru el Hueco...',
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
  }

  return (
    <AutocompleteContext.Provider value={providerValue}>
      <div className={styles.autoCompleteLayer} id={autocompleteId} onClick={handleClick}>
        <form className={formClassName} {...(formProps as any)}>
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
