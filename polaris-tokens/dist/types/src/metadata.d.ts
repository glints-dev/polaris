import type { Exact, MetadataBase } from './types';
export declare const metadata: {
    breakpoints: {
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
    colors: {
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
    depth: {
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
    font: {
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
    legacy: {
        'override-loading-z-index': {
            value: string;
        };
        'choice-size': {
            value: string;
        };
        'icon-size-small': {
            value: string;
        };
        'icon-size-medium': {
            value: string;
        };
        'choice-margin': {
            value: string;
        };
        'control-border-width': {
            value: string;
        };
        'banner-border-default': {
            value: string;
        };
        'banner-border-success': {
            value: string;
        };
        'banner-border-highlight': {
            value: string;
        };
        'banner-border-warning': {
            value: string;
        };
        'banner-border-critical': {
            value: string;
        };
        'thin-border-subdued': {
            value: string;
        };
        'text-field-spinner-offset': {
            value: string;
        };
        'text-field-focus-ring-offset': {
            value: string;
        };
        'button-group-item-spacing': {
            value: string;
        };
        'range-slider-thumb-size-base': {
            value: string;
        };
        'range-slider-thumb-size-active': {
            value: string;
        };
        'frame-offset': {
            value: string;
        };
    };
    motion: {
        'duration-0': {
            value: string;
        };
        'duration-50': {
            value: string;
        };
        'duration-100': {
            value: string;
        };
        'duration-150': {
            value: string;
        };
        'duration-200': {
            value: string;
        };
        'duration-250': {
            value: string;
        };
        'duration-300': {
            value: string;
        };
        'duration-350': {
            value: string;
        };
        'duration-400': {
            value: string;
        };
        'duration-450': {
            value: string;
        };
        'duration-500': {
            value: string;
        };
        'duration-5000': {
            value: string;
        };
        ease: {
            value: string;
        };
        'ease-in': {
            value: string;
        };
        'ease-out': {
            value: string;
        };
        'ease-in-out': {
            value: string;
        };
        linear: {
            value: string;
        };
        'keyframes-bounce': {
            value: string;
        };
        'keyframes-fade-in': {
            value: string;
        };
        'keyframes-pulse': {
            value: string;
        };
        'keyframes-spin': {
            value: string;
        };
    };
    shape: {
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
    spacing: {
        'space-0': {
            value: string;
        };
        'space-025': {
            value: string;
        };
        'space-05': {
            value: string;
        };
        'space-1': {
            value: string;
        };
        'space-2': {
            value: string;
        };
        'space-3': {
            value: string;
        };
        'space-4': {
            value: string;
        };
        'space-5': {
            value: string;
        };
        'space-6': {
            value: string;
        };
        'space-8': {
            value: string;
        };
        'space-10': {
            value: string;
        };
        'space-12': {
            value: string;
        };
        'space-16': {
            value: string;
        };
        'space-20': {
            value: string;
        };
        'space-24': {
            value: string;
        };
        'space-28': {
            value: string;
        };
        'space-32': {
            value: string;
        };
    };
    zIndex: {
        'z-1': {
            value: string;
        };
        'z-2': {
            value: string;
        };
        'z-3': {
            value: string;
        };
        'z-4': {
            value: string;
        };
        'z-5': {
            value: string;
        };
        'z-6': {
            value: string;
        };
        'z-7': {
            value: string;
        };
        'z-8': {
            value: string;
        };
        'z-9': {
            value: string;
        };
        'z-10': {
            value: string;
        };
        'z-11': {
            value: string;
        };
        'z-12': {
            value: string;
        };
    };
};
export declare type Metadata = typeof metadata;
/**
 * Identity function that simply returns the provided tokens with metadata, but additionally
 * validates the input matches the `Metadata` type exactly and infers all members.
 */
export declare function createMetadata<T extends Exact<MetadataBase, T>>(metadata: T): T;
//# sourceMappingURL=metadata.d.ts.map