'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchDealById } from '../../../../../../src/lib/supabase'
import { Deal } from '../../../../../../src/lib/types'
import { CapitalAdvisorsForm } from '../../../../../../src/components/admin/CapitalAdvisorsForm'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function EditCapitalAdvisorsProjectPage() {
  const params = useParams()
  const dealId = params.id as string
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDeal() {
      try {
        if (dealId) {
          const dealData = await fetchDealById(dealId)
          if (dealData && dealData.services === 'Capital Advisors') {
            setDeal(dealData)
          } else {
            setError('Capital Advisors project not found')
          }
        }
      } catch (err) {
        console.error('Error loading project:', err)
        setError('Error loading project')
      } finally {
        setLoading(false)
      }
    }

    loadDeal()
  }, [dealId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
      </div>
    )
  }

  if (error || !deal) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {error || 'Project not found'}
        </h3>
        <p className="text-gray-500 mb-4">
          The Capital Advisors project you're looking for could not be loaded.
        </p>
        <a
          href="/admin/deals"
          className="text-[#003F2D] hover:text-[#002A1F] font-medium"
        >
          ← Back to Deals
        </a>
      </div>
    )
  }

  return <CapitalAdvisorsForm deal={deal} isEditing={true} />
}