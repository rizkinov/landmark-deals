import React from 'react';
interface CBRECTABlockProps {
    title: string;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
}
/**
 * CBRECTABlock - A styled call-to-action block component following CBRE design
 *
 * Features:
 * - Light gray background (#C0D4CB)
 * - Title with Get in Touch button
 */
export declare function CBRECTABlock({ title, buttonText, onButtonClick, className }: CBRECTABlockProps): React.JSX.Element;
export {};
