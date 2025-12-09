'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '../../../src/lib/supabase'
import * as CBRE from '../../../src/components/cbre'
import { EyeOpenIcon, EyeClosedIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [validSession, setValidSession] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if we have a valid session from the reset link
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      // If there's a hash in the URL, Supabase Auth will handle it
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        // Let Supabase process the hash
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          setValidSession(false)
          setError('Invalid or expired reset link. Please request a new password reset.')
          return
        }
        if (data.session) {
          setValidSession(true)
          return
        }
      }
      
      if (session) {
        setValidSession(true)
      } else {
        setValidSession(false)
        setError('Invalid or expired reset link. Please request a new password reset.')
      }
    } catch (err) {
      setValidSession(false)
      setError('Failed to validate reset link.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      setSuccess(true)
      
      // Redirect to admin login after 3 seconds
      setTimeout(() => {
        router.push('/admin')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (validSession === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
      </div>
    )
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <CBRE.CBRECard className="w-full max-w-md p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircledIcon className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Password Updated!</h1>
          <p className="text-gray-600 mb-6">
            Your password has been successfully updated. You will be redirected to the admin login page shortly.
          </p>
          <CBRE.CBREButton asChild className="w-full">
            <Link href="/admin">Go to Admin Login</Link>
          </CBRE.CBREButton>
        </CBRE.CBRECard>
      </div>
    )
  }

  // Invalid session state
  if (!validSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <CBRE.CBRECard className="w-full max-w-md p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <CrossCircledIcon className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">
            {error || 'This password reset link is invalid or has expired. Please contact your administrator to request a new password reset.'}
          </p>
          <CBRE.CBREButton asChild variant="outline" className="w-full">
            <Link href="/admin">Back to Admin Login</Link>
          </CBRE.CBREButton>
        </CBRE.CBRECard>
      </div>
    )
  }

  // Reset password form
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <CBRE.CBRECard className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#003F2D] rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set New Password</h1>
          <p className="text-gray-600 mt-2">Enter your new password below</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D] focus:border-transparent pr-12"
                placeholder="Enter new password"
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeClosedIcon className="w-5 h-5" />
                ) : (
                  <EyeOpenIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              placeholder="Confirm new password"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {/* Password requirements */}
          <div className="text-sm text-gray-500">
            <p className="font-medium mb-1">Password requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li className={newPassword.length >= 6 ? 'text-green-600' : ''}>
                At least 6 characters
              </li>
              <li className={newPassword && newPassword === confirmPassword ? 'text-green-600' : ''}>
                Passwords must match
              </li>
            </ul>
          </div>

          <CBRE.CBREButton
            type="submit"
            className="w-full"
            disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Updating Password...
              </span>
            ) : (
              'Update Password'
            )}
          </CBRE.CBREButton>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/admin" className="text-sm text-[#003F2D] hover:underline">
            Back to Admin Login
          </Link>
        </div>
      </CBRE.CBRECard>
    </div>
  )
}

