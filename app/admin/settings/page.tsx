'use client'

import { useState, useRef, useEffect } from 'react'
import * as CBRE from '../../../src/components/cbre'
import {
  DownloadIcon,
  UploadIcon,
  PersonIcon,
  CheckCircledIcon,
  LockClosedIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  ReloadIcon,
  EnvelopeClosedIcon,
  ClockIcon
} from '@radix-ui/react-icons'
import { fetchDeals, createDeal } from '../../../src/lib/supabase'
import { exportDealsToCSV, downloadCSV, parseCSVToDeals, generateCSVTemplate } from '../../../src/lib/csv-utils'
import { updateSitePassword, getSitePasswordStatus } from '../../../src/lib/site-access'
import type { SitePasswordStatus } from '../../../src/lib/types'

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Site password state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStatus, setPasswordStatus] = useState<SitePasswordStatus>({ isSet: false })
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Auto-rotation state
  const [generatingPassword, setGeneratingPassword] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [sendEmailNotification, setSendEmailNotification] = useState(true)
  const [rotationResult, setRotationResult] = useState<{
    success: boolean
    message: string
    password?: string
    emailSent?: boolean
  } | null>(null)

  useEffect(() => {
    loadPasswordStatus()
  }, [])

  const loadPasswordStatus = async () => {
    const status = await getSitePasswordStatus()
    setPasswordStatus(status)
  }

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

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)

    // Validation
    if (newPassword.length < 4) {
      setPasswordError('Password must be at least 4 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    setUpdatingPassword(true)

    try {
      const result = await updateSitePassword(newPassword)

      if (result.success) {
        setPasswordSuccess(true)
        setNewPassword('')
        setConfirmPassword('')
        await loadPasswordStatus()

        // Clear success message after 3 seconds
        setTimeout(() => {
          setPasswordSuccess(false)
        }, 3000)
      } else {
        setPasswordError(result.error || 'Failed to update password')
      }
    } catch (error) {
      setPasswordError('An unexpected error occurred')
    } finally {
      setUpdatingPassword(false)
    }
  }

  const handleAutoRotatePassword = async () => {
    if (!confirm('This will generate a new secure password and send it to the configured recipients. Continue?')) {
      return
    }

    setGeneratingPassword(true)
    setRotationResult(null)
    setGeneratedPassword('')

    try {
      const response = await fetch('/api/admin/rotate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sendEmail: sendEmailNotification,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setGeneratedPassword(data.password)
        setRotationResult({
          success: true,
          message: 'Password rotated successfully!',
          password: data.password,
          emailSent: data.emailSent,
        })
        await loadPasswordStatus()
      } else {
        setRotationResult({
          success: false,
          message: data.error || 'Failed to rotate password',
        })
      }
    } catch (error) {
      setRotationResult({
        success: false,
        message: 'An unexpected error occurred',
      })
    } finally {
      setGeneratingPassword(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Password copied to clipboard!')
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
        {/* Site Access Password */}
        <CBRE.CBRECard className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <LockClosedIcon className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Site Access Password
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Control access to the entire site with a single password. Users will need to enter this password to view deals and other content. Access is granted for 24 hours after successful authentication.
          </p>

          {/* Password Status */}
          {passwordStatus.isSet && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2 text-sm text-green-800">
                <CheckCircledIcon className="w-4 h-4" />
                <span className="font-medium">Site password is active</span>
              </div>
              {passwordStatus.lastUpdated && (
                <p className="text-xs text-green-700 mt-1">
                  Last updated: {new Date(passwordStatus.lastUpdated).toLocaleString()}
                  {passwordStatus.updatedBy && ` by ${passwordStatus.updatedBy}`}
                </p>
              )}
            </div>
          )}

          {/* Password Form */}
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                  placeholder="Enter new site password"
                  minLength={4}
                  required
                  disabled={updatingPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={updatingPassword}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeClosedIcon className="w-4 h-4" /> : <EyeOpenIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="Confirm new password"
                minLength={4}
                required
                disabled={updatingPassword}
              />
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {passwordError}
              </div>
            )}

            {/* Success Message */}
            {passwordSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm flex items-center gap-2">
                <CheckCircledIcon className="w-4 h-4" />
                Site password updated successfully!
              </div>
            )}

            <CBRE.CBREButton
              type="submit"
              variant="primary"
              disabled={updatingPassword || !newPassword || !confirmPassword}
              className="gap-2"
            >
              <LockClosedIcon className="w-4 h-4" />
              {updatingPassword ? 'Updating...' : 'Update Site Password'}
            </CBRE.CBREButton>
          </form>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Admin users are automatically granted access and do not need to enter the site password. This password only affects public access to the deals pages.
            </p>
          </div>

          {/* Automatic Password Rotation Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <ReloadIcon className="w-4 h-4 text-gray-700" />
              <h4 className="text-md font-semibold text-gray-900">
                Automatic Password Rotation
              </h4>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Generate a new secure password and optionally send it to the configured recipients. Passwords are automatically rotated on the 1st of every month.
            </p>

            {/* Next rotation info */}
            <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Next automatic rotation:{' '}
                <strong>
                  {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </strong>
              </span>
            </div>

            {/* Email recipients */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Recipients
              </label>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <EnvelopeClosedIcon className="w-4 h-4 text-gray-500" />
                  <span>rizki.novianto@cbre.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeClosedIcon className="w-4 h-4 text-gray-500" />
                  <span>Christy.Chan@cbre.com</span>
                </div>
              </div>
            </div>

            {/* Send email checkbox */}
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmailNotification}
                  onChange={(e) => setSendEmailNotification(e.target.checked)}
                  className="w-4 h-4 text-[#003F2D] border-gray-300 rounded focus:ring-[#003F2D]"
                  disabled={generatingPassword}
                />
                <span className="text-sm text-gray-700">
                  Send email notification to recipients
                </span>
              </label>
            </div>

            {/* Generated password display */}
            {generatedPassword && (
              <div className="mb-4 p-4 bg-green-50 border-2 border-dashed border-green-300 rounded">
                <p className="text-xs text-green-600 uppercase tracking-wide mb-2">New Password</p>
                <div className="flex items-center gap-3">
                  <code className="text-lg font-mono font-bold text-green-800 tracking-wider">
                    {generatedPassword}
                  </code>
                  <CBRE.CBREButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedPassword)}
                    className="text-xs"
                  >
                    Copy
                  </CBRE.CBREButton>
                </div>
              </div>
            )}

            {/* Rotation result message */}
            {rotationResult && (
              <div className={`mb-4 px-4 py-3 text-sm flex items-center gap-2 ${rotationResult.success
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                {rotationResult.success ? (
                  <>
                    <CheckCircledIcon className="w-4 h-4" />
                    {rotationResult.message}
                    {rotationResult.emailSent && (
                      <span className="ml-2 text-xs bg-green-100 px-2 py-0.5 rounded">
                        Email sent ✓
                      </span>
                    )}
                  </>
                ) : (
                  rotationResult.message
                )}
              </div>
            )}

            <CBRE.CBREButton
              type="button"
              variant="outline"
              onClick={handleAutoRotatePassword}
              disabled={generatingPassword}
              className="gap-2"
            >
              <ReloadIcon className={`w-4 h-4 ${generatingPassword ? 'animate-spin' : ''}`} />
              {generatingPassword ? 'Generating...' : 'Generate & Rotate Password Now'}
            </CBRE.CBREButton>
          </div>
        </CBRE.CBRECard>

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
              <CBRE.CBREButton variant="outline" size="sm" asChild className="gap-2">
                <a href="/admin/settings/users">
                  <PersonIcon className="w-4 h-4" />
                  Manage Users
                </a>
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