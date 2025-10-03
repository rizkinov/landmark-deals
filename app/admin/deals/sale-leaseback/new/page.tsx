'use client'

import { DealForm } from '../../../../../src/components/admin/DealForm'

export default function NewSaleLeasebackPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add Sale & Leaseback Deal</h1>
        <p className="mt-2 text-gray-600">
          Create a new sale and leaseback transaction
        </p>
      </div>

      {/* Deal Form with Sale & Leaseback pre-selected */}
      <DealForm initialServiceType="Sale & Leaseback" />
    </div>
  )
}