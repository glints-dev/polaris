import { ReactNode } from 'react';
interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    onMount?: () => void;
}
export declare function AfterInitialMount({ children, onMount, fallback }: Props): JSX.Element;
export {};
//# sourceMappingURL=AfterInitialMount.d.ts.map