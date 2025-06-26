'use client'

import { useState, useRef } from 'react'
import * as CBRE from '../../../src/components/cbre'
import { 
  DownloadIcon, 
  UploadIcon,
  PersonIcon,
  CheckCircledIcon 
} from '@radix-ui/react-icons'
import { fetchDeals, createDeal } from '../../../src/lib/supabase'
import { exportDealsToCSV, downloadCSV, parseCSVToDeals, generateCSVTemplate } from '../../../src/lib/csv-utils'

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExportCSV = async () => {
    setLoading(true)
    try {
      const deals = await fetchDeals()
      const csvContent = exportDealsToCSV(deals)
      const timestamp = new Date().toISOString().split('T')[0]
      downloadCSV(csvContent, `landmark-deals-export-${timestamp}.csv`)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      alert('Error exporting data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImportCSV = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      alert('Please select a CSV file')
      return
    }

    setImporting(true)
    try {
      const text = await file.text()
      const deals = parseCSVToDeals(text)
      
      if (deals.length === 0) {
        alert('No valid deals found in CSV file')
        return
      }

      const confirmMessage = `Found ${deals.length} deals in CSV. Do you want to import them?`
      if (!confirm(confirmMessage)) {
        return
      }

      let imported = 0
      let errors = 0

      for (const deal of deals) {
        try {
          await createDeal(deal)
          imported++
        } catch (error) {
          console.error('Error importing deal:', deal.property_name, error)
          errors++
        }
      }

      alert(`Import completed!\nImported: ${imported} deals\nErrors: ${errors} deals`)
      
    } catch (error) {
      console.error('Error importing CSV:', error)
      alert('Error importing CSV file. Please check the format and try again.')
    } finally {
      setImporting(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate()
    downloadCSV(template, 'deals-import-template.csv')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure application settings and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Name
              </label>
              <input
                type="text"
                value="CBRE Capital Markets"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Currency
              </label>
              <select
                defaultValue="USD"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="SGD">SGD</option>
              </select>
            </div>
          </div>
        </CBRE.CBRECard>

        {/* Data Management */}
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Data Management
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Export Data
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Download all deals data as CSV file
              </p>
              <CBRE.CBREButton 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleExportCSV}
                disabled={loading}
              >
                <DownloadIcon className="w-4 h-4" />
                {loading ? 'Exporting...' : 'Export CSV'}
              </CBRE.CBREButton>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Import Data
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Upload deals from CSV file
              </p>
              <div className="space-y-2">
                <CBRE.CBREButton 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleImportCSV}
                  disabled={importing}
                >
                  <UploadIcon className="w-4 h-4" />
                  {importing ? 'Importing...' : 'Import CSV'}
                </CBRE.CBREButton>
                <CBRE.CBREButton 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 text-xs"
                  onClick={handleDownloadTemplate}
                >
                  <DownloadIcon className="w-3 h-3" />
                  Download Template
                </CBRE.CBREButton>
              </div>
              
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </CBRE.CBRECard>

        {/* User Management */}
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Management
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Admin Users
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Manage admin access and permissions
              </p>
              <CBRE.CBREButton variant="outline" size="sm" disabled className="gap-2">
                <PersonIcon className="w-4 h-4" />
                Manage Users (Coming Soon)
              </CBRE.CBREButton>
            </div>
          </div>
        </CBRE.CBRECard>

        {/* System Info */}
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Environment</span>
              <span className="text-sm font-medium">Production</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <CheckCircledIcon className="w-4 h-4" />
                Connected
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm font-medium">Just now</span>
            </div>
          </div>
        </CBRE.CBRECard>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <CBRE.CBREButton variant="primary">
          Save Settings
        </CBRE.CBREButton>
      </div>
    </div>
  )
} 