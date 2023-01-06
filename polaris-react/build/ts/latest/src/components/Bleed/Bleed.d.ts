import React from 'react';
import type { SpacingSpaceScale } from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '../../utilities/css';
declare type Spacing = ResponsiveProp<SpacingSpaceScale>;
export interface BleedProps {
    children?: React.ReactNode;
    /** Negative horizontal space around children
     * @default '5'
     */
    marginInline?: Spacing;
    /** Negative vertical space around children */
    marginBlock?: Spacing;
    /** Negative top space around children */
    marginBlockStart?: Spacing;
    /** Negative bottom space around children */
    marginBlockEnd?: Spacing;
    /** Negative left space around children */
    marginInlineStart?: Spacing;
    /** Negative right space around children */
    marginInlineEnd?: Spacing;
}
export declare const Bleed: ({ marginInline, marginBlock, marginBlockStart, marginBlockEnd, marginInlineStart, marginInlineEnd, children, }: BleedProps) => JSX.Element;
export {};
//# sourceMappingURL=Bleed.d.ts.map