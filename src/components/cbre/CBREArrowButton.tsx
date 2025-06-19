"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface CBREArrowButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * CBREArrowButton
 * 
 * A custom button that displays "-- Text" by default, and transforms to "Text -->"
 * on hover, following CBRE's design language.
 */
export const CBREArrowButton = ({
  children,
  href,
  className,
  onClick,
}: CBREArrowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const content = (
    <div 
      className={cn(
        "group inline-flex items-center relative h-5", 
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Container to maintain fixed height and width */}
      <div className="w-5 h-5 relative mr-2">
        {/* Default state dash */}
        <div 
          className={cn(
            "absolute inset-0 transition-transform duration-300 ease-in-out",
            isHovered ? "transform -translate-x-2 opacity-0" : "transform translate-x-0 opacity-100"
          )}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <line 
              x1="4" 
              y1="10" 
              x2="16" 
              y2="10" 
              stroke="#17E88F" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      
      {/* Text content - always visible but moves left on hover */}
      <span className={cn(
        "text-primary font-calibre font-medium transition-transform duration-300 ease-in-out",
        isHovered ? "transform -translate-x-7" : "transform translate-x-0"
      )}>
        {children}
      </span>
      
      {/* Container for arrow to maintain fixed dimensions */}
      <div className={cn(
        "w-5 h-5 relative transition-all duration-300 ease-in-out",
        isHovered ? "ml-[-15px]" : "ml-2"
      )}>
        {/* Hover state arrow */}
        <div className={cn(
          "absolute inset-0 transition-transform duration-300 ease-in-out",
          isHovered ? "transform translate-x-0 opacity-100" : "transform translate-x-2 opacity-0"
        )}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <line 
              x1="2" 
              y1="10" 
              x2="12" 
              y2="10" 
              stroke="#17E88F" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            <path 
              d="M10 6L14 10L10 14" 
              stroke="#17E88F" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}; 