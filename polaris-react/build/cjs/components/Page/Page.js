'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var isInterface = require('../../utilities/is-interface.js');
var isReactElement = require('../../utilities/is-react-element.js');
var Page$1 = require('./Page.scss.js');
var Header = require('./components/Header/Header.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Page({
  children,
  fullWidth,
  narrowWidth,
  divider,
  ...rest
}) {
  const pageClassName = css.classNames(Page$1["default"].Page, fullWidth && Page$1["default"].fullWidth, narrowWidth && Page$1["default"].narrowWidth);
  const hasHeaderContent = rest.title != null && rest.title !== '' || rest.subtitle != null && rest.subtitle !== '' || rest.primaryAction != null || rest.secondaryActions != null && (isInterface.isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0 || isReactElement.isReactElement(rest.secondaryActions)) || rest.actionGroups != null && rest.actionGroups.length > 0 || rest.breadcrumbs != null && rest.breadcrumbs.length > 0;
  const contentClassName = css.classNames(!hasHeaderContent && Page$1["default"].Content, divider && hasHeaderContent && Page$1["default"].divider);
  const headerMarkup = hasHeaderContent ? /*#__PURE__*/React__default["default"].createElement(Header.Header, rest) : null;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: pageClassName
  }, headerMarkup, /*#__PURE__*/React__default["default"].createElement("div", {
    className: contentClassName
  }, children));
}

exports.Page = Page;
