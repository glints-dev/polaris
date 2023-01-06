'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var Bleed$1 = require('./Bleed.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Bleed = ({
  marginInline = '5',
  marginBlock,
  marginBlockStart,
  marginBlockEnd,
  marginInlineStart,
  marginInlineEnd,
  children
}) => {
  const getNegativeMargins = direction => {
    const xAxis = ['marginInlineStart', 'marginInlineEnd'];
    const yAxis = ['marginBlockStart', 'marginBlockEnd'];
    const directionValues = {
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
      marginInline,
      marginBlock
    };

    if (directionValues[direction]) {
      return directionValues[direction];
    } else if (xAxis.includes(direction) && marginInline) {
      return directionValues.marginInline;
    } else if (yAxis.includes(direction) && marginBlock) {
      return directionValues.marginBlock;
    }
  };

  const negativeMarginBlockStart = getNegativeMargins('marginBlockStart');
  const negativeMarginBlockEnd = getNegativeMargins('marginBlockEnd');
  const negativeMarginInlineStart = getNegativeMargins('marginInlineStart');
  const negativeMarginInlineEnd = getNegativeMargins('marginInlineEnd');
  const style = { ...css.getResponsiveProps('bleed', 'margin-block-start', 'space', negativeMarginBlockStart),
    ...css.getResponsiveProps('bleed', 'margin-block-end', 'space', negativeMarginBlockEnd),
    ...css.getResponsiveProps('bleed', 'margin-inline-start', 'space', negativeMarginInlineStart),
    ...css.getResponsiveProps('bleed', 'margin-inline-end', 'space', negativeMarginInlineEnd)
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: Bleed$1["default"].Bleed,
    style: css.sanitizeCustomProperties(style)
  }, children);
};

exports.Bleed = Bleed;
