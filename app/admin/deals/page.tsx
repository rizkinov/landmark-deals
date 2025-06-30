'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchDeals, deleteDeal } from '../../../src/lib/supabase'
import { Deal } from '../../../src/lib/types'
import { formatCurrencyString } from '../../../src/lib/utils'
import * as CBRE from '../../../src/components/cbre'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
  HomeIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'

// Simple thumbnail component - no complex state management
function DealThumbnail({ imageUrl, propertyName }: { imageUrl: string | null, propertyName: string }) {
  const [showFallback, setShowFallback] = useState(false)
  
  // Use default image if no URL provided
  const finalImageUrl = imageUrl || '/default-photo.jpeg'

  const handleImageError = () => {
    setShowFallback(true)
  }

  // If image failed to load, show icon
  if (showFallback) {
    return (
      <div className="flex-shrink-0 h-10 w-10">
        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center border border-gray-200">
          <HomeIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-shrink-0 h-10 w-10">
      <img
        className="h-10 w-10 rounded object-cover border border-gray-200"
        src={finalImageUrl}
        alt={propertyName}
        onError={handleImageError}
      />
    </div>
  )
}

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadDeals()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = deals.filter(deal =>
        deal.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (deal.remarks && deal.remarks.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredDeals(filtered)
    } else {
      setFilteredDeals(deals)
    }
  }, [deals, searchTerm])

  async function loadDeals() {
    try {
      const data = await fetchDeals()
      setDeals(data)
      setFilteredDeals(data)
    } catch (error) {
      console.error('Error loading deals:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDeal(id)
      await loadDeals() // Refresh the list
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting deal:', error)
      alert('Error deleting deal. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Deals</h1>
          <p className="mt-2 text-gray-600">
            {filteredDeals.length} deals total
          </p>
        </div>
        <Link href="/admin/deals/new">
          <CBRE.CBREButton variant="primary" className="gap-2">
            <PlusIcon className="w-4 h-4" />
            Add New Deal
          </CBRE.CBREButton>
        </Link>
      </div>

      {/* Search and Filters */}
      <CBRE.CBRECard className="p-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search deals by property, buyer, seller, country, location, or remarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
            />
          </div>
          <CBRE.CBREButton 
            variant="outline" 
            onClick={() => setSearchTerm('')}
            disabled={!searchTerm}
          >
            Clear
          </CBRE.CBREButton>
        </div>
      </CBRE.CBRECard>

      {/* Deals Table */}
      <CBRE.CBRECard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price (USD)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DealThumbnail 
                        imageUrl={deal.property_image_url} 
                        propertyName={deal.property_name}
                      />
                      
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {deal.property_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {deal.buyer} ← {deal.seller}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deal.location}</div>
                    <div className="text-xs text-gray-500">{deal.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                                              {formatCurrencyString(deal.deal_price_usd, 'USD')}
                    </div>
                    {deal.local_currency !== 'USD' && (
                      <div className="text-xs text-gray-500">
                        {formatCurrencyString(deal.local_currency_amount, deal.local_currency)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deal.asset_class}</div>
                    <div className="text-xs text-gray-500">{deal.services}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deal.deal_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-48">
                    {deal.remarks ? (
                      <div className="text-sm text-gray-900 truncate" title={deal.remarks}>
                        {deal.remarks}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 italic">No remarks</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2">
                      <Link href={`/admin/deals/${deal.id}/edit`}>
                        <CBRE.CBREButton variant="outline" size="sm" className="gap-1">
                          <Pencil1Icon className="w-3 h-3" />
                          Edit
                        </CBRE.CBREButton>
                      </Link>
                      <CBRE.CBREButton
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteConfirm(deal.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50 gap-1"
                      >
                        <TrashIcon className="w-3 h-3" />
                        Delete
                      </CBRE.CBREButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <HomeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first deal'}
              </p>
              {!searchTerm && (
                <Link href="/admin/deals/new">
                  <CBRE.CBREButton variant="primary" className="gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Add New Deal
                  </CBRE.CBREButton>
                </Link>
              )}
            </div>
          )}
        </div>
      </CBRE.CBRECard>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this deal? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <CBRE.CBREButton
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </CBRE.CBREButton>
              <CBRE.CBREButton
                variant="primary"
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </CBRE.CBREButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 