/// <reference types="react" />
import { ColumnVisibilityData } from '../../types';
export interface NavigationProps {
    columnVisibilityData: ColumnVisibilityData[];
    isScrolledFarthestLeft?: boolean;
    isScrolledFarthestRight?: boolean;
    fixedFirstColumns: number;
    navigateTableLeft?(): void;
    navigateTableRight?(): void;
    setRef?: (ref: HTMLDivElement | null) => void;
}
export declare function Navigation({ columnVisibilityData, isScrolledFarthestLeft, isScrolledFarthestRight, navigateTableLeft, navigateTableRight, fixedFirstColumns, setRef, }: NavigationProps): JSX.Element;
//# sourceMappingURL=Navigation.d.ts.map
