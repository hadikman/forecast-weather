import React from 'react'

export default function useLocalStorage<T>(initialKey: string) {
  const [storage, set] = React.useState<T | null>(() => {
    const storedValue = localStorage.getItem(initialKey)

    return storedValue ? (JSON.parse(storedValue) as T) : null
  })

  const getStorage = React.useCallback((key: string) => {
    const storedValue = localStorage.getItem(key)

    if (storedValue) {
      set(JSON.parse(storedValue) as T)
    }

    return storedValue ? (JSON.parse(storedValue) as T) : null
  }, [])

  const setStorage = React.useCallback((value: T, key: string) => {
    localStorage.setItem(key, JSON.stringify(value))
    set(value)
  }, [])

  const removeStorge = React.useCallback((key: string) => {
    localStorage.removeItem(key)
    set(null)
  }, [])

  return {
    storageKey: initialKey,
    storage,
    getStorage,
    setStorage,
    removeStorge,
  }
}
