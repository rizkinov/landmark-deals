'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as CBRE from '../../src/components/cbre'
import { 
  DashboardIcon, 
  FileTextIcon, 
  PlusIcon, 
  GearIcon 
} from '@radix-ui/react-icons'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: DashboardIcon },
  { href: '/admin/deals', label: 'Manage Deals', icon: FileTextIcon },
  { href: '/admin/deals/new', label: 'Add Deal', icon: PlusIcon },
  { href: '/admin/settings', label: 'Settings', icon: GearIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[#003F2D] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold">
                ← Back to App
              </Link>
              <div className="h-6 w-px bg-white/30"></div>
              <h1 className="text-lg font-medium">
                CBRE Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm opacity-75">Admin User</span>
              <CBRE.CBREButton 
                size="sm" 
                className="bg-[#002A1F] text-white border border-white/30 hover:bg-white hover:text-[#003F2D] transition-colors"
              >
                Logout
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