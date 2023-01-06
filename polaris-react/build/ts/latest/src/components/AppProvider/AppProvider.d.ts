import React, { Component } from 'react';
import { I18n } from '../../utilities/i18n';
import { LinkLikeComponent } from '../../utilities/link';
import { FeaturesConfig } from '../../utilities/features';
import './AppProvider.scss';
import './global.scss';
interface State {
    intl: I18n;
    link: LinkLikeComponent | undefined;
}
export interface AppProviderProps {
    /** A locale object or array of locale objects that overrides default translations. If specifying an array then your primary language dictionary should come first, followed by your fallback language dictionaries */
    i18n: ConstructorParameters<typeof I18n>[0];
    /** A custom component to use for all links used by Polaris components */
    linkComponent?: LinkLikeComponent;
    /** For toggling features */
    features?: FeaturesConfig;
    /** Inner content of the application */
    children?: React.ReactNode;
}
export declare class AppProvider extends Component<AppProviderProps, State> {
    private stickyManager;
    private scrollLockManager;
    private uniqueIdFactory;
    constructor(props: AppProviderProps);
    componentDidMount(): void;
    componentDidUpdate({ i18n: prevI18n, linkComponent: prevLinkComponent, }: AppProviderProps): void;
    setBodyStyles: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=AppProvider.d.ts.map