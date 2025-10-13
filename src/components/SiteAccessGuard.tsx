'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { checkSiteAccess, setSiteAccessToken, verifySitePassword } from '../lib/site-access'
import { SiteAccessModal } from './SiteAccessModal'

interface SiteAccessGuardProps {
  children: React.ReactNode
}

export function SiteAccessGuard({ children }: SiteAccessGuardProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const pathname = usePathname()

  // Admin routes that should bypass site access check
  const isAdminRoute = pathname?.startsWith('/admin')

  useEffect(() => {
    checkAccess()
  }, [pathname])

  const checkAccess = async () => {
    try {
      // Admin routes always have access (they have their own auth)
      if (isAdminRoute) {
        setHasAccess(true)
        setLoading(false)
        return
      }

      // Check if user has valid access (admin session or valid token)
      const hasValidAccess = await checkSiteAccess()

      if (hasValidAccess) {
        setHasAccess(true)
        setShowModal(false)
      } else {
        setHasAccess(false)
        setShowModal(true)
      }
    } catch (error) {
      console.error('Error checking site access:', error)
      setHasAccess(false)
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSuccess = async () => {
    // Set the access token (24-hour expiration)
    setSiteAccessToken()
    setHasAccess(true)
    setShowModal(false)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Admin routes bypass the guard
  if (isAdminRoute) {
    return <>{children}</>
  }

  // Show password modal if no access
  if (!hasAccess) {
    return (
      <SiteAccessModal
        isOpen={showModal}
        onSuccess={handlePasswordSuccess}
      />
    )
  }

  // User has access, show the content
  return <>{children}</>
}
