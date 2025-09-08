'use client'

import { CapitalAdvisorsProject } from '../../lib/types'
import * as CBRE from '../cbre'
import Link from 'next/link'
import { useState } from 'react'

interface ProjectDetailProps {
  project: CapitalAdvisorsProject
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Main Image */}
      <div className="relative h-96 overflow-hidden">
        {project.property_image_url ? (
          <img
            src={project.property_image_url}
            alt={project.project_title}
            className="w-full h-full object-cover blur-sm scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center blur-sm">
            <div className="text-gray-400 text-center">
              <svg className="mx-auto h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-lg">No Image Available</p>
            </div>
          </div>
        )}
        
        {/* Stronger overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-10">
          <div className="max-w-5xl mx-auto">
            <CBRE.CBREBadge variant="secondary" className="bg-white/90 text-gray-800 mb-4">
              {project.country}
            </CBRE.CBREBadge>
            <h1 className="text-4xl md:text-6xl font-financier text-white mb-4 leading-tight">
              {project.project_title}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-calibre max-w-4xl leading-relaxed">
              {project.project_subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-10 px-4 md:px-10">
        {/* Navigation Bar */}
        <div className="mb-8 flex justify-between items-center">
          <Link href="/deals">
            <CBRE.CBREButton variant="outline">
              ← Back to Deals
            </CBRE.CBREButton>
          </Link>
          
          <div className="flex items-center space-x-4">
            <CBRE.CBREBadge variant="outline" className="text-sm">
              Capital Advisors
            </CBRE.CBREBadge>
            <span className="text-gray-500 font-calibre">{project.deal_date}</span>
          </div>
        </div>

        {/* Project Metadata */}
        <CBRE.CBRECard className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-2">
                Location
              </h3>
              <div className="flex items-center text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="font-calibre">{project.location}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-2">
                Date
              </h3>
              <span className="font-calibre text-gray-900">{project.deal_date}</span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-2">
                Country
              </h3>
              <span className="font-calibre text-gray-900">{project.country}</span>
            </div>
          </div>
        </CBRE.CBRECard>

        {/* Project Content */}
        {project.content_html && (
          <CBRE.CBRECard className="p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content_html }}
            />
          </CBRE.CBRECard>
        )}

        {/* Additional Information */}
        {(project.buyer !== 'N/A' || project.seller !== 'N/A' || project.remarks) && (
          <CBRE.CBRECard className="p-6 mb-8">
            <h2 className="text-2xl font-financier text-cbre-green mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.buyer && project.buyer !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-2">
                    Client/Buyer
                  </h3>
                  <span className="font-calibre text-gray-900">{project.buyer}</span>
                </div>
              )}

              {project.seller && project.seller !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-2">
                    Counterparty/Seller
                  </h3>
                  <span className="font-calibre text-gray-900">{project.seller}</span>
                </div>
              )}

              {project.deal_price_usd > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-2">
                    Transaction Value
                  </h3>
                  <span className="font-calibre text-gray-900">
                    {project.is_confidential ? 'Confidential' : `$${project.deal_price_usd}M USD`}
                  </span>
                </div>
              )}
            </div>

            {project.remarks && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-2">
                  Additional Notes
                </h3>
                <p className="font-calibre text-gray-900 leading-relaxed">{project.remarks}</p>
              </div>
            )}
          </CBRE.CBRECard>
        )}

        {/* Gallery Section */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <CBRE.CBRECard className="p-6">
            <h2 className="text-2xl font-financier text-cbre-green mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery_images.map((image, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedGalleryImage(image)}
                >
                  <img
                    src={image}
                    alt={`${project.project_title} - Image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </CBRE.CBRECard>
        )}
      </div>

      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedGalleryImage}
              alt="Gallery Image"
              className="max-w-full max-h-full object-contain"
            />
            <CBRE.CBREButton
              variant="outline"
              className="absolute top-4 right-4 bg-white"
              onClick={() => setSelectedGalleryImage(null)}
            >
              ✕
            </CBRE.CBREButton>
          </div>
        </div>
      )}

      {/* CBRE branded styles for content */}
      <style jsx global>{`
        .prose h1 {
          font-family: var(--font-financier-display), serif;
          color: #003F2D;
          font-size: 2.25rem;
          font-weight: 700;
          margin: 1.5rem 0;
        }
        .prose h2 {
          font-family: var(--font-financier-display), serif;
          color: #003F2D;
          font-size: 1.875rem;
          font-weight: 600;
          margin: 1.25rem 0;
        }
        .prose h3 {
          font-family: var(--font-financier-display), serif;
          color: #003F2D;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1rem 0;
        }
        .prose p {
          font-family: var(--font-calibre), sans-serif;
          color: #333;
          line-height: 1.7;
          margin: 0.75rem 0;
          font-size: 1.125rem;
        }
        .prose ul, .prose ol {
          font-family: var(--font-calibre), sans-serif;
          color: #333;
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin: 0.5rem 0;
          font-size: 1.125rem;
          line-height: 1.7;
        }
        .prose a {
          color: #003F2D;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #17E88F;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0;
          margin: 1.5rem 0;
        }
        .prose strong {
          color: #003F2D;
          font-weight: 600;
        }
        .prose blockquote {
          border-left: 4px solid #17E88F;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #555;
        }
      `}</style>
    </div>
  )
}