'use client'

import { useState } from 'react'
import { signInAdmin, signUpAdmin } from '../../lib/auth'
import * as CBRE from '../cbre'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

interface AdminLoginModalProps {
  isOpen: boolean
  onSuccess: () => void
}

export function AdminLoginModal({ isOpen, onSuccess }: AdminLoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignupMode, setIsSignupMode] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignupMode) {
        await signUpAdmin(email, password)
      } else {
        await signInAdmin(email, password)
      }
      onSuccess()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
      setError(errorMessage)
      
      // If login fails with "Invalid login credentials" and user hasn't tried signup yet
      if (errorMessage.includes('Invalid login credentials') && !isSignupMode) {
        setError('User not found. If you have an admin invitation, try signing up instead.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignupMode ? 'Admin Signup' : 'Admin Login'}
          </h2>
          <p className="text-gray-600">
            {isSignupMode 
              ? 'Create your admin account with invitation credentials'
              : 'Enter your admin credentials to continue'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D]"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D]"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                disabled={loading}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <CBRE.CBREButton 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading 
              ? (isSignupMode ? 'Creating account...' : 'Signing in...') 
              : (isSignupMode ? 'Create Account' : 'Sign In')
            }
          </CBRE.CBREButton>
        </form>

        {/* Toggle between login and signup */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignupMode(!isSignupMode)
              setError('')
            }}
            className="text-sm text-[#003F2D] hover:underline"
            disabled={loading}
          >
            {isSignupMode 
              ? 'Already have an account? Sign in instead'
              : 'Have an admin invitation? Sign up instead'
            }
          </button>
        </div>
      </div>
    </div>
  )
} 