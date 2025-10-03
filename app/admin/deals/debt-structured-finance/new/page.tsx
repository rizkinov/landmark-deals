'use client'

import { DealForm } from '../../../../../src/components/admin/DealForm'

export default function NewDebtStructuredFinancePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add Debt & Structured Finance Deal</h1>
        <p className="mt-2 text-gray-600">
          Create a new debt and structured finance transaction
        </p>
      </div>

      {/* Deal Form with D&SF pre-selected */}
      <DealForm initialServiceType="Debt & Structured Finance" />
    </div>
  )
}