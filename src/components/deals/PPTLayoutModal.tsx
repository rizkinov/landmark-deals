'use client'

import { useState } from 'react'
import * as CBRE from '../cbre'
import { PPTLayout, PPT_LAYOUTS } from '../../lib/ppt-types'
import { CheckIcon } from '@radix-ui/react-icons'

interface PPTLayoutModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (layout: PPTLayout) => void
  isGenerating: boolean
}

// Layout preview components - updated to reflect actual layouts

function TableLayoutPreview() {
  return (
    <div className="w-full h-20 bg-gray-50 rounded border border-gray-200 p-1.5 flex flex-col">
      {/* Header */}
      <div className="h-1.5 w-full bg-[#012A2D] rounded-sm mb-1" />
      {/* Table rows with image column */}
      <div className="flex-1 flex flex-col gap-0.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-2.5 w-full rounded-sm flex gap-0.5 ${i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
            <div className="w-3 h-full bg-gray-300 rounded-sm" />
            <div className="flex-1 flex items-center gap-0.5 px-0.5">
              <div className="h-1 w-8 bg-gray-400 rounded-sm" />
              <div className="h-1 w-6 bg-gray-300 rounded-sm" />
              <div className="h-1 w-4 bg-gray-400 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Grid2x2Preview() {
  return (
    <div className="w-full h-20 bg-gray-50 rounded border border-gray-200 p-1.5">
      {/* Header */}
      <div className="h-1.5 w-full bg-[#012A2D] rounded-sm mb-1" />
      {/* 2x2 grid */}
      <div className="h-[calc(100%-10px)] grid grid-cols-2 grid-rows-2 gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col">
            <div className="h-1/2 w-full bg-gray-300" />
            <div className="h-1.5 w-full bg-[#012A2D]" />
            <div className="flex-1 px-0.5 py-0.5">
              <div className="h-1 w-full bg-gray-200 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Grid4x2Preview() {
  return (
    <div className="w-full h-20 bg-gray-50 rounded border border-gray-200 p-1.5">
      {/* Header */}
      <div className="h-1.5 w-full bg-[#012A2D] rounded-sm mb-1" />
      {/* 4x2 grid */}
      <div className="h-[calc(100%-10px)] grid grid-cols-4 grid-rows-2 gap-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col">
            <div className="h-1/2 w-full bg-gray-300" />
            <div className="h-1 w-full bg-[#012A2D]" />
            <div className="flex-1 px-0.5">
              <div className="h-0.5 w-full bg-gray-200 rounded-sm mt-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Grid5x2Preview() {
  return (
    <div className="w-full h-20 bg-gray-50 rounded border border-gray-200 p-1.5">
      {/* Header */}
      <div className="h-1.5 w-full bg-[#012A2D] rounded-sm mb-1" />
      {/* 5x2 grid */}
      <div className="h-[calc(100%-10px)] grid grid-cols-5 grid-rows-2 gap-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col">
            <div className="h-1/2 w-full bg-gray-300" />
            <div className="h-1 w-full bg-[#012A2D]" />
            <div className="flex-1 px-0.5">
              <div className="h-0.5 w-full bg-gray-200 rounded-sm mt-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Grid8x1Preview() {
  return (
    <div className="w-full h-20 bg-gray-50 rounded border border-gray-200 p-1.5">
      {/* Header */}
      <div className="h-1.5 w-full bg-[#012A2D] rounded-sm mb-1" />
      {/* 8x1 grid */}
      <div 
        className="h-[calc(100%-10px)] grid grid-cols-8 gap-0.5"
        style={{ gridTemplateRows: '1fr' }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col">
            <div className="h-1/2 w-full bg-gray-300" />
            <div className="h-0.5 w-full bg-[#012A2D]" />
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Grid8x2Preview() {
  return (
    <div className="w-full h-20 bg-gray-50 rounded border border-gray-200 p-1.5">
      {/* Header */}
      <div className="h-1.5 w-full bg-[#012A2D] rounded-sm mb-1" />
      {/* 8x2 grid */}
      <div className="h-[calc(100%-10px)] grid grid-cols-8 grid-rows-2 gap-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col">
            <div className="h-1/2 w-full bg-gray-300" />
            <div className="h-0.5 w-full bg-[#012A2D]" />
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

function LayoutPreview({ layout }: { layout: PPTLayout }) {
  switch (layout) {
    case 'table':
      return <TableLayoutPreview />
    case 'grid-2x2':
      return <Grid2x2Preview />
    case 'grid-4x2':
      return <Grid4x2Preview />
    case 'grid-5x2':
      return <Grid5x2Preview />
    case 'grid-8x1':
      return <Grid8x1Preview />
    case 'grid-8x2':
      return <Grid8x2Preview />
    default:
      return null
  }
}

export function PPTLayoutModal({ isOpen, onClose, onSelect, isGenerating }: PPTLayoutModalProps) {
  const [selectedLayout, setSelectedLayout] = useState<PPTLayout>('grid-2x2')

  const handleGenerate = () => {
    onSelect(selectedLayout)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#003F2D] px-6 py-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">
            Choose PowerPoint Layout
          </h2>
          <p className="text-sm text-white/80 mt-1">
            Select how you want the deals to be displayed in the presentation
          </p>
        </div>

        {/* Layout options - scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PPT_LAYOUTS.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setSelectedLayout(layout.id)}
                disabled={isGenerating}
                className={`
                  relative p-3 rounded-lg border-2 text-left transition-all flex flex-col
                  ${selectedLayout === layout.id
                    ? 'border-[#003F2D] bg-[#003F2D]/5'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                  ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {/* Selection indicator */}
                {selectedLayout === layout.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#003F2D] rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Preview */}
                <div className="mb-2">
                  <LayoutPreview layout={layout.id} />
                </div>

                {/* Info */}
                <h3 className={`font-semibold text-sm ${selectedLayout === layout.id ? 'text-[#003F2D]' : 'text-gray-900'}`}>
                  {layout.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 flex-grow">
                  {layout.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <CBRE.CBREButton
            variant="outline"
            onClick={onClose}
            disabled={isGenerating}
          >
            Cancel
          </CBRE.CBREButton>
          <CBRE.CBREButton
            onClick={handleGenerate}
            disabled={isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Generating...
              </>
            ) : (
              'Generate PowerPoint'
            )}
          </CBRE.CBREButton>
        </div>
      </div>
    </div>
  )
}

