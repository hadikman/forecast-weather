import React from 'react'

type ContextType<T, K> = {
  key: K
  storage: T | null
  getStorage: (key: K) => T | null
  setStorage: (key: K, value: T) => void
  setKey: React.Dispatch<React.SetStateAction<K>>
  refreshStorage: (key: K) => void
  removeStorage: (key: K) => void
}

const ForecastContext = React.createContext<ContextType<any, any> | null>(null)

export function useForecastContext<T, K>() {
  const context = React.useContext(ForecastContext) as ContextType<T, K> | null
  if (!context) {
    throw new Error(
      'useForecastContext must be used inside ForecastContext.Provider',
    )
  }
  return context
}

export function ForecastProvider<T, K>({
  children,
  defaultKey,
}: {
  children: React.ReactNode
  defaultKey: K
}) {
  const [key, setKey] = React.useState<K>(defaultKey)
  const [storage, set] = React.useState<T | null>(() => {
    const storedValue = localStorage.getItem(defaultKey as string)
    return storedValue ? (JSON.parse(storedValue) as T) : null
  })

  const getStorage = React.useCallback((key: K): T | null => {
    const storedValue = localStorage.getItem(key as string)
    return storedValue ? (JSON.parse(storedValue) as T) : null
  }, [])

  const setStorage = React.useCallback((key: K, value: T): void => {
    localStorage.setItem(key as string, JSON.stringify(value))
    set(value)
  }, [])

  const refreshStorage = React.useCallback((key: K): void => {
    const storedValue = localStorage.getItem(key as string)
    set(storedValue ? (JSON.parse(storedValue) as T) : null)
  }, [])

  const removeStorage = React.useCallback((key: K): void => {
    localStorage.removeItem(key as string)
    set(null)
  }, [])

  const value: ContextType<T, K> = {
    key,
    storage,
    getStorage,
    setKey,
    setStorage,
    refreshStorage,
    removeStorage,
  }
  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  )
}
