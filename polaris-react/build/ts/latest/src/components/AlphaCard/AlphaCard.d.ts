import type { BreakpointsAlias, ColorsTokenName, SpacingSpaceScale } from '@shopify/polaris-tokens';
import React from 'react';
import type { ResponsiveProp } from '../../utilities/css';
declare type CardBackgroundColorTokenScale = Extract<ColorsTokenName, 'surface' | 'surface-subdued'>;
declare type Spacing = ResponsiveProp<SpacingSpaceScale>;
export interface AlphaCardProps {
    children?: React.ReactNode;
    /** Background color
     * @default 'surface'
     */
    background?: CardBackgroundColorTokenScale;
    /** The spacing around the card
     * @default {xs: '4', sm: '5'}
     * @example
     * padding='4'
     * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    padding?: Spacing;
    /** Border radius value above a set breakpoint */
    roundedAbove?: BreakpointsAlias;
}
export declare const AlphaCard: ({ children, background, padding, roundedAbove, }: AlphaCardProps) => JSX.Element;
export {};
//# sourceMappingURL=AlphaCard.d.ts.map