import type { TokenGroup } from '../types';
export declare const breakpoints: {
    'breakpoints-xs': {
        value: string;
        description: string;
    };
    'breakpoints-sm': {
        value: string;
        description: string;
    };
    'breakpoints-md': {
        value: string;
        description: string;
    };
    'breakpoints-lg': {
        value: string;
        description: string;
    };
    'breakpoints-xl': {
        value: string;
        description: string;
    };
};
export declare type BreakpointsTokenGroup = TokenGroup<typeof breakpoints>;
export declare type BreakpointsTokenName = keyof BreakpointsTokenGroup;
export declare const breakpointsAlias: readonly ["xs", "sm", "md", "lg", "xl"];
export declare type BreakpointsAlias = typeof breakpointsAlias[number];
//# sourceMappingURL=breakpoints.d.ts.map