import {
  AutocompleteOptionsWithMetadata,
  BaseItem
} from '@algolia/autocomplete-core'

export interface AutocompleteItemChild {
  id: string
  title: string | number
  image: {
    src: string | undefined
    alt: string
  }
  link: string
}

export interface AutocompleteItemChilds {
  items: AutocompleteItemChild[]
  title: string
}

export type AutocompleteItemId = `autocompleteItem-${string | number}`

export interface AutocompleteItem extends BaseItem {
  id: string
  title: string
  image: string | React.ReactNode
  link: string
  description: string
  type?: string
  rank?: number
  childsCallback?: () => Promise<AutocompleteItemChilds>
}

export interface AutocompleteOutputItem extends AutocompleteItem {
  getItemRef: (index: number) => RefObject<HTMLElement>
}

export interface AutocompleteProps
  extends AutocompleteOptionsWithMetadata<AutocompleteOutputItem> {
  handleLaunchAutocomplete: React.Dispatch<React.SetStateAction<boolean>>
}
