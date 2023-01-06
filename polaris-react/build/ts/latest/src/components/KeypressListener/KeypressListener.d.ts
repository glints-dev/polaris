import type { Key } from '../../types';
export interface NonMutuallyExclusiveProps {
    keyCode: Key;
    handler(event: KeyboardEvent): void;
    keyEvent?: KeyEvent;
}
export declare type KeypressListenerProps = NonMutuallyExclusiveProps & ({
    useCapture?: boolean;
    options?: undefined;
} | {
    useCapture?: undefined;
    options?: AddEventListenerOptions;
});
declare type KeyEvent = 'keydown' | 'keyup';
export declare function KeypressListener({ keyCode, handler, keyEvent, options, useCapture, }: KeypressListenerProps): null;
export {};
//# sourceMappingURL=KeypressListener.d.ts.map