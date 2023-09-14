import { useEffect, useState } from 'react'

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const storagedValue = sessionStorage.getItem(key)
    if (storagedValue) {
      try {
        const parsedValue = JSON.parse(storagedValue)
        setValue(parsedValue)
      } catch (error) {}
    }
  }, [key])

  const handleValue = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value))
    setValue(value)
  }

  return [value, handleValue] as const
}
