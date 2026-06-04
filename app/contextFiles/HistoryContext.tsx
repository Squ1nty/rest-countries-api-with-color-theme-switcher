// app/contextFiles/HistoryContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type HistoryContextType = {
  push: (name: string) => void
  pop: () => string | undefined
  peek: () => string | undefined
  hasHistory: boolean
}

const HistoryContext = createContext<HistoryContextType | null>(null)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<string[]>(() => {
    // initialise from localStorage if it exists
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('countryHistory')
    return saved ? JSON.parse(saved) : []
  })

  const push = (name: string) => setStack(prev => {
    const next = [...prev, name]
    localStorage.setItem('countryHistory', JSON.stringify(next))
    return next
  })

  const pop = () => {
    let popped: string | undefined
    setStack(prev => {
      popped = prev[prev.length - 1]
      const next = prev.slice(0, -1)
      localStorage.setItem('countryHistory', JSON.stringify(next))
      return next
    })
    return popped
  }

  const peek = () => stack[stack.length - 1]

  return (
    <HistoryContext.Provider value={{ push, pop, peek, hasHistory: stack.length > 0 }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (!context) throw new Error('useHistory must be used within a HistoryProvider')
  return context
}