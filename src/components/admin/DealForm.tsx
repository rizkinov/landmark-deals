'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Deal, CreateDealData, COUNTRIES, ASSET_CLASSES, SERVICES, QUARTERS, COUNTRY_CURRENCIES } from '../../lib/types'
import { createDeal, updateDeal } from '../../lib/supabase'
import * as CBRE from '../cbre'
import { 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select'
import { UploadIcon, ImageIcon, TrashIcon } from '@radix-ui/react-icons'
import { uploadPropertyImage } from '../../lib/storage'

interface DealFormProps {
  deal?: Deal | null
  isEditing?: boolean
}

export function DealForm({ deal, isEditing = false }: DealFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [formData, setFormData] = useState<CreateDealData>({
    property_name: '',
    property_image_url: '/default-photo.jpeg',
    country: 'Singapore',
    deal_price_usd: 0,
    local_currency: 'USD',
    local_currency_amount: 0,
    asset_class: 'Office',
    services: 'Capital Advisors',
    deal_date: 'Q4 2024',
    buyer: '',
    seller: '',
    location: '',
    remarks: '',
  })

  // Populate form if editing
  useEffect(() => {
    if (deal && isEditing) {
      setFormData({
        property_name: deal.property_name,
        property_image_url: deal.property_image_url || '',
        country: deal.country,
        deal_price_usd: deal.deal_price_usd,
        local_currency: deal.local_currency,
        local_currency_amount: deal.local_currency_amount,
        asset_class: deal.asset_class,
        services: deal.services,
        deal_date: deal.deal_date,
        buyer: deal.buyer,
        seller: deal.seller,
        location: deal.location,
        remarks: deal.remarks || '',
      })
    }
  }, [deal, isEditing])

  // Auto-calculate local currency amount based on USD and selected currency (simplified)
  useEffect(() => {
    if (formData.deal_price_usd > 0 && formData.local_currency !== 'USD') {
      // Simple exchange rate estimation - admin will adjust manually
      const exchangeRates: Record<string, number> = {
        SGD: 1.35,
        AUD: 1.5,
        JPY: 150,
        HKD: 7.8,
        CNY: 7.2,
        KRW: 1300,
        TWD: 31,
        MVR: 15.4,
        INR: 83,
        NZD: 1.6,
        PHP: 56,
        VND: 24000,
        THB: 36
      }

      const rate = exchangeRates[formData.local_currency as keyof typeof exchangeRates] || 1
      setFormData(prev => ({
        ...prev,
        local_currency_amount: Math.round(prev.deal_price_usd * rate * 10) / 10
      }))
    } else if (formData.local_currency === 'USD') {
      setFormData(prev => ({
        ...prev,
        local_currency_amount: prev.deal_price_usd
      }))
    }
  }, [formData.deal_price_usd, formData.local_currency])

  // Auto-set default local currency based on country
  useEffect(() => {
    const availableCurrencies = COUNTRY_CURRENCIES[formData.country as keyof typeof COUNTRY_CURRENCIES] || ['USD']
    const defaultCurrency = availableCurrencies[0] // First currency is the local currency
    
    const validCurrencies = ['USD', 'SGD', 'AUD', 'JPY', 'HKD', 'CNY', 'KRW', 'TWD', 'MVR', 'INR', 'NZD', 'PHP', 'VND', 'THB']
    
    if (defaultCurrency && validCurrencies.includes(defaultCurrency) && formData.local_currency !== defaultCurrency) {
      setFormData(prev => ({
        ...prev,
        local_currency: defaultCurrency as any
      }))
    }
  }, [formData.country])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEditing && deal) {
        await updateDeal(deal.id, formData)
      } else {
        await createDeal(formData)
      }
      
      router.push('/admin/deals')
    } catch (error) {
      console.error('Error saving deal:', error)
      alert('Error saving deal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateDealData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const processFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploading(true)
    
    try {
      // Upload to Supabase Storage
      const uploadedUrl = await uploadPropertyImage(file)
      handleInputChange('property_image_url', uploadedUrl)
      console.log('Image uploaded successfully:', uploadedUrl)
      
    } catch (error) {
      console.error('Error uploading file:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error uploading file: ${errorMessage}. Using default image instead.`)
      // Fallback to default image on error
      handleInputChange('property_image_url', '/default-photo.jpeg')
    } finally {
      setUploading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    await processFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      await processFile(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CBRE.CBRECard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Property Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Name *
            </label>
            <input
              type="text"
              required
              value={formData.property_name}
              onChange={(e) => handleInputChange('property_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              placeholder="e.g., Marina Bay Financial Centre"
            />
          </div>

          <div>
            <CBRE.CBRESelect
              label="Country *"
              value={formData.country}
              onValueChange={(value) => handleInputChange('country', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </CBRE.CBRESelect>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Image
            </label>
            <div className="space-y-4">
              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver 
                    ? 'border-[#003F2D] bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  
                  <div>
                    <label htmlFor="image-upload">
                      <CBRE.CBREButton 
                        type="button" 
                        variant="outline" 
                        className="gap-2 cursor-pointer"
                        disabled={uploading}
                        asChild
                      >
                        <span>
                          {uploading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#003F2D]"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <UploadIcon className="w-4 h-4" />
                              Choose Image
                            </>
                          )}
                        </span>
                      </CBRE.CBREButton>
                    </label>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    or drag and drop an image here
                  </p>
                </div>
              </div>



              {/* Image Preview */}
              {formData.property_image_url && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Preview:</p>
                    <CBRE.CBREButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('property_image_url', '/default-photo.jpeg')}
                      className="gap-1 text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <TrashIcon className="w-3 h-3" />
                      Remove
                    </CBRE.CBREButton>
                  </div>
                  <div className="relative w-48 h-32 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                    <img
                      src={formData.property_image_url}
                      alt="Property preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/default-photo.jpeg'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* File Upload Instructions */}
              <div className="text-xs text-gray-500">
                <p>• Supported formats: JPG, PNG, GIF, WebP</p>
                <p>• Maximum file size: 5MB</p>
                <p>• Recommended dimensions: 800x600px or higher</p>
              </div>
            </div>
          </div>
        </div>
      </CBRE.CBRECard>

      <CBRE.CBRECard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Deal Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deal Price (USD Millions) *
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.deal_price_usd}
              onChange={(e) => handleInputChange('deal_price_usd', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              placeholder="0.0"
            />
          </div>



          <div>
            <CBRE.CBRESelect
              label="Local Currency"
              value={formData.local_currency}
              onValueChange={(value) => handleInputChange('local_currency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {(COUNTRY_CURRENCIES[formData.country as keyof typeof COUNTRY_CURRENCIES] || ['USD']).map(currency => {
                  const isHighValueCurrency = ['JPY', 'KRW', 'TWD', 'VND'].includes(currency)
                  const unit = isHighValueCurrency ? 'Billions' : 'Millions'
                  return (
                    <SelectItem key={currency} value={currency}>
                      {currency} ({unit})
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </CBRE.CBRESelect>
            <p className="text-xs text-gray-500 mt-1">
              Available currencies for {formData.country}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Local Currency Amount ({formData.local_currency === 'JPY' || formData.local_currency === 'KRW' || formData.local_currency === 'TWD' ? 'Billions' : 'Millions'})
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.local_currency_amount}
              onChange={(e) => handleInputChange('local_currency_amount', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <CBRE.CBRESelect
              label="Asset Class *"
              value={formData.asset_class}
              onValueChange={(value) => handleInputChange('asset_class', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset class" />
              </SelectTrigger>
              <SelectContent>
                {ASSET_CLASSES.map(assetClass => (
                  <SelectItem key={assetClass} value={assetClass}>
                    {assetClass}
                  </SelectItem>
                ))}
              </SelectContent>
            </CBRE.CBRESelect>
          </div>

          <div>
            <CBRE.CBRESelect
              label="Services *"
              value={formData.services}
              onValueChange={(value) => handleInputChange('services', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </CBRE.CBRESelect>
          </div>

          <div>
            <CBRE.CBRESelect
              label="Deal Date *"
              value={formData.deal_date}
              onValueChange={(value) => handleInputChange('deal_date', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quarter" />
              </SelectTrigger>
              <SelectContent>
                {QUARTERS.map(quarter => (
                  <SelectItem key={quarter} value={quarter}>
                    {quarter}
                  </SelectItem>
                ))}
              </SelectContent>
            </CBRE.CBRESelect>
          </div>
        </div>
      </CBRE.CBRECard>

      <CBRE.CBRECard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Transaction Parties & Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buyer *
            </label>
            <input
              type="text"
              required
              value={formData.buyer}
              onChange={(e) => handleInputChange('buyer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              placeholder="e.g., CapitaLand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seller *
            </label>
            <input
              type="text"
              required
              value={formData.seller}
              onChange={(e) => handleInputChange('seller', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              placeholder="e.g., Government of Singapore"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
              placeholder="e.g., Marina Bay, Singapore"
            />
            <p className="text-xs text-gray-500 mt-1">
              City, district, or specific area where the property is located
            </p>
          </div>

          <div className="md:col-span-1">
            {/* Empty space to maintain grid layout */}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>
            <textarea
              value={formData.remarks || ''}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent resize-none"
              placeholder="Optional: Additional notes, strategic significance, or special circumstances..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional field for additional context or notes about this deal
            </p>
          </div>
        </div>
      </CBRE.CBRECard>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        <CBRE.CBREButton
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </CBRE.CBREButton>
        <CBRE.CBREButton
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Deal' : 'Create Deal')}
        </CBRE.CBREButton>
      </div>
    </form>
  )
} 