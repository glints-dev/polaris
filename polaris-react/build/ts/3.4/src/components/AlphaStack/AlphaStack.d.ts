import React from 'react';
import { SpacingSpaceScale } from '@shopify/polaris-tokens';
import { ResponsiveProp } from '../../utilities/css';
declare type Align = 'start' | 'end' | 'center';
declare type Element = 'div' | 'ul' | 'ol' | 'fieldset';
declare type Gap = ResponsiveProp<SpacingSpaceScale>;
export interface AlphaStackProps extends React.AriaAttributes {
    children?: React.ReactNode;
    /** HTML Element type
     * @default 'div'
     */
    as?: Element;
    /** Horizontal alignment of children
     * @default 'start'
     */
    align?: Align;
    /** Toggle children to be full width
     * @default false
     */
    fullWidth?: boolean;
    /** The spacing between children
     * @default '4'
     */
    gap?: Gap;
    /** HTML id attribute */
    id?: string;
    /** Toggle order of child items */
    reverseOrder?: boolean;
}
export declare const AlphaStack: ({ as, children, align, fullWidth, gap, id, reverseOrder, ...restProps }: AlphaStackProps) => React.DetailedReactHTMLElement<{
    'aria-activedescendant'?: string | undefined;
    'aria-atomic'?: (boolean | "false" | "true") | undefined;
    'aria-autocomplete'?: "list" | "none" | "inline" | "both" | undefined;
    'aria-busy'?: (boolean | "false" | "true") | undefined;
    'aria-checked'?: boolean | "false" | "true" | "mixed" | undefined;
    'aria-colcount'?: number | undefined;
    'aria-colindex'?: number | undefined;
    'aria-colspan'?: number | undefined;
    'aria-controls'?: string | undefined;
    'aria-current'?: boolean | "time" | "false" | "true" | "step" | "date" | "page" | "location" | undefined;
    'aria-describedby'?: string | undefined;
    'aria-details'?: string | undefined;
    'aria-disabled'?: (boolean | "false" | "true") | undefined;
    'aria-dropeffect'?: "link" | "none" | "copy" | "execute" | "move" | "popup" | undefined;
    'aria-errormessage'?: string | undefined;
    'aria-expanded'?: (boolean | "false" | "true") | undefined;
    'aria-flowto'?: string | undefined;
    'aria-grabbed'?: (boolean | "false" | "true") | undefined;
    'aria-haspopup'?: boolean | "dialog" | "menu" | "false" | "true" | "listbox" | "tree" | "grid" | undefined;
    'aria-hidden'?: (boolean | "false" | "true") | undefined;
    'aria-invalid'?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
    'aria-keyshortcuts'?: string | undefined;
    'aria-label'?: string | undefined;
    'aria-labelledby'?: string | undefined;
    'aria-level'?: number | undefined;
    'aria-live'?: "off" | "assertive" | "polite" | undefined;
    'aria-modal'?: (boolean | "false" | "true") | undefined;
    'aria-multiline'?: (boolean | "false" | "true") | undefined;
    'aria-multiselectable'?: (boolean | "false" | "true") | undefined;
    'aria-orientation'?: "horizontal" | "vertical" | undefined;
    'aria-owns'?: string | undefined;
    'aria-placeholder'?: string | undefined;
    'aria-posinset'?: number | undefined;
    'aria-pressed'?: boolean | "false" | "true" | "mixed" | undefined;
    'aria-readonly'?: (boolean | "false" | "true") | undefined;
    'aria-relevant'?: "text" | "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | undefined;
    'aria-required'?: (boolean | "false" | "true") | undefined;
    'aria-roledescription'?: string | undefined;
    'aria-rowcount'?: number | undefined;
    'aria-rowindex'?: number | undefined;
    'aria-rowspan'?: number | undefined;
    'aria-selected'?: (boolean | "false" | "true") | undefined;
    'aria-setsize'?: number | undefined;
    'aria-sort'?: "ascending" | "descending" | "none" | "other" | undefined;
    'aria-valuemax'?: number | undefined;
    'aria-valuemin'?: number | undefined;
    'aria-valuenow'?: number | undefined;
    'aria-valuetext'?: string | undefined;
    className: string;
    style: React.CSSProperties | undefined;
}, HTMLElement>;
export {};
//# sourceMappingURL=AlphaStack.d.ts.map
