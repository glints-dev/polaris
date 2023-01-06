'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Divider$1 = require('./Divider.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Divider = ({
  borderStyle = 'divider'
}) => {
  const style = {
    '--pc-divider-border-style': borderStyle ? `var(--p-border-${borderStyle})` : undefined
  };
  return /*#__PURE__*/React__default["default"].createElement("hr", {
    className: Divider$1["default"].Divider,
    style: style
  });
};

exports.Divider = Divider;
