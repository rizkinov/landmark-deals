import * as React from "react";
import { toast as sonnerToast, ToastT, Toaster as SonnerToaster, useSonner } from "sonner";

// Re-export the Toaster component with CBRE styling
export function CBREToaster() {
  return (
    <SonnerToaster
      theme="light"
      className="font-calibre"
      toastOptions={{
        classNames: {
          toast: "bg-white border-light-grey",
          title: "text-dark-grey font-semibold",
          description: "text-dark-grey",
          actionButton: "bg-cbre-green text-white hover:bg-cbre-green/90",
          cancelButton: "bg-muted text-muted-foreground hover:bg-muted/90",
          error: "bg-destructive/15 border-destructive text-destructive",
          success: "bg-accent-green/15 border-accent-green text-cbre-green",
        },
      }}
    />
  );
}

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

// Helper function to show toasts with CBRE styling
export function toast({
  title,
  description,
  variant = "default",
  action,
  duration = 5000,
}: CBREToastOptions) {
  return sonnerToast(title || description, {
    description: title ? description : undefined,
    duration,
    ...(variant === "success" && { success: true }),
    ...(variant === "error" && { error: true }),
    ...(action && {
      action: {
        label: action.label,
        onClick: action.onClick,
      },
    }),
  });
}

// Export the useSonner hook for direct access to sonner's functionality
export { useSonner as useToast } from "sonner"; 