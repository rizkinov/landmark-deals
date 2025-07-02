'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import * as CBRE from '../../src/components/cbre'
import { AdminGuard } from '../../src/components/admin/AdminGuard'
import { getCurrentAdmin, signOutAdmin } from '../../src/lib/auth'
import type { AdminUser } from '../../src/lib/auth'
import { 
  DashboardIcon, 
  FileTextIcon, 
  PlusIcon, 
  GearIcon,
  ExitIcon
} from '@radix-ui/react-icons'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: DashboardIcon },
  { href: '/admin/deals', label: 'Manage Deals', icon: FileTextIcon },
  { href: '/admin/deals/new', label: 'Add Deal', icon: PlusIcon },
  { href: '/admin/settings', label: 'Settings', icon: GearIcon },
]

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      const currentAdmin = await getCurrentAdmin()
      setAdmin(currentAdmin)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    }
  }

  const handleLogout = async () => {
    if (loggingOut) return
    
    setLoggingOut(true)
    try {
      await signOutAdmin()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[#003F2D] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
                ← Back to App
              </Link>
              <div className="h-6 w-px bg-white/30"></div>
              <h1 className="text-lg font-medium">
                CBRE Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">{admin?.email || 'Loading...'}</div>
                <div className="text-xs opacity-75">
                  {admin?.role ? admin.role.replace('_', ' ') : ''}
                </div>
              </div>
              <CBRE.CBREButton 
                size="sm" 
                onClick={handleLogout}
                disabled={loggingOut}
                className="bg-[#002A1F] text-white border border-white/30 hover:bg-white hover:text-[#003F2D] transition-colors gap-2"
              >
                <ExitIcon className="w-4 h-4" />
                {loggingOut ? 'Logging out...' : 'Logout'}
              </CBRE.CBREButton>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <ul className="space-y-2">
                {adminNavItems.map((item) => {
                  let isActive = false
                  
                  if (item.href === '/admin') {
                    isActive = pathname === '/admin'
                  } else if (item.href === '/admin/deals') {
                    isActive = pathname === '/admin/deals' || pathname.includes('/admin/deals/') && pathname.includes('/edit')
                  } else if (item.href === '/admin/deals/new') {
                    isActive = pathname === '/admin/deals/new'
                  } else if (item.href === '/admin/settings') {
                    isActive = pathname.startsWith('/admin/settings')
                  }
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${isActive 
                            ? 'bg-[#003F2D] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminGuard>
  )
}