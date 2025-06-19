import React from 'react';
interface CBREAccordionProps {
    items: {
        title: string;
        content: React.ReactNode;
    }[];
    className?: string;
    type?: "single" | "multiple";
    defaultValue?: string | string[];
    collapsible?: boolean;
}
/**
 * CBREAccordion - A styled accordion component following CBRE design
 *
 * Features:
 * - CBRE green text for headers
 * - Top and bottom borders for each item
 * - Custom arrow icon with CBRE styling
 */
export declare function CBREAccordion({ items, className, type, defaultValue, collapsible, }: CBREAccordionProps): React.JSX.Element;
export {};
