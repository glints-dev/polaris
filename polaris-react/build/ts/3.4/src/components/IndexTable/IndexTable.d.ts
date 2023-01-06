import React from 'react';
import { BulkActionsProps } from '../BulkActions';
import { IndexProviderProps } from '../../utilities/index-provider';
import { NonEmptyArray } from '../../types';
interface IndexTableHeadingBase {
    flush?: boolean;
    new?: boolean;
    hidden?: boolean;
}
interface IndexTableHeadingTitleString extends IndexTableHeadingBase {
    title: string;
}
interface IndexTableHeadingTitleNode extends IndexTableHeadingBase {
    title: React.ReactNode;
    id: string;
}
export declare type IndexTableHeading = IndexTableHeadingTitleString | IndexTableHeadingTitleNode;
export declare type IndexTableSortDirection = 'ascending' | 'descending';
declare type IndexTableSortToggleLabel = {
    [key in IndexTableSortDirection]: string;
};
interface IndexTableSortToggleLabels {
    [key: number]: IndexTableSortToggleLabel;
}
export interface IndexTableBaseProps {
    headings: NonEmptyArray<IndexTableHeading>;
    promotedBulkActions?: BulkActionsProps['promotedActions'];
    bulkActions?: BulkActionsProps['actions'];
    children?: React.ReactNode;
    emptyState?: React.ReactNode;
    sort?: React.ReactNode;
    paginatedSelectAllActionText?: string;
    lastColumnSticky?: boolean;
    selectable?: boolean;
    /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
    sortable?: boolean[];
    /**
     * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to ascending.
     * @default 'descending'
     */
    defaultSortDirection?: IndexTableSortDirection;
    /** The current sorting direction. */
    sortDirection?: IndexTableSortDirection;
    /**
     * The index of the heading that the table rows are sorted by.
     */
    sortColumnIndex?: number;
    /** Callback fired on click or keypress of a sortable column heading. */
    onSort?(headingIndex: number, direction: IndexTableSortDirection): void;
    /** Optional dictionary of sort toggle labels for each sortable column, with ascending and descending label,
     * with the key as the index of the column */
    sortToggleLabels?: IndexTableSortToggleLabels;
}
export interface TableHeadingRect {
    offsetWidth: number;
    offsetLeft: number;
}
export interface IndexTableProps extends IndexTableBaseProps, IndexProviderProps {
}
export declare function IndexTable({ children, selectable, itemCount, selectedItemsCount, resourceName: passedResourceName, loading, hasMoreItems, condensed, onSelectionChange, ...indexTableBaseProps }: IndexTableProps): JSX.Element;
export declare namespace IndexTable {
    var Cell: React.NamedExoticComponent<import("./components").CellProps>;
    var Row: React.NamedExoticComponent<import("./components").RowProps>;
}
export {};
//# sourceMappingURL=IndexTable.d.ts.map
