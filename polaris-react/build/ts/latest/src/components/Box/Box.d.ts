import React from 'react';
import type { ColorsActionTokenAlias, ColorsBackdropTokenAlias, ColorsBackgroundTokenAlias, ColorsOverlayTokenAlias, ColorsSurfaceTokenAlias, ShapeBorderWidthScale, DepthShadowAlias, SpacingSpaceScale } from '@shopify/polaris-tokens';
import { ResponsiveProp } from '../../utilities/css';
declare type Element = 'div' | 'span' | 'section' | 'ul' | 'li';
declare type Overflow = 'hidden' | 'scroll';
declare type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';
export declare type ColorTokenScale = 'text' | 'text-critical' | 'text-disabled' | 'text-highlight' | 'text-on-critical' | 'text-on-dark' | 'text-on-interactive' | 'text-on-primary' | 'text-primary' | 'text-primary-hovered' | 'text-primary-pressed' | 'text-subdued' | 'text-subdued-on-dark' | 'text-success' | 'text-warning';
export declare type BorderTokenAlias = 'base' | 'dark' | 'divider' | 'divider-on-dark' | 'transparent';
declare type Spacing = ResponsiveProp<SpacingSpaceScale>;
export declare type BorderRadiusTokenScale = '05' | '1' | '2' | '3' | '4' | '5' | '6' | 'base' | 'large' | 'half';
export declare type BackgroundColors = ColorsBackdropTokenAlias | ColorsBackgroundTokenAlias | ColorsOverlayTokenAlias | ColorsActionTokenAlias | ColorsSurfaceTokenAlias;
export interface BoxProps extends React.AriaAttributes {
    children?: React.ReactNode;
    /** HTML Element type
     * @default 'div'
     */
    as?: Element;
    /** Background color */
    background?: BackgroundColors;
    /** Border style */
    border?: BorderTokenAlias;
    /** Vertical end border style */
    borderBlockEnd?: BorderTokenAlias;
    /** Horizontal start border style */
    borderInlineStart?: BorderTokenAlias;
    /** Horizontal end border style */
    borderInlineEnd?: BorderTokenAlias;
    /** Vertical start border style */
    borderBlockStart?: BorderTokenAlias;
    /** Border radius */
    borderRadius?: BorderRadiusTokenScale;
    /** Vertical end horizontal start border radius */
    borderRadiusEndStart?: BorderRadiusTokenScale;
    /** Vertical end horizontal end border radius */
    borderRadiusEndEnd?: BorderRadiusTokenScale;
    /** Vertical start horizontal start border radius */
    borderRadiusStartStart?: BorderRadiusTokenScale;
    /** Vertical start horizontal end border radius */
    borderRadiusStartEnd?: BorderRadiusTokenScale;
    /** Border width */
    borderWidth?: ShapeBorderWidthScale;
    /** Vertical start border width */
    borderBlockStartWidth?: ShapeBorderWidthScale;
    /** Vertical end border width */
    borderBlockEndWidth?: ShapeBorderWidthScale;
    /** Horizontal start border width */
    borderInlineStartWidth?: ShapeBorderWidthScale;
    /** Horizontal end border width */
    borderInlineEndWidth?: ShapeBorderWidthScale;
    /** Color of children */
    color?: ColorTokenScale;
    /** HTML id attribute */
    id?: string;
    /** Minimum height of container */
    minHeight?: string;
    /** Minimum width of container */
    minWidth?: string;
    /** Maximum width of container */
    maxWidth?: string;
    /** Clip horizontal content of children */
    overflowX?: Overflow;
    /** Clip vertical content of children */
    overflowY?: Overflow;
    /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * padding='4'
     * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    padding?: Spacing;
    /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingBlockStart='4'
     * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    paddingBlockStart?: Spacing;
    /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingBlockEnd='4'
     * paddingBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    paddingBlockEnd?: Spacing;
    /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingInlineStart='4'
     * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    paddingInlineStart?: Spacing;
    /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingInlineEnd='4'
     * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    paddingInlineEnd?: Spacing;
    /** Aria role */
    role?: Extract<React.AriaRole, 'status' | 'presentation' | 'menu' | 'listbox' | 'combobox'>;
    /** Shadow on box */
    shadow?: DepthShadowAlias;
    /** Set tab order */
    tabIndex?: Extract<React.AllHTMLAttributes<HTMLElement>['tabIndex'], number>;
    /** Width of container */
    width?: string;
    /** Position of box */
    position?: Position;
    /** Top position of box */
    insetBlockStart?: Spacing;
    /** Bottom position of box */
    insetBlockEnd?: Spacing;
    /** Left position of box */
    insetInlineStart?: Spacing;
    /** Right position of box */
    insetInlineEnd?: Spacing;
    /** Opacity of box */
    opacity?: string;
    /** Visually hide the contents during print */
    printHidden?: boolean;
    /** Visually hide the contents (still announced by screenreader) */
    visuallyHidden?: boolean;
    /** z-index of box */
    zIndex?: string;
}
export declare const Box: React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=Box.d.ts.map