/// <reference types="react" />
import { IconProps } from '../../../Icon';
import { ItemProps } from '../Item';
import { TooltipProps } from '../../../Tooltip';
export interface SectionProps {
    items: ItemProps[];
    icon?: IconProps['source'];
    title?: string;
    fill?: boolean;
    rollup?: {
        after: number;
        view: string;
        hide: string;
        activePath: string;
    };
    action?: {
        icon: IconProps['source'];
        accessibilityLabel: string;
        onClick(): void;
        tooltip?: TooltipProps;
    };
    separator?: boolean;
}
export declare function Section({ title, fill, action, items, rollup, separator, }: SectionProps): JSX.Element;
//# sourceMappingURL=Section.d.ts.map