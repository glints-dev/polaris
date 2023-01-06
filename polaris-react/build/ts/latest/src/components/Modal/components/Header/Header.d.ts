import React from 'react';
export interface HeaderProps {
    id: string;
    titleHidden: boolean;
    closing: boolean;
    children?: React.ReactNode;
    onClose(): void;
}
export declare function Header({ id, titleHidden, closing, children, onClose, }: HeaderProps): JSX.Element;
//# sourceMappingURL=Header.d.ts.map