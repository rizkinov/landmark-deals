'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentAdmin, signOutAdmin } from '../../lib/auth'
import { AdminLoginModal } from './AdminLoginModal'
import type { AdminUser } from '../../lib/auth'

interface AdminGuardProps {
  children: React.ReactNode
  requireSuperAdmin?: boolean
}

export function AdminGuard({ children, requireSuperAdmin = false }: AdminGuardProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentAdmin = await getCurrentAdmin()
      
      if (!currentAdmin) {
        setShowLoginModal(true)
        return
      }

      if (requireSuperAdmin && currentAdmin.role !== 'super_admin') {
        alert('Super admin access required')
        await signOutAdmin()
        router.push('/')
        return
      }

      setAdmin(currentAdmin)
      setShowLoginModal(false)
    } catch (error) {
      console.error('Auth check failed:', error)
      setShowLoginModal(true)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = () => {
    checkAuth()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
      </div>
    )
  }

  if (!admin) {
    return (
      <AdminLoginModal 
        isOpen={showLoginModal}
        onSuccess={handleLoginSuccess}
      />
    )
  }

  return <>{children}</>
}

// Create a context for admin user data
import { createContext, useContext } from 'react'

const AdminContext = createContext<{
  admin: AdminUser | null
  refreshAuth: () => Promise<void>
} | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)

  const refreshAuth = async () => {
    const currentAdmin = await getCurrentAdmin()
    setAdmin(currentAdmin)
  }

  useEffect(() => {
    refreshAuth()
  }, [])

  return (
    <AdminContext.Provider value={{ admin, refreshAuth }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
} 