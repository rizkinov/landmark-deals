'use client'

import { AdminManagement } from '../../../../src/components/admin/AdminManagement'
import Link from 'next/link'
import * as CBRE from '../../../../src/components/cbre'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/admin/settings" className="hover:text-gray-900">
          Settings
        </Link>
        <span>→</span>
        <span>User Management</span>
      </div>

      {/* Back Button */}
      <div>
        <CBRE.CBREButton variant="outline" asChild className="gap-2">
          <Link href="/admin/settings">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Settings
          </Link>
        </CBRE.CBREButton>
      </div>

      {/* Admin Management Component */}
      <AdminManagement />
    </div>
  )
} 