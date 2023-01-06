import type { TokenGroup } from '../types';
export declare const motion: {
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
export declare type MotionTokenGroup = TokenGroup<typeof motion>;
export declare type MotionTokenName = keyof MotionTokenGroup;
export declare const motionDurationScale: readonly ["0", "50", "100", "150", "200", "250", "300", "350", "400", "450", "500", "5000"];
export declare type MotionDurationScale = typeof motionDurationScale[number];
export declare const motionKeyframesAlias: readonly ["bounce", "fade-in", "pulse", "spin"];
export declare type MotionKeyframesAlias = typeof motionKeyframesAlias[number];
//# sourceMappingURL=motion.d.ts.map