import { useEffect, useState } from "react"
import type { AutocompleteItemChilds, AutocompleteOutputItem } from "./useAutocomplete.types"

export function useChildItems(item: AutocompleteOutputItem, expanded: boolean) {
  const [childItems, setChildItems] = useState<AutocompleteItemChilds | null>(null)

  useEffect(() => {
    if (!expanded || childItems || !item.childsCallback) return

    // Usar una variable para el seguimiento del montaje
    let isMounted = true

    item.childsCallback().then((items) => {
      if (isMounted) setChildItems(items)
    })

    return () => { isMounted = false }
  }, [expanded, childItems, item.childsCallback])

  return childItems
}