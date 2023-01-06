/// <reference types="react" />
import type { BreakpointsAlias } from '@shopify/polaris-tokens';
declare type Falsy = boolean | undefined | null | 0;
export declare type ResponsiveProp<T> = T | {
    [Breakpoint in BreakpointsAlias]?: T;
};
export declare function classNames(...classes: (string | Falsy)[]): string;
export declare function variationName(name: string, value: string): string;
export declare function sanitizeCustomProperties(styles: React.CSSProperties): React.CSSProperties | undefined;
export declare function getResponsiveProps(componentName: string, componentProp: string, tokenSubgroup: string, responsiveProp?: string | {
    [Breakpoint in BreakpointsAlias]?: string;
}): {
    [x: string]: string;
};
export {};
//# sourceMappingURL=css.d.ts.map