'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'

const CONFIDENTIAL_ACCESS_KEY = 'confidential_access_token'
const CONFIDENTIAL_PASSWORD = 'THRIVEAPAC###'
const ACCESS_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

interface ConfidentialAccessState {
  hasAccess: boolean
  expiresAt: number | null
  grantAccess: (password: string) => boolean
  revokeAccess: () => void
  checkAccess: () => boolean
  timeRemaining: string | null
}

interface StoredAccessToken {
  grantedAt: number
  expiresAt: number
}

function getStoredToken(): StoredAccessToken | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(CONFIDENTIAL_ACCESS_KEY)
    if (!stored) return null
    
    const token = JSON.parse(stored) as StoredAccessToken
    return token
  } catch {
    return null
  }
}

function setStoredToken(token: StoredAccessToken): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONFIDENTIAL_ACCESS_KEY, JSON.stringify(token))
}

function clearStoredToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CONFIDENTIAL_ACCESS_KEY)
}

function isTokenValid(token: StoredAccessToken | null): boolean {
  if (!token) return false
  return Date.now() < token.expiresAt
}

function formatTimeRemaining(expiresAt: number): string | null {
  const remaining = expiresAt - Date.now()
  if (remaining <= 0) return null
  
  const hours = Math.floor(remaining / (60 * 60 * 1000))
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`
  }
  return `${minutes}m remaining`
}

export function useConfidentialAccess(): ConfidentialAccessState {
  const [hasAccess, setHasAccess] = useState(false)
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)

  // Check stored token on mount
  useEffect(() => {
    const token = getStoredToken()
    if (isTokenValid(token)) {
      setHasAccess(true)
      setExpiresAt(token!.expiresAt)
    } else {
      // Clear expired token
      clearStoredToken()
      setHasAccess(false)
      setExpiresAt(null)
    }
  }, [])

  // Update time remaining every minute
  useEffect(() => {
    if (!expiresAt) {
      setTimeRemaining(null)
      return
    }

    const updateRemaining = () => {
      const remaining = formatTimeRemaining(expiresAt)
      if (remaining) {
        setTimeRemaining(remaining)
      } else {
        // Token expired
        setHasAccess(false)
        setExpiresAt(null)
        setTimeRemaining(null)
        clearStoredToken()
      }
    }

    updateRemaining()
    const interval = setInterval(updateRemaining, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [expiresAt])

  const checkAccess = useCallback((): boolean => {
    const token = getStoredToken()
    const valid = isTokenValid(token)
    
    if (!valid && token) {
      // Clean up expired token
      clearStoredToken()
      setHasAccess(false)
      setExpiresAt(null)
    }
    
    return valid
  }, [])

  const grantAccess = useCallback((password: string): boolean => {
    if (password !== CONFIDENTIAL_PASSWORD) {
      return false
    }

    const now = Date.now()
    const token: StoredAccessToken = {
      grantedAt: now,
      expiresAt: now + ACCESS_DURATION_MS
    }

    setStoredToken(token)
    setHasAccess(true)
    setExpiresAt(token.expiresAt)

    return true
  }, [])

  const revokeAccess = useCallback((): void => {
    clearStoredToken()
    setHasAccess(false)
    setExpiresAt(null)
    setTimeRemaining(null)
  }, [])

  return {
    hasAccess,
    expiresAt,
    grantAccess,
    revokeAccess,
    checkAccess,
    timeRemaining
  }
}

// Context for sharing confidential access state across components
const ConfidentialAccessContext = createContext<ConfidentialAccessState | null>(null)

export function ConfidentialAccessProvider({ children }: { children: React.ReactNode }) {
  const accessState = useConfidentialAccess()

  return (
    <ConfidentialAccessContext.Provider value={accessState}>
      {children}
    </ConfidentialAccessContext.Provider>
  )
}

export function useConfidentialAccessContext(): ConfidentialAccessState {
  const context = useContext(ConfidentialAccessContext)
  if (!context) {
    throw new Error('useConfidentialAccessContext must be used within ConfidentialAccessProvider')
  }
  return context
}

