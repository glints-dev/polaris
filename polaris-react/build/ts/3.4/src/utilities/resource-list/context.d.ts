/// <reference types="react" />
import { ResourceListSelectedItems } from './types';
export interface ResourceListContextType {
    selectMode?: boolean;
    selectable?: boolean;
    selectedItems?: ResourceListSelectedItems;
    resourceName?: {
        singular: string;
        plural: string;
    };
    loading?: boolean;
    onSelectionChange?(selected: boolean, id: string, sortNumber: number | undefined, shiftKey: boolean): void;
}
export declare const ResourceListContext: import("react").Context<ResourceListContextType>;
//# sourceMappingURL=context.d.ts.map
