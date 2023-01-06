import React from 'react';
import type { BreakpointsAlias, SpacingSpaceScale } from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '../../utilities/css';
declare type Columns = {
    [Breakpoint in BreakpointsAlias]?: number | string;
};
declare type Gap = ResponsiveProp<SpacingSpaceScale>;
export interface ColumnsProps {
    children?: React.ReactNode;
    /** The number of columns to display
     * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
     */
    columns?: Columns;
    /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @default '4'
     * @example
     * gap='2'
     * gap={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}
     */
    gap?: Gap;
}
export declare function Columns({ children, columns, gap }: ColumnsProps): JSX.Element;
export {};
//# sourceMappingURL=Columns.d.ts.map