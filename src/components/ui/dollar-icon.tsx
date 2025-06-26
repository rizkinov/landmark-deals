import React from 'react'

interface DollarIconProps {
  className?: string
}

export function DollarIcon({ className = "w-4 h-4" }: DollarIconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.5 1C7.77614 1 8 1.22386 8 1.5V2.04999C9.47656 2.17627 10.5 3.20842 10.5 4.5C10.5 4.77614 10.2761 5 10 5C9.72386 5 9.5 4.77614 9.5 4.5C9.5 3.67157 8.82843 3 8 3H7C6.17157 3 5.5 3.67157 5.5 4.5C5.5 5.32843 6.17157 6 7 6H8C9.38071 6 10.5 7.11929 10.5 8.5C10.5 9.79158 9.47656 10.8237 8 10.95V11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5V10.95C5.52344 10.8237 4.5 9.79158 4.5 8.5C4.5 8.22386 4.72386 8 5 8C5.27614 8 5.5 8.22386 5.5 8.5C5.5 9.32843 6.17157 10 7 10H8C8.82843 10 9.5 9.32843 9.5 8.5C9.5 7.67157 8.82843 7 8 7H7C5.61929 7 4.5 5.88071 4.5 4.5C4.5 3.20842 5.52344 2.17627 7 2.04999V1.5C7 1.22386 7.22386 1 7.5 1Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
} 