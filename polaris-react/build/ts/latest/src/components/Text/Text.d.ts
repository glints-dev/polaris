import { ReactNode } from 'react';
declare type Element = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'legend';
declare type Variant = 'headingXs' | 'headingSm' | 'headingMd' | 'headingLg' | 'headingXl' | 'heading2xl' | 'heading3xl' | 'heading4xl' | 'bodySm' | 'bodyMd' | 'bodyLg';
declare type Alignment = 'start' | 'center' | 'end' | 'justify';
declare type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';
declare type Color = 'success' | 'critical' | 'warning' | 'subdued' | 'text-inverse';
export interface TextProps {
    /** Adjust horizontal alignment of text */
    alignment?: Alignment;
    /** The element type */
    as: Element;
    /** Prevent text from overflowing */
    breakWord?: boolean;
    /** Text to display */
    children: ReactNode;
    /** Adjust color of text */
    color?: Color;
    /** Adjust weight of text */
    fontWeight?: FontWeight;
    /** HTML id attribute */
    id?: string;
    /** Truncate text overflow with ellipsis */
    truncate?: boolean;
    /** Typographic style of text */
    variant: Variant;
    /** Visually hide the text */
    visuallyHidden?: boolean;
}
export declare const Text: ({ alignment, as, breakWord, children, color, fontWeight, id, truncate, variant, visuallyHidden, }: TextProps) => JSX.Element;
export {};
//# sourceMappingURL=Text.d.ts.map