import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
interface CBREResizablePanelGroupProps extends React.ComponentProps<typeof ResizablePrimitive.PanelGroup> {
    variant?: 'default' | 'bordered';
}
interface CBREResizablePanelProps extends React.ComponentProps<typeof ResizablePrimitive.Panel> {
    variant?: 'default' | 'bordered';
}
interface CBREResizableHandleProps extends React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> {
    withHandle?: boolean;
    handleColor?: 'cbre-green' | 'accent-green' | 'dark-grey' | 'light-grey';
}
/**
 * CBREResizablePanelGroup - A styled resizable panel group following CBRE design
 *
 * Features:
 * - CBRE styling with customizable variants
 * - Supports both horizontal and vertical orientations
 */
declare function CBREResizablePanelGroup({ className, variant, ...props }: CBREResizablePanelGroupProps): React.JSX.Element;
/**
 * CBREResizablePanel - A styled resizable panel following CBRE design
 *
 * Features:
 * - CBRE styling with customizable variants
 * - Integrates with CBREResizablePanelGroup
 */
declare function CBREResizablePanel({ className, variant, ...props }: CBREResizablePanelProps): React.JSX.Element;
/**
 * CBREResizableHandle - A styled resize handle following CBRE design
 *
 * Features:
 * - CBRE styling with customizable color options
 * - Optional handle grip for better visual feedback
 */
declare function CBREResizableHandle({ withHandle, handleColor, className, ...props }: CBREResizableHandleProps): React.JSX.Element;
export { CBREResizablePanelGroup, CBREResizablePanel, CBREResizableHandle };
export { CBREResizablePanelGroup as ResizablePanelGroup, CBREResizablePanel as ResizablePanel, CBREResizableHandle as ResizableHandle };
