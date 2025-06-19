import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CBREStyledCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  accentColor?: 'default' | 'accent-green' | 'dark-grey' | 'sage' | 'celadon';
  footerAction?: {
    label: string;
    onClick?: () => void;
  };
}

/**
 * CBREStyledCard - A card component styled according to CBRE brand guidelines
 * 
 * This component demonstrates proper theming and styling for CBRE branded components
 * using shadcn/ui components as a foundation.
 */
export function CBREStyledCard({
  title,
  description,
  children,
  className,
  headerClassName,
  footerClassName,
  accentColor = 'default',
  footerAction
}: CBREStyledCardProps) {
  const accentColorMap = {
    'default': 'border-t-cbre-green',
    'accent-green': 'border-t-accent-green',
    'dark-grey': 'border-t-dark-grey',
    'sage': 'border-t-sage',
    'celadon': 'border-t-celadon'
  };
  
  return (
    <Card className={cn("flex flex-col border-t-4", accentColorMap[accentColor], className)}>
      <CardHeader className={headerClassName}>
        <CardTitle className="text-cbre-green font-financier">{title}</CardTitle>
        {description && <CardDescription className="text-dark-grey">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow text-dark-grey">
        {children}
      </CardContent>
      {footerAction && (
        <CardFooter className={footerClassName}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-cbre-green p-0 hover:bg-transparent hover:text-accent-green"
            onClick={footerAction.onClick}
          >
            {footerAction.label}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 