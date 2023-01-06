'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var breakpoints = require('../../utilities/breakpoints.js');
var Box = require('../Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const AlphaCard = ({
  children,
  background = 'surface',
  padding = {
    xs: '4',
    sm: '5'
  },
  roundedAbove
}) => {
  const breakpoints$1 = breakpoints.useBreakpoints();
  const defaultBorderRadius = '2';
  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints$1[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }

  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    background: background,
    padding: padding,
    shadow: "card",
    borderRadius: hasBorderRadius ? defaultBorderRadius : undefined
  }, children);
};

exports.AlphaCard = AlphaCard;
