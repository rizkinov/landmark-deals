'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Deal, CreateCapitalAdvisorsData, COUNTRIES, QUARTERS, COUNTRY_CURRENCIES, ASSET_CLASSES } from '../../lib/types'
import { createDeal, updateDeal, updateCapitalAdvisorsProject } from '../../lib/supabase'
import { uploadPropertyImage } from '../../lib/storage'
import * as CBRE from '../cbre'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { CBRERichTextEditor } from './CBRERichTextEditor'
import { UploadIcon, ImageIcon, TrashIcon, Cross1Icon } from '@radix-ui/react-icons'

interface CapitalAdvisorsFormProps {
  deal?: Deal | null
  isEditing?: boolean
}

export function CapitalAdvisorsForm({ deal, isEditing = false }: CapitalAdvisorsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(!isEditing) // Only wait for data if editing
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<CreateCapitalAdvisorsData & { asset_class: string }>({
    project_title: '',
    project_subtitle: '',
    content_html: '',
    gallery_images: [],
    property_image_url: '/default-photo.jpeg',
    country: 'Singapore',
    deal_date: 'Q4 2024',
    location: '',
    deal_price_usd: 0,
    local_currency: 'USD',
    local_currency_amount: 0,
    buyer: '',
    seller: '',
    remarks: '',
    is_confidential: false,
    asset_class: 'Office',
  })

  // Populate form if editing
  useEffect(() => {
    if (deal && isEditing) {
      // console.log('Editing deal data:', deal) // Debug log
      // console.log('Asset class from deal:', deal.asset_class) // Debug log for asset class
      // console.log('Content HTML from deal:', deal.content_html) // Debug log for content
      // console.log('Gallery images from deal:', deal.gallery_images) // Debug log for gallery
      setFormData({
        project_title: deal.project_title || '',
        project_subtitle: deal.project_subtitle || '',
        content_html: deal.content_html || '',
        gallery_images: Array.isArray(deal.gallery_images) ? deal.gallery_images : [],
        property_image_url: deal.property_image_url || '/default-photo.jpeg',
        country: deal.country,
        deal_date: deal.deal_date,
        location: deal.location || '',
        deal_price_usd: deal.deal_price_usd || 0,
        local_currency: deal.local_currency || 'USD',
        local_currency_amount: deal.local_currency_amount || 0,
        buyer: deal.buyer || '',
        seller: deal.seller || '',
        remarks: deal.remarks || '',
        is_confidential: deal.is_confidential || false,
        asset_class: deal.asset_class,
      })
      // console.log('Form data set, asset class should be:', deal.asset_class) // Debug log
      setDataLoaded(true) // Mark data as loaded after setting form data
    }
  }, [deal, isEditing])

  // Update currency options when country changes
  useEffect(() => {
    const availableCurrencies = COUNTRY_CURRENCIES[formData.country]
    if (availableCurrencies && !availableCurrencies.includes(formData.local_currency || 'USD')) {
      setFormData(prev => ({ ...prev, local_currency: availableCurrencies[0] as any }))
    }
  }, [formData.country, formData.local_currency])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Convert to Deal format
      const dealData = {
        property_name: formData.project_title, // Use project title as property name
        property_image_url: formData.property_image_url,
        country: formData.country,
        deal_price_usd: formData.deal_price_usd || 0,
        local_currency: formData.local_currency || 'USD',
        local_currency_amount: formData.local_currency_amount || 0,
        asset_class: formData.asset_class as any,
        services: 'Capital Advisors' as const,
        deal_date: formData.deal_date,
        buyer: formData.buyer || 'N/A',
        seller: formData.seller || 'N/A',
        location: formData.location,
        remarks: formData.remarks,
        is_confidential: formData.is_confidential,
        // Capital Advisors specific fields
        project_title: formData.project_title,
        project_subtitle: formData.project_subtitle,
        content_html: formData.content_html,
        gallery_images: formData.gallery_images,
      }

      if (isEditing && deal) {
        await updateCapitalAdvisorsProject(deal.id, formData)
      } else {
        await createDeal(dealData)
      }

      // Force a hard refresh to bypass caching
      router.push('/admin/deals')
      router.refresh()
    } catch (error) {
      console.error('Error saving Capital Advisors project:', error)
      alert('Failed to save project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File, type: 'main' | 'gallery') => {
    setUploading(true)
    try {
      const url = await uploadPropertyImage(file)
      if (type === 'main') {
        setFormData(prev => ({ ...prev, property_image_url: url }))
      } else {
        setFormData(prev => ({
          ...prev,
          gallery_images: [...(prev.gallery_images || []), url]
        }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileUpload(files[0], 'main')
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images?.filter((_, i) => i !== index) || []
    }))
  }

  // Don't render form until data is loaded when editing
  if (isEditing && !dataLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <CBRE.CBREButton variant="outline" onClick={() => router.push('/admin/deals')}>
            ← Back to Admin
          </CBRE.CBREButton>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">
          {isEditing ? 'Edit' : 'Create'} Capital Advisors Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Title & Subtitle */}
          <CBRE.CBRECard className="p-6">
            <h2 className="text-2xl font-financier text-cbre-green mb-4">Project Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="project_title" className="text-sm font-medium text-gray-700">
                  Project Title *
                </Label>
                <Input
                  id="project_title"
                  type="text"
                  required
                  value={formData.project_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_title: e.target.value }))}
                  placeholder="e.g., Stockland Establishment of Two New Logistics Capital Partnerships"
                />
              </div>
              <div>
                <Label htmlFor="project_subtitle" className="text-sm font-medium text-gray-700">
                  Project Subtitle *
                </Label>
                <Input
                  id="project_subtitle"
                  type="text"
                  required
                  value={formData.project_subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_subtitle: e.target.value }))}
                  placeholder="e.g., Seeded with ~$800M of Super Prime Assets Across Sydney"
                />
              </div>
            </div>
          </CBRE.CBRECard>

          {/* Project Content */}
          <CBRE.CBRECard className="p-6">
            <h2 className="text-2xl font-financier text-cbre-green mb-4">Project Content</h2>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Project Details
              </Label>
              <div className="border border-light-grey rounded-none">
                <CBRERichTextEditor
                  content={formData.content_html}
                  onChange={(content) => setFormData(prev => ({ ...prev, content_html: content }))}
                  placeholder="Write about the project details, achievements, and key highlights..."
                  className="w-full"
                />
              </div>
            </div>
          </CBRE.CBRECard>

          {/* Main Image Upload */}
          <CBRE.CBRECard className="p-6">
            <h2 className="text-2xl font-financier text-cbre-green mb-4">Main Image</h2>
            <div
              className={`border-2 border-dashed p-6 text-center transition-colors ${
                dragOver ? 'border-cbre-green bg-green-50' : 'border-gray-300'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
            >
              {formData.property_image_url && formData.property_image_url !== '/default-photo.jpeg' ? (
                <div className="relative inline-block">
                  <img
                    src={formData.property_image_url}
                    alt="Main project image"
                    className="max-w-full h-48 object-cover mx-auto"
                  />
                  <CBRE.CBREButton
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    Change Image
                  </CBRE.CBREButton>
                </div>
              ) : (
                <div>
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <CBRE.CBREButton
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <UploadIcon className="mr-2 h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Choose Image'}
                    </CBRE.CBREButton>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Or drag and drop an image here
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, 'main')
              }}
            />
          </CBRE.CBRECard>

          {/* Gallery Images */}
          <CBRE.CBRECard className="p-6">
            <h2 className="text-2xl font-financier text-cbre-green mb-4">Gallery Images</h2>
            <div className="mb-4">
              <CBRE.CBREButton
                type="button"
                variant="outline"
                onClick={() => galleryInputRef.current?.click()}
                disabled={uploading}
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                Add Gallery Images
              </CBRE.CBREButton>
            </div>
            
            {formData.gallery_images && formData.gallery_images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.gallery_images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <CBRE.CBREButton
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-1 right-1 p-1 bg-white"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <Cross1Icon className="h-3 w-3" />
                    </CBRE.CBREButton>
                  </div>
                ))}
              </div>
            )}
            
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                files.forEach(file => handleFileUpload(file, 'gallery'))
              }}
            />
          </CBRE.CBRECard>

          {/* Basic Details */}
          <CBRE.CBRECard className="p-6">
            <h2 className="text-2xl font-financier text-cbre-green mb-4">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Country *
                </Label>
                <CBRE.CBRESelect
                  key={`country-${deal?.id || 'new'}`}
                  value={formData.country}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, country: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </CBRE.CBRESelect>
              </div>

              <div>
                <Label htmlFor="deal_date" className="text-sm font-medium text-gray-700">
                  Date *
                </Label>
                <CBRE.CBRESelect
                  key={`deal-date-${deal?.id || 'new'}`}
                  value={formData.deal_date}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, deal_date: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUARTERS.map((quarter) => (
                      <SelectItem key={quarter} value={quarter}>
                        {quarter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </CBRE.CBRESelect>
              </div>

              <div>
                <Label htmlFor="asset_class" className="text-sm font-medium text-gray-700">
                  Asset Class *
                </Label>
                <CBRE.CBRESelect
                  key={`asset-class-${deal?.id || 'new'}`}
                  value={formData.asset_class}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, asset_class: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset class" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSET_CLASSES.map((assetClass) => (
                      <SelectItem key={assetClass} value={assetClass}>
                        {assetClass}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </CBRE.CBRESelect>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location *
                </Label>
                <Input
                  id="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Marina Bay, Singapore"
                />
              </div>
            </div>
          </CBRE.CBRECard>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <CBRE.CBREButton
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/deals')}
              disabled={loading}
            >
              Cancel
            </CBRE.CBREButton>
            <CBRE.CBREButton
              type="submit"
              variant="primary"
              disabled={loading || !formData.project_title || !formData.project_subtitle}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
            </CBRE.CBREButton>
          </div>
        </form>
      </div>
    </div>
  )
}