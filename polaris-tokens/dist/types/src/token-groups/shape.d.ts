import type { TokenGroup } from '../types';
export declare const shape: {
    'border-radius-05': {
        value: string;
    };
    'border-radius-1': {
        value: string;
    };
    'border-radius-2': {
        value: string;
    };
    'border-radius-3': {
        value: string;
    };
    'border-radius-4': {
        value: string;
    };
    'border-radius-5': {
        value: string;
    };
    'border-radius-6': {
        value: string;
    };
    'border-radius-base': {
        value: string;
    };
    'border-radius-large': {
        value: string;
    };
    'border-radius-half': {
        value: string;
    };
    'border-width-1': {
        value: string;
    };
    'border-width-2': {
        value: string;
    };
    'border-width-3': {
        value: string;
    };
    'border-width-4': {
        value: string;
    };
    'border-width-5': {
        value: string;
    };
    'border-base': {
        value: string;
    };
    'border-dark': {
        value: string;
    };
    'border-transparent': {
        value: string;
    };
    'border-divider': {
        value: string;
    };
    'border-divider-on-dark': {
        value: string;
    };
};
export declare type ShapeTokenGroup = TokenGroup<typeof shape>;
export declare type ShapeTokenName = keyof ShapeTokenGroup;
export declare const shapeBorderRadiusScale: readonly ["05", "1", "2", "3", "4", "5", "6"];
export declare type ShapeBorderRadiusScale = typeof shapeBorderRadiusScale[number];
export declare const shapeBorderRadiusAlias: readonly ["base", "large", "half"];
export declare type ShapeBorderRadiusAlias = typeof shapeBorderRadiusAlias[number];
export declare const shapeBorderWidthScale: readonly ["1", "2", "3", "4", "5"];
export declare type ShapeBorderWidthScale = typeof shapeBorderWidthScale[number];
//# sourceMappingURL=shape.d.ts.map