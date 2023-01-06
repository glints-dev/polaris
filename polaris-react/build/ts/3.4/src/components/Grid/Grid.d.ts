import React from 'react';
import { Cell } from './components';
declare type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
declare type Areas = {
    [Breakpoint in Breakpoints]?: string[];
};
declare type Columns = {
    [Breakpoint in Breakpoints]?: number;
};
declare type Gap = {
    [Breakpoint in Breakpoints]?: string;
};
export interface GridProps {
    areas?: Areas;
    columns?: Columns;
    gap?: Gap;
    children?: React.ReactNode;
}
/** **Experimental!**
 * This component is in alpha. Use with caution.
 * 6 column default for xs, sm, and md breakpoints.
 * 12 columns for lg, and xl.
 */
export declare const Grid: React.FunctionComponent<GridProps> & {
    Cell: typeof Cell;
};
export declare function formatAreas(areas?: string[]): string | undefined;
export {};
//# sourceMappingURL=Grid.d.ts.map
