import React from 'react';
export interface ScrollableProps extends React.HTMLProps<HTMLDivElement> {
    /** Content to display in scrollable area */
    children?: React.ReactNode;
    /** Scroll content vertically
     * @default true
     * */
    vertical?: boolean;
    /** Scroll content horizontally
     * @default true
     * */
    horizontal?: boolean;
    /** Add a shadow when content is scrollable */
    shadow?: boolean;
    /** Slightly hints content upon mounting when scrollable */
    hint?: boolean;
    /** Adds a tabIndex to scrollable when children are not focusable */
    focusable?: boolean;
    /** Called when scrolled to the bottom of the scroll area */
    onScrolledToBottom?(): void;
}
export declare function Scrollable({ children, className, horizontal, vertical, shadow, hint, focusable, onScrolledToBottom, ...rest }: ScrollableProps): JSX.Element;
export declare namespace Scrollable {
    var ScrollTo: typeof import("./components").ScrollTo;
    var forNode: (node: HTMLElement) => HTMLElement | Document;
}
//# sourceMappingURL=Scrollable.d.ts.map