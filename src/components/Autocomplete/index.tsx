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
	const { autocomplete, setActiveItemId, elementsRef, elementsProps } = useAutocomplete({
		handleLaunchAutocomplete,
	})
	const autocompleteId = useId()

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement
		if (target.id === autocompleteId) handleLaunchAutocomplete(false)
	}

	const resultsPanelClassName = clsx(styles.collectionsPanel, autocomplete.isOpen && styles.isOpen)
	const formClassName = clsx(styles.form, autocomplete.isOpen && styles.isOpen)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const providerValue = useMemo(
		() => ({
			activeItemId: autocomplete.activeItemId ?? 0,
			setActiveItemId,
			handleLaunchAutocomplete,
		}),
		[autocomplete.activeItemId]
	)

	return (
		<AutocompleteContext.Provider value={providerValue}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className={styles.autocompleteContainer} id={autocompleteId} onClick={handleClick}>
				<form className={formClassName} {...elementsProps.formProps}>
					<Input
						status={autocomplete.status}
						inputRef={elementsRef.inputRef as React.RefObject<HTMLInputElement>}
						inputProps={elementsProps.inputProps as unknown as React.InputHTMLAttributes<HTMLInputElement>}
					/>
					{autocomplete.isOpen && (
						<CollectionsPanel
							collections={autocomplete.collections}
							panelRef={elementsRef.panelRef as React.RefObject<HTMLDivElement>}
							panelProps={elementsProps.panelProps}
							className={resultsPanelClassName}
						/>
					)}
				</form>
			</div>
		</AutocompleteContext.Provider>
	)
}
