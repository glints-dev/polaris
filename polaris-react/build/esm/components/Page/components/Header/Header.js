import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import { ConditionalRender, ConditionalWrapper } from '../../../../utilities/components.js';
import { isInterface } from '../../../../utilities/is-interface.js';
import { isReactElement } from '../../../../utilities/is-react-element.js';
import styles from './Header.scss.js';
import { Breadcrumbs } from '../../../Breadcrumbs/Breadcrumbs.js';
import { Pagination } from '../../../Pagination/Pagination.js';
import { Title } from './components/Title/Title.js';
import { hasGroupsWithActions, ActionMenu } from '../../../ActionMenu/ActionMenu.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { useMediaQuery } from '../../../../utilities/media-query/hooks.js';
import { Text } from '../../../Text/Text.js';
import { buttonFrom } from '../../../Button/utils.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';

const SHORT_TITLE = 20;
const REALLY_SHORT_TITLE = 8;
const LONG_TITLE = 34;
function Header({
  title,
  subtitle,
  titleMetadata,
  additionalMetadata,
  titleHidden = false,
  primaryAction,
  pagination,
  additionalNavigation,
  breadcrumbs = [],
  secondaryActions = [],
  actionGroups = [],
  compactTitle = false,
  onActionRollup
}) {
  const i18n = useI18n();
  const {
    isNavigationCollapsed
  } = useMediaQuery();

  if (additionalNavigation && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Deprecation: The `additionalNavigation` on Page is deprecated and will be removed in the next major version.');
  }

  const isSingleRow = !primaryAction && !pagination && (isInterface(secondaryActions) && !secondaryActions.length || isReactElement(secondaryActions)) && !actionGroups.length;
  const breadcrumbMarkup = breadcrumbs.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.BreadcrumbWrapper
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    breadcrumbs: breadcrumbs
  })) : null;
  const paginationMarkup = pagination && !isNavigationCollapsed ? /*#__PURE__*/React.createElement("div", {
    className: styles.PaginationWrapper
  }, /*#__PURE__*/React.createElement(Pagination, pagination)) : null;
  const additionalNavigationMarkup = additionalNavigation ? /*#__PURE__*/React.createElement("div", {
    className: styles.AdditionalNavigationWrapper
  }, additionalNavigation) : null;
  const navigationMarkup = breadcrumbMarkup || paginationMarkup || additionalNavigationMarkup ? /*#__PURE__*/React.createElement("div", {
    className: styles.Navigation
  }, breadcrumbMarkup, additionalNavigationMarkup, paginationMarkup) : null;
  const pageTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.TitleWrapper
  }, /*#__PURE__*/React.createElement(Title, {
    title: title,
    subtitle: subtitle,
    titleMetadata: titleMetadata,
    compactTitle: compactTitle
  }));
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement(PrimaryActionMarkup, {
    primaryAction: primaryAction
  }) : null;
  let actionMenuMarkup = null;

  if (isInterface(secondaryActions) && (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups))) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(ActionMenu, {
      actions: secondaryActions,
      groups: actionGroups,
      rollup: isNavigationCollapsed,
      rollupActionsLabel: title ? i18n.translate('Polaris.Page.Header.rollupActionsLabel', {
        title
      }) : undefined,
      onActionRollup: onActionRollup
    });
  } else if (isReactElement(secondaryActions)) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActions);
  }

  const additionalMetadataMarkup = additionalMetadata ? /*#__PURE__*/React.createElement("div", {
    className: styles.AdditionalMetaData
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "bodyMd",
    color: "subdued",
    as: "span"
  }, additionalMetadata)) : null;
  const headerClassNames = classNames(styles.Header, isSingleRow && styles.isSingleRow, titleHidden && styles.titleHidden, navigationMarkup && styles.hasNavigation, actionMenuMarkup && styles.hasActionMenu, isNavigationCollapsed && styles.mobileView, !breadcrumbs.length && styles.noBreadcrumbs, title && title.length < LONG_TITLE && styles.mediumTitle, title && title.length > LONG_TITLE && styles.longTitle);
  const {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6
  } = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    additionalNavigationMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title
  });
  return /*#__PURE__*/React.createElement("div", {
    className: headerClassNames
  }, /*#__PURE__*/React.createElement(ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Row
  }, slot1, slot2, /*#__PURE__*/React.createElement(ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.RightAlign
  }, /*#__PURE__*/React.createElement(ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: children => /*#__PURE__*/React.createElement("div", {
      className: styles.Actions
    }, children)
  }, slot3, slot4))))), /*#__PURE__*/React.createElement(ConditionalRender, {
    condition: [slot5, slot6].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.LeftAlign
  }, slot5), /*#__PURE__*/React.createElement(ConditionalRender, {
    condition: slot6 != null
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.RightAlign
  }, slot6)))));
}

function PrimaryActionMarkup({
  primaryAction
}) {
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  let actionMarkup;

  if (isInterface(primaryAction)) {
    const {
      primary: isPrimary,
      helpText
    } = primaryAction;
    const primary = isPrimary === undefined ? true : isPrimary;
    const content = buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      primary
    });
    actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip, {
      content: helpText
    }, content) : content;
  } else {
    actionMarkup = primaryAction;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.PrimaryActionWrapper
  }, actionMarkup);
}

function shouldShowIconOnly(isMobile, action) {
  let {
    content,
    accessibilityLabel,
    icon
  } = action;
  if (icon == null) return { ...action,
    icon: undefined
  };

  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = undefined;
  } else {
    icon = undefined;
  }

  return { ...action,
    content,
    accessibilityLabel,
    icon
  };
}

function notNull(value) {
  return value != null;
}

function determineLayout({
  actionMenuMarkup,
  additionalMetadataMarkup,
  additionalNavigationMarkup,
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title
}) {
  //    Header Layout
  // |----------------------------------------------------|
  // | slot1 | slot2 |                    | slot3 | slot4 |
  // |----------------------------------------------------|
  // | slot5 |                                    | slot6 |
  // |----------------------------------------------------|
  //
  const layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: isNavigationCollapsed && breadcrumbMarkup == null && title != null && title.length <= REALLY_SHORT_TITLE
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: isNavigationCollapsed
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: !isNavigationCollapsed && paginationMarkup == null && actionMenuMarkup == null && title != null && title.length <= SHORT_TITLE
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: /*#__PURE__*/React.createElement(React.Fragment, null, actionMenuMarkup, primaryActionMarkup),
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: !isNavigationCollapsed
    }
  };
  const layout = Object.values(layouts).find(layout => layout.condition) || layouts.desktopDefault;
  return layout.slots;
}

export { Header };
