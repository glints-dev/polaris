import React from 'react';
import { ComplexAction, DisableableAction, LoadableAction } from '../../types';
export interface PageActionsProps {
    /** The primary action for the page */
    primaryAction?: (DisableableAction & LoadableAction) | React.ReactNode;
    /** The secondary actions for the page */
    secondaryActions?: ComplexAction[] | React.ReactNode;
}
export declare function PageActions({ primaryAction, secondaryActions, }: PageActionsProps): JSX.Element;
//# sourceMappingURL=PageActions.d.ts.map
