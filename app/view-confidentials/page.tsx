'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as CBRE from '../../src/components/cbre'
import { EyeOpenIcon, EyeClosedIcon, ExclamationTriangleIcon, LockClosedIcon, CheckCircledIcon, LockOpen1Icon } from '@radix-ui/react-icons'
import { useConfidentialAccess } from '../../src/hooks/use-confidential-access'

export default function ViewConfidentialsPage() {
    const router = useRouter()
    const { hasAccess, grantAccess, revokeAccess, timeRemaining } = useConfidentialAccess()

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Handle hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 300))

        const success = grantAccess(password)

        if (success) {
            setPassword('')
            // Redirect to deals page after successful authentication
            router.push('/deals')
        } else {
            setError('Incorrect password. Please try again.')
        }

        setLoading(false)
    }

    const handleGoToDeals = () => {
        router.push('/deals')
    }

    const handleRevoke = () => {
        revokeAccess()
    }

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
            </div>
        )
    }

    // If already has access, show the access status with option to go to deals
    if (hasAccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-50 border-b border-green-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                                <LockOpen1Icon className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Access Granted
                                </h2>
                                <p className="text-sm text-green-700">
                                    Confidential pricing unlocked
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-green-800">You have confidential access</p>
                                    {timeRemaining && (
                                        <p className="text-sm text-green-600">{timeRemaining}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            You can now view confidential pricing information on all deals. This access will remain active for 24 hours.
                        </p>

                        <div className="space-y-3">
                            <CBRE.CBREButton
                                onClick={handleGoToDeals}
                                className="w-full"
                            >
                                Go to Deals →
                            </CBRE.CBREButton>

                            <CBRE.CBREButton
                                variant="outline"
                                onClick={handleRevoke}
                                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                            >
                                Revoke Access
                            </CBRE.CBREButton>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                        <p className="text-xs text-gray-500 text-center">
                            CBRE Capital Markets - Landmark Deals
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // Password entry form
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
                {/* Header with warning styling */}
                <div className="bg-amber-50 border-b border-amber-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-full">
                            <ExclamationTriangleIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Confidential Access
                            </h2>
                            <p className="text-sm text-amber-700">
                                Restricted information request
                            </p>
                        </div>
                    </div>
                </div>

                {/* Warning message */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <LockClosedIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-red-800">
                                <p className="font-semibold mb-2">Important Notice:</p>
                                <ul className="list-disc list-inside space-y-1 text-red-700">
                                    <li>This information is strictly confidential</li>
                                    <li>Use this data responsibly and for authorized purposes only</li>
                                    <li>Do not share or distribute confidential deal information</li>
                                    <li>Access will be granted for 24 hours only</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="px-6 py-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Password to Access Confidential Data
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter confidential access password"
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D]"
                                    required
                                    disabled={loading}
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeClosedIcon className="w-4 h-4" /> : <EyeOpenIcon className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <CBRE.CBREButton
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/deals')}
                                disabled={loading}
                                className="flex-1"
                            >
                                Cancel
                            </CBRE.CBREButton>
                            <CBRE.CBREButton
                                type="submit"
                                className="flex-1"
                                disabled={loading || !password}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Verifying...
                                    </>
                                ) : (
                                    'Access Confidentials'
                                )}
                            </CBRE.CBREButton>
                        </div>
                    </form>
                </div>

                {/* Footer note */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                        By entering this password, you acknowledge that you are authorized to view confidential deal information.
                    </p>
                </div>
            </div>
        </div>
    )
}
