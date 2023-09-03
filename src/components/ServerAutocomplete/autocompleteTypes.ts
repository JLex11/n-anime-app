export interface Item {
  id: string | number
  title: string
  description: string
  link: string
  image: string | React.ReactNode
  type?: string | null
}

export interface CollectionHandle {
  title: string
  id: string | number
  getItemsCallback: (query: string) => Promise<Item[]> | Item[]
}

export type Collection = {
  title: string
  id: string | number
  items: Item[]
}

export enum AutocompleteVars {
  QUERY_NAME = 'autocomplete_query'
}
