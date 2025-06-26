'use client'

import { useEffect, useState } from 'react'
import { fetchDeals } from '../../src/lib/supabase'
import { Deal } from '../../src/lib/types'
import { formatCurrency } from '../../src/lib/utils'
import * as CBRE from '../../src/components/cbre'
import { 
  FileTextIcon, 
  GlobeIcon, 
  BarChartIcon
} from '@radix-ui/react-icons'
import { DollarIcon } from '../../src/components/ui/dollar-icon'

export default function AdminDashboard() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDeals() {
      try {
        const data = await fetchDeals()
        setDeals(data)
      } catch (error) {
        console.error('Error loading deals:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDeals()
  }, [])

  const stats = {
    totalDeals: deals.length,
    totalValue: deals.reduce((sum, deal) => sum + deal.deal_price_usd, 0),
    recentDeals: deals.slice(0, 5),
    countryDistribution: deals.reduce((acc, deal) => {
      acc[deal.country] = (acc[deal.country] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage landmark deals across Asia Pacific
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CBRE.CBRECard className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Deals</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalDeals}</p>
            </div>
            <FileTextIcon className="w-8 h-8 text-gray-400" />
          </div>
        </CBRE.CBRECard>

        <CBRE.CBRECard className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(stats.totalValue, 'USD', { unit: 'M' })}
              </p>
            </div>
            <DollarIcon className="w-8 h-8 text-gray-400" />
          </div>
        </CBRE.CBRECard>

        <CBRE.CBRECard className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Countries</p>
              <p className="text-3xl font-bold text-gray-900">
                {Object.keys(stats.countryDistribution).length}
              </p>
            </div>
            <GlobeIcon className="w-8 h-8 text-gray-400" />
          </div>
        </CBRE.CBRECard>

        <CBRE.CBRECard className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(stats.totalValue / stats.totalDeals || 0, 'USD', { unit: 'M' })}
              </p>
            </div>
            <BarChartIcon className="w-8 h-8 text-gray-400" />
          </div>
        </CBRE.CBRECard>
      </div>

      {/* Recent Deals and Country Distribution Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Deals */}
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Deals</h3>
          <div className="space-y-3">
            {stats.recentDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {deal.property_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {deal.country} • {deal.deal_date}
                  </p>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(deal.deal_price_usd, 'USD')}
                </div>
              </div>
            ))}
            {stats.recentDeals.length === 0 && (
              <p className="text-gray-500 text-center py-4">No deals found</p>
            )}
          </div>
        </CBRE.CBRECard>

        {/* Country Distribution */}
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deals by Country</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stats.countryDistribution)
              .sort(([,a], [,b]) => b - a)
              .map(([country, count]) => (
                <div key={country} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{country}</p>
                </div>
              ))}
          </div>
        </CBRE.CBRECard>
      </div>
    </div>
  )
} 