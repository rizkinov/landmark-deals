import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
/**
 * CBRECheckboxGroup - A group of checkboxes with a shared title
 */
interface CheckboxGroupProps {
    title?: string;
    description?: string;
    className?: string;
    children: React.ReactNode;
}
declare function CBRECheckboxGroup({ title, description, className, children }: CheckboxGroupProps): React.JSX.Element;
/**
 * CheckboxWithText - A helper function to create a checkbox with label and description
 *
 * Not exported as a component - use composition pattern instead:
 *
 * <div className="flex items-start space-x-2">
 *   <Checkbox id="my-checkbox" checked={checked} onCheckedChange={setChecked} />
 *   <div className="grid gap-1.5">
 *     <Label htmlFor="my-checkbox">Label text</Label>
 *     <p className="text-xs text-light-grey">Description text</p>
 *   </div>
 * </div>
 */
export { CBRECheckboxGroup };
export { Checkbox, CBRECheckboxGroup as CheckboxGroup };
