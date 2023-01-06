import type { TokenGroup } from '../types';
export declare const depth: {
    'shadow-transparent': {
        value: string;
    };
    'shadow-faint': {
        value: string;
    };
    'shadow-base': {
        value: string;
    };
    'shadow-deep': {
        value: string;
    };
    'shadow-button': {
        value: string;
    };
    'shadow-top-bar': {
        value: string;
    };
    'shadow-card': {
        value: string;
    };
    'shadow-popover': {
        value: string;
    };
    'shadow-layer': {
        value: string;
    };
    'shadow-modal': {
        value: string;
    };
    'shadows-inset-button': {
        value: string;
    };
    'shadows-inset-button-pressed': {
        value: string;
    };
};
export declare type DepthTokenGroup = TokenGroup<typeof depth>;
export declare type DepthTokenName = keyof DepthTokenGroup;
export declare const depthShadowAlias: readonly ["base", "transparent", "faint", "deep", "button", "top-bar", "card", "popover", "layer", "modal"];
export declare type DepthShadowAlias = typeof depthShadowAlias[number];
//# sourceMappingURL=depth.d.ts.map