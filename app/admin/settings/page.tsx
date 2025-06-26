'use client'

import * as CBRE from '../../../src/components/cbre'
import { 
  DownloadIcon, 
  UploadIcon,
  PersonIcon,
  CheckCircledIcon 
} from '@radix-ui/react-icons'

export default function AdminSettingsPage() {
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
              <CBRE.CBREButton variant="outline" size="sm" className="gap-2">
                <DownloadIcon className="w-4 h-4" />
                Export CSV
              </CBRE.CBREButton>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Import Data
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Upload deals from CSV file
              </p>
              <CBRE.CBREButton variant="outline" size="sm" className="gap-2">
                <UploadIcon className="w-4 h-4" />
                Import CSV
              </CBRE.CBREButton>
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