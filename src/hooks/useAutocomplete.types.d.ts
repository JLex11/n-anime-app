import { BaseItem } from '@algolia/autocomplete-core'

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
  image: string
  link: string
  description: string
  type?: string
  rank?: number
  _autocomplete_item_id: AutocompleteItemId
  childsCallback?: () => Promise<AutocompleteItemChilds>
}