'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var useComponentDidMount = require('../../../../utilities/use-component-did-mount.js');
var BulkActions = require('../../BulkActions.scss.js');
var Indicator = require('../../../Indicator/Indicator.js');
var Button = require('../../../Button/Button.js');
var Icon = require('../../../Icon/Icon.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function BulkActionButton({
  handleMeasurement,
  url,
  external,
  onAction,
  content,
  disclosure,
  accessibilityLabel,
  disabled,
  indicator,
  showContentInButton
}) {
  const bulkActionButton = React.useRef(null);
  useComponentDidMount.useComponentDidMount(() => {
    if (handleMeasurement && bulkActionButton.current) {
      const width = bulkActionButton.current.getBoundingClientRect().width;
      handleMeasurement(width);
    }
  });
  const buttonContent = disclosure && !showContentInButton ? undefined : content;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: BulkActions["default"].BulkActionButton,
    ref: bulkActionButton
  }, /*#__PURE__*/React__default["default"].createElement(Button.Button, {
    external: external,
    url: url,
    accessibilityLabel: disclosure && !showContentInButton ? content : accessibilityLabel,
    disclosure: disclosure && showContentInButton,
    onClick: onAction,
    disabled: disabled,
    size: "slim",
    icon: disclosure && !showContentInButton ? /*#__PURE__*/React__default["default"].createElement(Icon.Icon, {
      source: polarisIcons.HorizontalDotsMinor,
      color: "base"
    }) : undefined
  }, buttonContent), indicator && /*#__PURE__*/React__default["default"].createElement(Indicator.Indicator, null));
}

exports.BulkActionButton = BulkActionButton;
