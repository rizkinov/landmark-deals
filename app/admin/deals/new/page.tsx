'use client'

import { DealForm } from '../../../../src/components/admin/DealForm'

export default function NewDealPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Deal</h1>
        <p className="mt-2 text-gray-600">
          Create a new landmark deal entry
        </p>
      </div>

      {/* Deal Form */}
      <DealForm />
    </div>
  )
} 