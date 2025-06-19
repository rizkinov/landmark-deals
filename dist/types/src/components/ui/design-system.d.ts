import React from 'react';
/**
 * CBRE Design System
 *
 * Use this component to document and manage your design system
 *
 * Colors are defined as CSS variables in globals.css:
 * - Use bg-[var(--cbre-green)] for background colors
 * - Use text-[var(--cbre-green)] for text colors
 * - Use border-[var(--cbre-green)] for border colors
 */
type ColorName = 'cbre-green' | 'accent-green' | 'dark-green' | 'dark-grey' | 'light-grey' | 'lighter-grey' | 'midnight' | 'midnight-tint' | 'sage' | 'sage-tint' | 'celadon' | 'celadon-tint' | 'wheat' | 'wheat-tint' | 'cement' | 'cement-tint' | 'data-orange' | 'data-purple' | 'data-light-purple' | 'data-blue' | 'data-light-blue' | 'negative-red';
export declare const getCSSVar: (name: ColorName) => string;
type ColorSwatchProps = {
    colorName: ColorName;
    hexCode: string;
    pantone?: string;
    cmyk?: string;
    rgb?: string;
    className?: string;
};
export declare function ColorSwatch({ colorName, hexCode, pantone, cmyk, rgb, className }: ColorSwatchProps): React.JSX.Element;
export declare function PrimaryColors(): React.JSX.Element;
export declare function SecondaryColors(): React.JSX.Element;
export declare function ChartsAndGraphsColors(): React.JSX.Element;
export declare function InfographicsColors(): React.JSX.Element;
export declare function DesignSystemColors(): React.JSX.Element;
export {};
