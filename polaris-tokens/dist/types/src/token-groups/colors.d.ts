import type { TokenGroup } from '../types';
export declare const colors: {
    background: {
        value: string;
        description: string;
    };
    'background-hovered': {
        value: string;
        description: string;
    };
    'background-pressed': {
        value: string;
        description: string;
    };
    'background-selected': {
        value: string;
        description: string;
    };
    surface: {
        value: string;
        description: string;
    };
    'surface-dark': {
        value: string;
        description: string;
    };
    'surface-neutral': {
        value: string;
        description: string;
    };
    'surface-neutral-hovered': {
        value: string;
        description: string;
    };
    'surface-neutral-pressed': {
        value: string;
        description: string;
    };
    'surface-neutral-disabled': {
        value: string;
        description: string;
    };
    'surface-neutral-subdued': {
        value: string;
        description: string;
    };
    'surface-neutral-subdued-dark': {
        value: string;
        description: string;
    };
    'surface-subdued': {
        value: string;
        description: string;
    };
    'surface-disabled': {
        value: string;
        description: string;
    };
    'surface-hovered': {
        value: string;
        description: string;
    };
    'surface-hovered-dark': {
        value: string;
        description: string;
    };
    'surface-pressed': {
        value: string;
        description: string;
    };
    'surface-pressed-dark': {
        value: string;
        description: string;
    };
    'surface-depressed': {
        value: string;
        description: string;
    };
    'surface-search-field': {
        value: string;
        description: string;
    };
    'surface-search-field-dark': {
        value: string;
        description: string;
    };
    backdrop: {
        value: string;
        description: string;
    };
    overlay: {
        value: string;
        description: string;
    };
    'shadow-color-picker': {
        value: string;
    };
    'shadow-color-picker-dragger': {
        value: string;
    };
    'hint-from-direct-light': {
        value: string;
        description: string;
    };
    border: {
        value: string;
        description: string;
    };
    'border-on-dark': {
        value: string;
        description: string;
    };
    'border-neutral-subdued': {
        value: string;
        description: string;
    };
    'border-hovered': {
        value: string;
        description: string;
    };
    'border-disabled': {
        value: string;
        description: string;
    };
    'border-subdued': {
        value: string;
        description: string;
    };
    'border-depressed': {
        value: string;
        description: string;
    };
    'border-shadow': {
        value: string;
        description: string;
    };
    'border-shadow-subdued': {
        value: string;
        description: string;
    };
    divider: {
        value: string;
        description: string;
    };
    'divider-dark': {
        value: string;
        description: string;
    };
    icon: {
        value: string;
        description: string;
    };
    'icon-on-dark': {
        value: string;
        description: string;
    };
    'icon-hovered': {
        value: string;
        description: string;
    };
    'icon-pressed': {
        value: string;
        description: string;
    };
    'icon-disabled': {
        value: string;
        description: string;
    };
    'icon-subdued': {
        value: string;
        description: string;
    };
    text: {
        value: string;
        description: string;
    };
    'text-on-dark': {
        value: string;
        description: string;
    };
    'text-disabled': {
        value: string;
        description: string;
    };
    'text-subdued': {
        value: string;
        description: string;
    };
    'text-subdued-on-dark': {
        value: string;
        description: string;
    };
    interactive: {
        value: string;
        description: string;
    };
    'interactive-on-dark': {
        value: string;
        description: string;
    };
    'interactive-disabled': {
        value: string;
        description: string;
    };
    'interactive-hovered': {
        value: string;
        description: string;
    };
    'interactive-pressed': {
        value: string;
        description: string;
    };
    'interactive-pressed-on-dark': {
        value: string;
        description: string;
    };
    focused: {
        value: string;
        description: string;
    };
    'surface-selected': {
        value: string;
        description: string;
    };
    'surface-selected-hovered': {
        value: string;
        description: string;
    };
    'surface-selected-pressed': {
        value: string;
        description: string;
    };
    'icon-on-interactive': {
        value: string;
        description: string;
    };
    'text-on-interactive': {
        value: string;
        description: string;
    };
    'action-secondary': {
        value: string;
        description: string;
    };
    'action-secondary-disabled': {
        value: string;
        description: string;
    };
    'action-secondary-hovered': {
        value: string;
        description: string;
    };
    'action-secondary-hovered-dark': {
        value: string;
        description: string;
    };
    'action-secondary-pressed': {
        value: string;
        description: string;
    };
    'action-secondary-pressed-dark': {
        value: string;
        description: string;
    };
    'action-secondary-depressed': {
        value: string;
        description: string;
    };
    'action-primary': {
        value: string;
        description: string;
    };
    'action-primary-disabled': {
        value: string;
        description: string;
    };
    'action-primary-hovered': {
        value: string;
        description: string;
    };
    'action-primary-pressed': {
        value: string;
        description: string;
    };
    'action-primary-depressed': {
        value: string;
        description: string;
    };
    'icon-on-primary': {
        value: string;
        description: string;
    };
    'text-on-primary': {
        value: string;
        description: string;
    };
    'text-primary': {
        value: string;
        description: string;
    };
    'text-primary-hovered': {
        value: string;
        description: string;
    };
    'text-primary-pressed': {
        value: string;
        description: string;
    };
    'surface-primary-selected': {
        value: string;
        description: string;
    };
    'surface-primary-selected-hovered': {
        value: string;
        description: string;
    };
    'surface-primary-selected-pressed': {
        value: string;
        description: string;
    };
    'border-critical': {
        value: string;
        description: string;
    };
    'border-critical-subdued': {
        value: string;
        description: string;
    };
    'border-critical-disabled': {
        value: string;
        description: string;
    };
    'icon-critical': {
        value: string;
        description: string;
    };
    'surface-critical': {
        value: string;
        description: string;
    };
    'surface-critical-subdued': {
        value: string;
        description: string;
    };
    'surface-critical-subdued-hovered': {
        value: string;
        description: string;
    };
    'surface-critical-subdued-pressed': {
        value: string;
        description: string;
    };
    'surface-critical-subdued-depressed': {
        value: string;
        description: string;
    };
    'text-critical': {
        value: string;
        description: string;
    };
    'action-critical': {
        value: string;
        description: string;
    };
    'action-critical-disabled': {
        value: string;
        description: string;
    };
    'action-critical-hovered': {
        value: string;
        description: string;
    };
    'action-critical-pressed': {
        value: string;
        description: string;
    };
    'action-critical-depressed': {
        value: string;
        description: string;
    };
    'icon-on-critical': {
        value: string;
        description: string;
    };
    'text-on-critical': {
        value: string;
        description: string;
    };
    'interactive-critical': {
        value: string;
        description: string;
    };
    'interactive-critical-disabled': {
        value: string;
        description: string;
    };
    'interactive-critical-hovered': {
        value: string;
        description: string;
    };
    'interactive-critical-pressed': {
        value: string;
        description: string;
    };
    'border-warning': {
        value: string;
        description: string;
    };
    'border-warning-subdued': {
        value: string;
        description: string;
    };
    'icon-warning': {
        value: string;
        description: string;
    };
    'surface-warning': {
        value: string;
        description: string;
    };
    'surface-warning-subdued': {
        value: string;
        description: string;
    };
    'surface-warning-subdued-hovered': {
        value: string;
        description: string;
    };
    'surface-warning-subdued-pressed': {
        value: string;
        description: string;
    };
    'text-warning': {
        value: string;
        description: string;
    };
    'border-highlight': {
        value: string;
        description: string;
    };
    'border-highlight-subdued': {
        value: string;
        description: string;
    };
    'icon-highlight': {
        value: string;
        description: string;
    };
    'surface-highlight': {
        value: string;
        description: string;
    };
    'surface-highlight-subdued': {
        value: string;
        description: string;
    };
    'surface-highlight-subdued-hovered': {
        value: string;
        description: string;
    };
    'surface-highlight-subdued-pressed': {
        value: string;
        description: string;
    };
    'text-highlight': {
        value: string;
        description: string;
    };
    'border-success': {
        value: string;
        description: string;
    };
    'border-success-subdued': {
        value: string;
        description: string;
    };
    'icon-success': {
        value: string;
        description: string;
    };
    'surface-success': {
        value: string;
        description: string;
    };
    'surface-success-subdued': {
        value: string;
        description: string;
    };
    'surface-success-subdued-hovered': {
        value: string;
        description: string;
    };
    'surface-success-subdued-pressed': {
        value: string;
        description: string;
    };
    'text-success': {
        value: string;
        description: string;
    };
    'icon-attention': {
        value: string;
    };
    'surface-attention': {
        value: string;
    };
    'decorative-one-icon': {
        value: string;
        description: string;
    };
    'decorative-one-surface': {
        value: string;
        description: string;
    };
    'decorative-one-text': {
        value: string;
        description: string;
    };
    'decorative-two-icon': {
        value: string;
        description: string;
    };
    'decorative-two-surface': {
        value: string;
        description: string;
    };
    'decorative-two-text': {
        value: string;
        description: string;
    };
    'decorative-three-icon': {
        value: string;
        description: string;
    };
    'decorative-three-surface': {
        value: string;
        description: string;
    };
    'decorative-three-text': {
        value: string;
        description: string;
    };
    'decorative-four-icon': {
        value: string;
        description: string;
    };
    'decorative-four-surface': {
        value: string;
        description: string;
    };
    'decorative-four-text': {
        value: string;
        description: string;
    };
    'decorative-five-icon': {
        value: string;
        description: string;
    };
    'decorative-five-surface': {
        value: string;
        description: string;
    };
    'decorative-five-text': {
        value: string;
        description: string;
    };
};
export declare type ColorsTokenGroup = TokenGroup<typeof colors>;
export declare type ColorsTokenName = keyof ColorsTokenGroup;
export declare const colorsBackgroundTokenAlias: readonly ["background", "background-hovered", "background-pressed", "background-selected"];
export declare type ColorsBackgroundTokenAlias = typeof colorsBackgroundTokenAlias[number];
export declare const colorsActionTokenAlias: readonly ["action-critical", "action-critical-depressed", "action-critical-disabled", "action-critical-hovered", "action-critical-pressed", "action-primary", "action-primary-depressed", "action-primary-disabled", "action-primary-hovered", "action-primary-pressed", "action-secondary", "action-secondary-depressed", "action-secondary-disabled", "action-secondary-hovered", "action-secondary-hovered-dark", "action-secondary-pressed", "action-secondary-pressed-dark"];
export declare type ColorsActionTokenAlias = typeof colorsActionTokenAlias[number];
export declare const colorsSurfaceTokenAlias: readonly ["surface", "surface-attention", "surface-critical", "surface-critical-subdued", "surface-critical-subdued-depressed", "surface-critical-subdued-hovered", "surface-critical-subdued-pressed", "surface-dark", "surface-depressed", "surface-disabled", "surface-highlight", "surface-highlight-subdued", "surface-highlight-subdued-hovered", "surface-highlight-subdued-pressed", "surface-hovered", "surface-hovered-dark", "surface-neutral", "surface-neutral-disabled", "surface-neutral-hovered", "surface-neutral-pressed", "surface-neutral-subdued", "surface-neutral-subdued-dark", "surface-pressed", "surface-pressed-dark", "surface-primary-selected", "surface-primary-selected-hovered", "surface-primary-selected-pressed", "surface-search-field", "surface-search-field-dark", "surface-selected", "surface-selected-hovered", "surface-selected-pressed", "surface-subdued", "surface-success", "surface-success-subdued", "surface-success-subdued-hovered", "surface-success-subdued-pressed", "surface-warning", "surface-warning-subdued", "surface-warning-subdued-hovered", "surface-warning-subdued-pressed"];
export declare type ColorsSurfaceTokenAlias = typeof colorsSurfaceTokenAlias[number];
export declare const colorsBackdropTokenAlias: readonly ["backdrop"];
export declare type ColorsBackdropTokenAlias = typeof colorsBackdropTokenAlias[number];
export declare const colorsOverlayTokenAlias: readonly ["overlay"];
export declare type ColorsOverlayTokenAlias = typeof colorsOverlayTokenAlias[number];
export declare const colorsBorderTokenAlias: readonly ["border", "border-on-dark", "border-neutral-subdued", "border-hovered", "border-disabled", "border-subdued", "border-depressed", "border-shadow", "border-shadow-subdued", "border-critical", "border-critical-subdued", "border-critical-disabled", "border-warning", "border-warning-subdued", "border-highlight", "border-highlight-subdued", "border-success", "border-success-subdued"];
export declare type ColorsBorderTokenAlias = typeof colorsBorderTokenAlias[number];
//# sourceMappingURL=colors.d.ts.map