import * as React from "react";
interface ChartData {
    name: string;
    actual?: number;
    target?: number;
    value?: number;
}
export declare const chartConfig: {
    colors: string[];
    axis: string;
    grid: string;
    tooltip: {
        background: string;
        text: string;
        border: string;
    };
};
export declare function ChartTooltip({ active, payload, label, className, }: {
    active?: boolean;
    payload?: any[];
    label?: string;
    className?: string;
}): React.JSX.Element | null;
export declare function CBRESimpleBarChart({ data, className, }: {
    data: ChartData[];
    className?: string;
}): React.JSX.Element;
export declare function CBRESimpleLineChart({ data, className, }: {
    data: ChartData[];
    className?: string;
}): React.JSX.Element;
export declare function CBRESimplePieChart({ data, className, }: {
    data: ChartData[];
    className?: string;
}): React.JSX.Element;
export declare function CBREHorizontalBarChart({ data, className, }: {
    data: Array<{
        name: string;
        actual: number;
        target: number;
    }>;
    className?: string;
}): React.JSX.Element;
export {};
