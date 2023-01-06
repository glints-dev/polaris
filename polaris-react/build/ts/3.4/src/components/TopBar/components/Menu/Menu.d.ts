import React from 'react';
import { ActionListProps } from '../../../ActionList';
import { MessageProps } from './components';
export interface MenuProps {
    /** Accepts an activator component that renders inside of a button that opens the menu */
    activatorContent: React.ReactNode;
    /** An array of action objects that are rendered inside of a popover triggered by this menu */
    actions: ActionListProps['sections'];
    /** Accepts a message that facilitates direct, urgent communication with the merchant through the menu */
    message?: MessageProps;
    /** A boolean property indicating whether the menu is currently open */
    open: boolean;
    /** A callback function to handle opening the menu popover */
    onOpen(): void;
    /** A callback function to handle closing the menu popover */
    onClose(): void;
    /** A callback function to handle closing the menu popover */
    onClose(): void;
    /** A string that provides the accessibility labeling */
    accessibilityLabel?: string;
}
export declare function Menu(props: MenuProps): JSX.Element;
//# sourceMappingURL=Menu.d.ts.map
