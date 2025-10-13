'use client'

import { useState } from 'react'
import { verifySitePassword } from '../lib/site-access'
import * as CBRE from './cbre'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

interface SiteAccessModalProps {
  isOpen: boolean
  onSuccess: () => void
}

export function SiteAccessModal({ isOpen, onSuccess }: SiteAccessModalProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const isValid = await verifySitePassword(password)

      if (isValid) {
        onSuccess()
        setPassword('')
        setAttempts(0)
      } else {
        setAttempts(prev => prev + 1)
        setError('Incorrect password. Please try again.')
        setPassword('')

        // Optional: Add rate limiting after multiple attempts
        if (attempts >= 4) {
          setError('Too many failed attempts. Please contact an administrator.')
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setAttempts(0)
          }, 5000)
        }
      }
    } catch (err) {
      console.error('Error verifying password:', err)
      setError('An error occurred. Please try again.')
    } finally {
      if (attempts < 4) {
        setLoading(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 w-full max-w-md mx-4 shadow-2xl">
        {/* CBRE Branding */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#003F2D] mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">CBRE</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Required
          </h2>
          <p className="text-gray-600 text-sm">
            This site contains sensitive real estate information.<br />
            Please enter the access password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#003F2D]"
                required
                disabled={loading}
                autoFocus
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={loading}
                tabIndex={-1}
              >
                {showPassword ? <EyeClosedIcon className="w-4 h-4" /> : <EyeOpenIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <CBRE.CBREButton
            type="submit"
            className="w-full"
            disabled={loading || !password}
          >
            {loading ? 'Verifying...' : 'Access Site'}
          </CBRE.CBREButton>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            CBRE Capital Market Landmark Deals
            <br />
            Access will be granted for 24 hours
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Need access?{' '}
            <a
              href="mailto:Christy.Chan@cbre.com"
              className="text-[#003F2D] hover:underline"
            >
              Contact Administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
