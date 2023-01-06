import React, { useContext } from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import { WithinFilterContext } from '../../utilities/within-filter-context.js';
import styles from './Badge.scss.js';
import { getDefaultAccessibilityLabel } from './utils.js';
import { Pip } from './components/Pip/Pip.js';
import { Icon } from '../Icon/Icon.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Text } from '../Text/Text.js';

const DEFAULT_SIZE = 'medium';
function Badge({
  children,
  status,
  progress,
  icon,
  size = DEFAULT_SIZE,
  statusAndProgressLabelOverride
}) {
  const i18n = useI18n();
  const withinFilter = useContext(WithinFilterContext);
  const className = classNames(styles.Badge, status && styles[variationName('status', status)], icon && styles.icon, // TODO: remove support for the size prop in the next major release
  size && size !== DEFAULT_SIZE && styles[variationName('size', size)], withinFilter && styles.withinFilter);
  const accessibilityLabel = statusAndProgressLabelOverride ? statusAndProgressLabelOverride : getDefaultAccessibilityLabel(i18n, progress, status);
  let accessibilityMarkup = Boolean(accessibilityLabel) && /*#__PURE__*/React.createElement(Text, {
    variant: "bodySm",
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel);

  if (progress && !icon) {
    accessibilityMarkup = /*#__PURE__*/React.createElement("span", {
      className: styles.PipContainer
    }, /*#__PURE__*/React.createElement(Pip, {
      progress: progress,
      status: status,
      accessibilityLabelOverride: accessibilityLabel
    }));
  }

  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, accessibilityMarkup, icon && /*#__PURE__*/React.createElement("span", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: icon
  })), children && /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm"
  }, children));
}
Badge.Pip = Pip;

export { Badge };
