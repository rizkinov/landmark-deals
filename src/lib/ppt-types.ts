// PPT Layout types and constants - safe to import anywhere
export type PPTLayout = 'table' | 'grid-2x2' | 'grid-4x2' | 'grid-5x2' | 'grid-8x1' | 'grid-8x2'

export interface PPTLayoutOption {
  id: PPTLayout
  name: string
  description: string
  preview: string
}

export const PPT_LAYOUTS: PPTLayoutOption[] = [
  {
    id: 'table',
    name: 'Table List',
    description: 'Same as PDF - long table format with all details',
    preview: 'table'
  },
  {
    id: 'grid-2x2',
    name: '2×2 Grid',
    description: '4 deals per slide in a 2 column × 2 row layout',
    preview: 'grid-2x2'
  },
  {
    id: 'grid-4x2',
    name: '4×2 Grid',
    description: '8 deals per slide in a 4 column × 2 row layout',
    preview: 'grid-4x2'
  },
  {
    id: 'grid-5x2',
    name: '5×2 Grid',
    description: '10 deals per slide in a 5 column × 2 row layout',
    preview: 'grid-5x2'
  },
  {
    id: 'grid-8x1',
    name: '8×1 Grid',
    description: '8 deals per slide in a single row',
    preview: 'grid-8x1'
  },
  {
    id: 'grid-8x2',
    name: '8×2 Grid',
    description: '16 deals per slide in an 8 column × 2 row layout',
    preview: 'grid-8x2'
  }
]

