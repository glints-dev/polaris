'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var Inline$1 = require('./Inline.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Inline = function Inline({
  align = 'start',
  blockAlign = 'center',
  gap = '4',
  wrap = true,
  children
}) {
  const style = {
    '--pc-inline-align': align,
    '--pc-inline-block-align': blockAlign,
    '--pc-inline-wrap': wrap ? 'wrap' : 'nowrap',
    ...css.getResponsiveProps('inline', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: Inline$1["default"].Inline,
    style: style
  }, children);
};

exports.Inline = Inline;
