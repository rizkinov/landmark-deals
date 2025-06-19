import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    showColumnVisibility?: boolean;
    showGlobalFilter?: boolean;
}
export declare function CBREDataTable<TData, TValue>({ columns, data, searchKey, showColumnVisibility, showGlobalFilter, }: DataTableProps<TData, TValue>): React.JSX.Element;
export {};
