import type { TokenGroup } from '../types';
export declare const font: {
    'font-family-sans': {
        value: string;
    };
    'font-family-mono': {
        value: string;
    };
    'font-size-75': {
        value: string;
    };
    'font-size-100': {
        value: string;
    };
    'font-size-200': {
        value: string;
    };
    'font-size-300': {
        value: string;
    };
    'font-size-400': {
        value: string;
    };
    'font-size-500': {
        value: string;
    };
    'font-size-600': {
        value: string;
    };
    'font-size-700': {
        value: string;
    };
    'font-weight-regular': {
        value: string;
    };
    'font-weight-medium': {
        value: string;
    };
    'font-weight-semibold': {
        value: string;
    };
    'font-weight-bold': {
        value: string;
    };
    'font-line-height-1': {
        value: string;
    };
    'font-line-height-2': {
        value: string;
    };
    'font-line-height-3': {
        value: string;
    };
    'font-line-height-4': {
        value: string;
    };
    'font-line-height-5': {
        value: string;
    };
    'font-line-height-6': {
        value: string;
    };
    'font-line-height-7': {
        value: string;
    };
};
export declare type FontTokenGroup = TokenGroup<typeof font>;
export declare type FontTokenName = keyof FontTokenGroup;
export declare const fontSizeScale: readonly ["75", "100", "200", "300", "400", "500", "600", "700"];
export declare type FontSizeScale = typeof fontSizeScale[number];
export declare const fontLineHeightScale: readonly ["1", "2", "3", "4", "5", "6", "7"];
export declare type FontLineHeightScale = typeof fontLineHeightScale[number];
export declare const fontWeightAlias: readonly ["regular", "medium", "semibold", "bold"];
export declare type FontWeightAlias = typeof fontWeightAlias[number];
//# sourceMappingURL=font.d.ts.map