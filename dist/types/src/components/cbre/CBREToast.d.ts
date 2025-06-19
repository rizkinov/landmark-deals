import * as React from "react";
export declare function CBREToaster(): React.JSX.Element;
type ToastVariant = "default" | "success" | "error";
interface CBREToastOptions {
    title?: string;
    description?: string;
    variant?: ToastVariant;
    action?: {
        label: string;
        onClick: () => void;
    };
    duration?: number;
}
export declare function toast({ title, description, variant, action, duration, }: CBREToastOptions): string | number;
export { useSonner as useToast } from "sonner";
