import React from 'react';
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
export declare function CBREStyledCard({ title, description, children, className, headerClassName, footerClassName, accentColor, footerAction }: CBREStyledCardProps): React.JSX.Element;
export {};
