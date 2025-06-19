import * as React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
/**
 * CBRE Theme Provider
 *
 * This component ensures consistent CBRE theming across the application.
 * We're extending the next-themes provider to ensure proper theming for CBRE's brand.
 */
export declare function CBREThemeProvider({ children, ...props }: ThemeProviderProps): React.JSX.Element;
