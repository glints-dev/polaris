'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var withinFilterContext = require('../../utilities/within-filter-context.js');
var Badge$1 = require('./Badge.scss.js');
var utils = require('./utils.js');
var Pip = require('./components/Pip/Pip.js');
var Icon = require('../Icon/Icon.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_SIZE = 'medium';
function Badge({
  children,
  status,
  progress,
  icon,
  size = DEFAULT_SIZE,
  statusAndProgressLabelOverride
}) {
  const i18n = hooks.useI18n();
  const withinFilter = React.useContext(withinFilterContext.WithinFilterContext);
  const className = css.classNames(Badge$1["default"].Badge, status && Badge$1["default"][css.variationName('status', status)], icon && Badge$1["default"].icon, // TODO: remove support for the size prop in the next major release
  size && size !== DEFAULT_SIZE && Badge$1["default"][css.variationName('size', size)], withinFilter && Badge$1["default"].withinFilter);
  const accessibilityLabel = statusAndProgressLabelOverride ? statusAndProgressLabelOverride : utils.getDefaultAccessibilityLabel(i18n, progress, status);
  let accessibilityMarkup = Boolean(accessibilityLabel) && /*#__PURE__*/React__default["default"].createElement(Text.Text, {
    variant: "bodySm",
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel);

  if (progress && !icon) {
    accessibilityMarkup = /*#__PURE__*/React__default["default"].createElement("span", {
      className: Badge$1["default"].PipContainer
    }, /*#__PURE__*/React__default["default"].createElement(Pip.Pip, {
      progress: progress,
      status: status,
      accessibilityLabelOverride: accessibilityLabel
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: className
  }, accessibilityMarkup, icon && /*#__PURE__*/React__default["default"].createElement("span", {
    className: Badge$1["default"].Icon
  }, /*#__PURE__*/React__default["default"].createElement(Icon.Icon, {
    source: icon
  })), children && /*#__PURE__*/React__default["default"].createElement(Text.Text, {
    as: "span",
    variant: "bodySm"
  }, children));
}
Badge.Pip = Pip.Pip;

exports.Badge = Badge;
