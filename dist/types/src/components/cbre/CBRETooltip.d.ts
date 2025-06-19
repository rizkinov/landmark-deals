import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
export interface CBRETooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    delayDuration?: number;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}
export declare function CBRETooltip({ children, content, delayDuration, side, align, }: CBRETooltipProps): React.JSX.Element;
export { TooltipProvider as CBRETooltipProvider };
