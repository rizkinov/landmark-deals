import React from 'react';
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
export declare const CBREArrowButton: ({ children, href, className, onClick, }: CBREArrowButtonProps) => React.JSX.Element;
export {};
