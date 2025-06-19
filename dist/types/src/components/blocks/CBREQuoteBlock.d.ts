import React from 'react';
interface CBREQuoteBlockProps {
    quote: string;
    author: string;
    role: string;
    imageSrc?: string;
    className?: string;
}
/**
 * CBREQuoteBlock - A styled quote block component following CBRE design
 *
 * Features:
 * - Light gray background (#C0D4CB)
 * - Dark green left border (#012A2D)
 * - Quote with executive photo
 */
export declare function CBREQuoteBlock({ quote, author, role, imageSrc, className }: CBREQuoteBlockProps): React.JSX.Element;
export {};
