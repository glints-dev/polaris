'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Header$1 = require('./Header.scss.js');
var CloseButton = require('../CloseButton/CloseButton.js');
var Text = require('../../../Text/Text.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Header({
  id,
  titleHidden,
  closing,
  children,
  onClose
}) {
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: titleHidden || !children ? Header$1["default"].titleHidden : Header$1["default"].Header
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    id: id,
    className: Header$1["default"].Title
  }, /*#__PURE__*/React__default["default"].createElement(Text.Text, {
    as: "h2",
    variant: "headingLg"
  }, children)), /*#__PURE__*/React__default["default"].createElement(CloseButton.CloseButton, {
    pressed: closing,
    titleHidden: titleHidden,
    onClick: onClose
  }));
}

exports.Header = Header;
