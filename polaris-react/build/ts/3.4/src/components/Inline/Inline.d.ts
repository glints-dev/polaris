import React from 'react';
import { SpacingSpaceScale } from '@shopify/polaris-tokens';
import { ResponsiveProp } from '../../utilities/css';
declare type Align = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
declare type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
declare type Gap = ResponsiveProp<SpacingSpaceScale>;
export interface InlineProps {
    children?: React.ReactNode;
    /** Horizontal alignment of children
     * @default 'start'
     */
    align?: Align;
    /** Vertical alignment of children
     * @default 'center'
     */
    blockAlign?: BlockAlign;
    /** The spacing between elements. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @default '4'
     * @example
     * gap='2'
     * gap={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    gap?: Gap;
    /** Wrap stack elements to additional rows as needed on small screens
     * @default true
     */
    wrap?: boolean;
}
export declare const Inline: ({ align, blockAlign, gap, wrap, children, }: InlineProps) => JSX.Element;
export {};
//# sourceMappingURL=Inline.d.ts.map
