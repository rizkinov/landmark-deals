'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Deal, CreateDealData, COUNTRIES, ASSET_CLASSES, SERVICES, QUARTERS, COUNTRY_CURRENCIES, DEAL_TYPES, LENDER_SOURCES, FINANCING_PURPOSES, PriceDisplayMode } from '../../lib/types'
import { createDeal, updateDeal } from '../../lib/supabase'
import { roundUsdFromLocal, EXCHANGE_RATES } from '../../lib/utils'
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
  initialServiceType?: 'Property Sales' | 'Capital Advisors' | 'Debt & Structured Finance' | 'Sale & Leaseback'
}

export function DealForm({ deal, isEditing = false, initialServiceType }: DealFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [formData, setFormData] = useState<CreateDealData>({
    property_name: '',
    property_image_url: '/default-photo.jpeg',
    country: 'Singapore',
    deal_price_usd: 0,
    local_currency: 'SGD', // Default to SGD for Singapore
    local_currency_amount: 0,
    asset_class: 'Office',
    services: initialServiceType || 'Capital Advisors',
    deal_date: 'Q4 2024',
    buyer: '',
    seller: '',
    location: '',
    remarks: '',
    is_confidential: false,
    price_display_mode: 'exact',
    show_usd: true,
    // D&SF specific fields
    deal_type: undefined,
    purpose: undefined,
    loan_size_local: undefined,
    loan_size_currency: undefined,
    ltv_percentage: undefined,
    loan_term: undefined,
    borrower: undefined,
    lender_source: undefined,
    // Sale & Leaseback specific fields
    yield_percentage: undefined,
    gla_sqm: undefined,
    tenant: undefined,
    lease_term_years: undefined,
    annual_rent: undefined,
    rent_currency: undefined,
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
        is_confidential: deal.is_confidential || false,
        price_display_mode: deal.price_display_mode || 'exact',
        show_usd: deal.show_usd !== undefined ? deal.show_usd : true,
        // D&SF specific fields
        deal_type: deal.deal_type as any,
        purpose: deal.purpose,
        loan_size_local: deal.loan_size_local,
        loan_size_currency: deal.loan_size_currency as any,
        ltv_percentage: deal.ltv_percentage,
        loan_term: deal.loan_term,
        borrower: deal.borrower,
        lender_source: deal.lender_source as any,
      })
    }
  }, [deal, isEditing])

  // Auto-calculate local currency amount based on USD and selected currency (simplified)
  useEffect(() => {
    if (formData.deal_price_usd > 0 && formData.local_currency !== 'USD') {
      const rate = EXCHANGE_RATES[formData.local_currency] || 1
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

  // Removed auto-rounding USD for 'over' and 'approx' modes
  // Users can now independently set both USD and local currency amounts

  // Auto-set default local currency based on country
  useEffect(() => {
    const availableCurrencies = COUNTRY_CURRENCIES[formData.country as keyof typeof COUNTRY_CURRENCIES] || ['USD']
    const suggestedCurrency = availableCurrencies[0] // First currency is the local currency

    if (suggestedCurrency && formData.local_currency !== suggestedCurrency) {
      setFormData(prev => ({
        ...prev,
        local_currency: suggestedCurrency as any
      }))
    }
  }, [formData.country])

  // Redirect to Capital Advisors comprehensive form when selected (only for new deals)
  useEffect(() => {
    if (!isEditing && formData.services === 'Capital Advisors' && !redirecting && initialServiceType !== 'Capital Advisors') {
      setRedirecting(true)
      router.push('/admin/deals/capital-advisors/new')
    }
  }, [formData.services, isEditing, redirecting, router, initialServiceType])

  // Handle D&SF service selection - set appropriate defaults
  useEffect(() => {
    if (formData.services === 'Debt & Structured Finance') {
      setFormData(prev => ({
        ...prev,
        buyer: prev.buyer || 'N/A',
        seller: prev.seller || 'N/A',
        loan_size_currency: prev.loan_size_currency || prev.local_currency
      }))
    }
  }, [formData.services, formData.local_currency])

  // Auto-calculate USD equivalent for loan size (for consistency with deal_price_usd)
  useEffect(() => {
    if (formData.services === 'Debt & Structured Finance' &&
        formData.loan_size_local &&
        formData.loan_size_currency) {

      const exchangeRates: Record<string, number> = {
        AUD: 1.5,
        CNY: 7.2,
        HKD: 7.8,
        INR: 83,
        JPY: 150,
        KRW: 1300,
        MVR: 15.4,
        MYR: 4.7,
        NZD: 1.6,
        PHP: 56,
        SGD: 1.35,
        THB: 36,
        TWD: 31,
        USD: 1,
        VND: 24000
      }

      const rate = exchangeRates[formData.loan_size_currency as keyof typeof exchangeRates] || 1
      const usdEquivalent = Math.round(formData.loan_size_local / rate * 10) / 10

      // Set deal_price_usd to loan size USD equivalent for D&SF deals
      setFormData(prev => ({
        ...prev,
        deal_price_usd: usdEquivalent,
        local_currency_amount: prev.loan_size_local || 0
      }))
    }
  }, [formData.loan_size_local, formData.loan_size_currency, formData.services])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Service-specific validation
      if (formData.services === 'Debt & Structured Finance') {
        // D&SF specific validation - all fields optional
        if (formData.ltv_percentage && (formData.ltv_percentage < 0 || formData.ltv_percentage > 100)) {
          throw new Error('LTV percentage must be between 0 and 100')
        }

        if (formData.loan_size_local && formData.loan_size_local <= 0) {
          throw new Error('Loan size must be greater than 0')
        }

        // Set buyer/seller to N/A for D&SF deals
        formData.buyer = 'N/A'
        formData.seller = 'N/A'
      } else if (formData.services === 'Sale & Leaseback') {
        // Sale & Leaseback specific validation - all fields optional
        if (formData.yield_percentage && (formData.yield_percentage <= 0 || formData.yield_percentage > 100)) {
          throw new Error('Yield percentage must be between 0 and 100')
        }

        if (formData.gla_sqm && formData.gla_sqm <= 0) {
          throw new Error('GLA must be greater than 0')
        }

        if (formData.lease_term_years && formData.lease_term_years <= 0) {
          throw new Error('Lease term must be greater than 0')
        }

        if (formData.annual_rent && formData.annual_rent <= 0) {
          throw new Error('Annual rent must be greater than 0')
        }

        // Set buyer/seller for Sale & Leaseback deals
        formData.buyer = formData.buyer || 'N/A'
        formData.seller = formData.tenant || 'N/A'

        // Ensure deal_price_usd is set based on annual_rent if provided
        if (formData.annual_rent && (!formData.deal_price_usd || formData.deal_price_usd === 0)) {
          formData.deal_price_usd = formData.annual_rent
        } else if (!formData.deal_price_usd || formData.deal_price_usd === 0) {
          formData.deal_price_usd = 0
        }
      } else {
        // Non-D&SF and non-S&L deals require buyer/seller and pricing
        if (!formData.buyer || !formData.seller) {
          throw new Error('Buyer and Seller are required for this deal type')
        }

        if (formData.deal_price_usd <= 0) {
          throw new Error('Deal price must be greater than 0')
        }
      }

      if (isEditing && deal) {
        await updateDeal(deal.id, formData)
      } else {
        await createDeal(formData)
      }

      router.push('/admin/deals')
    } catch (error) {
      console.error('Error saving deal:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error saving deal: ${errorMessage}`)
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

  // Get dynamic title based on service type
  const getPageTitle = () => {
    switch (formData.services) {
      case 'Capital Advisors':
        return 'Add Capital Advisors Deal'
      case 'Debt & Structured Finance':
        return 'Add Debt & Structured Finance Deal'
      case 'Sale & Leaseback':
        return 'Add Sale & Leaseback Deal'
      case 'Property Sales':
      default:
        return 'Add Property Sales Deal'
    }
  }

  const getPageDescription = () => {
    switch (formData.services) {
      case 'Capital Advisors':
        return 'Create a new capital advisors project'
      case 'Debt & Structured Finance':
        return 'Create a new debt & structured finance transaction'
      case 'Sale & Leaseback':
        return 'Create a new sale & leaseback transaction'
      case 'Property Sales':
      default:
        return 'Create a new property sales transaction'
    }
  }

  // Show loading state when redirecting to Capital Advisors form
  if (redirecting) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
        <p className="text-gray-600">Redirecting to Capital Advisors form...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Page Header */}
      {!isEditing && (
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="mt-2 text-gray-600">
            {getPageDescription()}
          </p>
        </div>
      )}

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

      {/* Deal Details - Hide pricing fields for D&SF and Sale & Leaseback */}
      {formData.services !== 'Debt & Structured Finance' && formData.services !== 'Sale & Leaseback' && (
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

            {/* Price Display Mode - Only for Property Sales */}
            {formData.services === 'Property Sales' && (
              <div className="md:col-span-2 space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Display Mode
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['exact', 'over', 'approx', 'confidential'] as PriceDisplayMode[]).map((mode) => (
                      <label
                        key={mode}
                        className={`flex items-center justify-center px-4 py-3 border-2 rounded cursor-pointer transition-all ${
                          formData.price_display_mode === mode
                            ? 'border-[#003F2D] bg-[#003F2D] text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="price_display_mode"
                          value={mode}
                          checked={formData.price_display_mode === mode}
                          onChange={(e) => {
                            const newMode = e.target.value as PriceDisplayMode
                            handleInputChange('price_display_mode', newMode)
                            // Sync is_confidential
                            handleInputChange('is_confidential', newMode === 'confidential')
                          }}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium capitalize">{mode}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.price_display_mode === 'exact' && 'Display exact pricing without modifiers'}
                    {formData.price_display_mode === 'over' && 'Prefix prices with "Over" (e.g., "Over $100M")'}
                    {formData.price_display_mode === 'approx' && 'Add "~" suffix to prices (e.g., "$100M~")'}
                    {formData.price_display_mode === 'confidential' && 'Hide all pricing information'}
                  </p>
                </div>

                {/* Show USD as N/A checkbox - only visible for Over and Approx modes */}
                {(formData.price_display_mode === 'over' || formData.price_display_mode === 'approx') && (
                  <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                    <CBRE.Checkbox
                      id="show_usd"
                      checked={formData.show_usd !== false}
                      onCheckedChange={(checked) => handleInputChange('show_usd', checked)}
                    />
                    <label htmlFor="show_usd" className="text-sm font-medium text-gray-700">
                      Show USD amount (uncheck to display as "USD: -")
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Keep old checkbox for non-Property Sales services */}
            {formData.services !== 'Property Sales' && (
              <div className="flex items-center space-x-2">
                <CBRE.Checkbox
                  id="is_confidential"
                  checked={formData.is_confidential || false}
                  onCheckedChange={(checked) => {
                    handleInputChange('is_confidential', checked)
                    handleInputChange('price_display_mode', checked ? 'confidential' : 'exact')
                  }}
                />
                <label htmlFor="is_confidential" className="text-sm font-medium text-gray-700">
                  Mark pricing as confidential
                </label>
              </div>
            )}

            <div>
              {formData.services === 'Debt & Structured Finance' ? (
                <CBRE.CBRECombobox
                  label="Asset Class"
                  value={formData.asset_class}
                  onValueChange={(value) => handleInputChange('asset_class', value)}
                  options={ASSET_CLASSES}
                  placeholder="Select or type asset class..."
                />
              ) : (
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
              )}
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
      )}

      {/* Core Deal Information - Only for D&SF and Sale & Leaseback */}
      {(formData.services === 'Debt & Structured Finance' || formData.services === 'Sale & Leaseback') && (
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Core Deal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {formData.services === 'Debt & Structured Finance' ? (
                <CBRE.CBRECombobox
                  label="Asset Class"
                  value={formData.asset_class}
                  onValueChange={(value) => handleInputChange('asset_class', value)}
                  options={ASSET_CLASSES}
                  placeholder="Select or type asset class..."
                />
              ) : (
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
              )}
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
      )}

      {/* Additional Details - Only for Property Sales and Capital Advisors */}
      {formData.services !== 'Debt & Structured Finance' && formData.services !== 'Sale & Leaseback' && (
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      )}

      {/* Transaction Parties - Only show for traditional deals */}
      {formData.services !== 'Debt & Structured Finance' && formData.services !== 'Sale & Leaseback' && (
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transaction Parties
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
          </div>
        </CBRE.CBRECard>
      )}

      {/* Debt & Structured Finance Specific Fields */}
      {formData.services === 'Debt & Structured Finance' && (
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Debt & Structured Finance Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <CBRE.CBRESelect
                label="Deal Type"
                value={formData.deal_type || ''}
                onValueChange={(value) => handleInputChange('deal_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select deal type" />
                </SelectTrigger>
                <SelectContent>
                  {DEAL_TYPES.map(dealType => (
                    <SelectItem key={dealType} value={dealType}>
                      {dealType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </CBRE.CBRESelect>
            </div>

            <div>
              <CBRE.CBRECombobox
                label="Purpose"
                value={formData.purpose || ''}
                onValueChange={(value) => handleInputChange('purpose', value)}
                options={FINANCING_PURPOSES}
                placeholder="Select or type purpose..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Size (Local Currency)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.loan_size_local || ''}
                onChange={(e) => handleInputChange('loan_size_local', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., 73.5"
              />
              <p className="text-xs text-gray-500 mt-1">
                Amount in millions (local currency)
              </p>
            </div>

            <div>
              <CBRE.CBRESelect
                label="Loan Size Currency"
                value={formData.loan_size_currency || ''}
                onValueChange={(value) => handleInputChange('loan_size_currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CURRENCIES[formData.country]?.map(currency => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </CBRE.CBRESelect>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LTV Percentage
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.ltv_percentage || ''}
                onChange={(e) => handleInputChange('ltv_percentage', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., 70"
              />
              <p className="text-xs text-gray-500 mt-1">
                Loan-to-value ratio (0-100%)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term
              </label>
              <input
                type="text"
                value={formData.loan_term || ''}
                onChange={(e) => handleInputChange('loan_term', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., 4 years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Borrower
              </label>
              <input
                type="text"
                value={formData.borrower || ''}
                onChange={(e) => handleInputChange('borrower', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., Pelligra"
              />
            </div>

            <div>
              <CBRE.CBRECombobox
                label="Lender Source"
                value={formData.lender_source || ''}
                onValueChange={(value) => handleInputChange('lender_source', value)}
                options={LENDER_SOURCES}
                placeholder="Select or type lender source..."
              />
            </div>
          </div>
        </CBRE.CBRECard>
      )}

      {/* Sale & Leaseback Specific Fields */}
      {formData.services === 'Sale & Leaseback' && (
        <CBRE.CBRECard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sale & Leaseback Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenant (Seller / Lessee)
              </label>
              <input
                type="text"
                value={formData.tenant || ''}
                onChange={(e) => handleInputChange('tenant', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., New Edge Microbials"
              />
              <p className="text-xs text-gray-500 mt-1">
                Entity selling the property and leasing it back
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buyer (Investor)
              </label>
              <input
                type="text"
                value={formData.buyer || ''}
                onChange={(e) => handleInputChange('buyer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., Investment Fund Name"
              />
              <p className="text-xs text-gray-500 mt-1">
                Entity purchasing the property
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yield
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.yield_percentage || ''}
                onChange={(e) => handleInputChange('yield_percentage', parseFloat(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., 7.75"
              />
              <p className="text-xs text-gray-500 mt-1">
                Investment yield percentage (0-100%)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GLA (Square Meters)
              </label>
              <input
                type="number"
                min="1"
                value={formData.gla_sqm || ''}
                onChange={(e) => handleInputChange('gla_sqm', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., 7935"
              />
              <p className="text-xs text-gray-500 mt-1">
                Gross Leasable Area in square meters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leaseback Period (Years)
              </label>
              <input
                type="number"
                min="1"
                value={formData.lease_term_years || ''}
                onChange={(e) => handleInputChange('lease_term_years', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., 15"
              />
              <p className="text-xs text-gray-500 mt-1">
                Duration of leaseback agreement in years
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deal Price (Millions)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.annual_rent || ''}
                onChange={(e) => handleInputChange('annual_rent', parseFloat(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                placeholder="e.g., 0.97"
              />
              <p className="text-xs text-gray-500 mt-1">
                Deal price amount in millions
              </p>
            </div>

            <div>
              <CBRE.CBRESelect
                label="Deal Price Currency"
                value={formData.rent_currency || ''}
                onValueChange={(value) => handleInputChange('rent_currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CURRENCIES[formData.country]?.map(currency => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </CBRE.CBRESelect>
              <p className="text-xs text-gray-500 mt-1">
                Currency for deal price
              </p>
            </div>
          </div>
        </CBRE.CBRECard>
      )}

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
    </div>
  )
} 