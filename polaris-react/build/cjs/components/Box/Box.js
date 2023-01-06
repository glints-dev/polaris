'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var Box$1 = require('./Box.scss.js');

const Box = /*#__PURE__*/React.forwardRef(({
  as = 'div',
  background,
  border,
  borderBlockEnd,
  borderInlineStart,
  borderInlineEnd,
  borderBlockStart,
  borderWidth,
  borderBlockStartWidth,
  borderBlockEndWidth,
  borderInlineStartWidth,
  borderInlineEndWidth,
  borderRadius,
  borderRadiusEndStart,
  borderRadiusEndEnd,
  borderRadiusStartStart,
  borderRadiusStartEnd,
  children,
  color,
  id,
  minHeight,
  minWidth,
  maxWidth,
  overflowX,
  overflowY,
  padding,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInlineStart,
  paddingInlineEnd,
  role,
  shadow,
  tabIndex,
  width,
  printHidden,
  visuallyHidden,
  position,
  insetBlockStart,
  insetBlockEnd,
  insetInlineStart,
  insetInlineEnd,
  zIndex,
  opacity,
  ...restProps
}, ref) => {
  const style = {
    '--pc-box-color': color ? `var(--p-${color})` : undefined,
    '--pc-box-background': background ? `var(--p-${background})` : undefined,
    '--pc-box-border': border ? `var(--p-border-${border})` : undefined,
    '--pc-box-border-block-end': borderBlockEnd ? `var(--p-border-${borderBlockEnd})` : undefined,
    '--pc-box-border-inline-start': borderInlineStart ? `var(--p-border-${borderInlineStart})` : undefined,
    '--pc-box-border-inline-end': borderInlineEnd ? `var(--p-border-${borderInlineEnd})` : undefined,
    '--pc-box-border-block-start': borderBlockStart ? `var(--p-border-${borderBlockStart})` : undefined,
    '--pc-box-border-radius': borderRadius ? `var(--p-border-radius-${borderRadius})` : undefined,
    '--pc-box-border-radius-end-start': borderRadiusEndStart ? `var(--p-border-radius-${borderRadiusEndStart})` : undefined,
    '--pc-box-border-radius-end-end': borderRadiusEndEnd ? `var(--p-border-radius-${borderRadiusEndEnd})` : undefined,
    '--pc-box-border-radius-start-start': borderRadiusStartStart ? `var(--p-border-radius-${borderRadiusStartStart})` : undefined,
    '--pc-box-border-radius-start-end': borderRadiusStartEnd ? `var(--p-border-radius-${borderRadiusStartEnd})` : undefined,
    '--pc-box-border-width': borderWidth ? `var(--p-border-width-${borderWidth})` : undefined,
    '--pc-box-border-block-start-width': borderBlockStartWidth ? `var(--p-border-width-${borderBlockStartWidth})` : undefined,
    '--pc-box-border-block-end-width': borderBlockEndWidth ? `var(--p-border-width-${borderBlockEndWidth})` : undefined,
    '--pc-box-border-inline-start-width': borderInlineStartWidth ? `var(--p-border-width-${borderInlineStartWidth})` : undefined,
    '--pc-box-border-inline-end-width': borderInlineEndWidth ? `var(--p-border-width-${borderInlineEndWidth})` : undefined,
    '--pc-box-min-height': minHeight,
    '--pc-box-min-width': minWidth,
    '--pc-box-max-width': maxWidth,
    '--pc-box-overflow-x': overflowX,
    '--pc-box-overflow-y': overflowY,
    ...css.getResponsiveProps('box', 'padding-block-end', 'space', paddingBlockEnd || padding),
    ...css.getResponsiveProps('box', 'padding-block-start', 'space', paddingBlockStart || padding),
    ...css.getResponsiveProps('box', 'padding-inline-start', 'space', paddingInlineStart || padding),
    ...css.getResponsiveProps('box', 'padding-inline-end', 'space', paddingInlineEnd || padding),
    '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
    '--pc-box-width': width,
    position,
    '--pc-box-inset-block-start': insetBlockStart ? `var(--p-space-${insetBlockStart})` : undefined,
    '--pc-box-inset-block-end': insetBlockEnd ? `var(--p-space-${insetBlockEnd})` : undefined,
    '--pc-box-inset-inline-start': insetInlineStart ? `var(--p-space-${insetInlineStart})` : undefined,
    '--pc-box-inset-inline-end': insetInlineEnd ? `var(--p-space-${insetInlineEnd})` : undefined,
    zIndex,
    opacity
  };
  const className = css.classNames(Box$1["default"].Box, visuallyHidden && Box$1["default"].visuallyHidden, printHidden && Box$1["default"].printHidden, as === 'ul' && Box$1["default"].listReset);
  return /*#__PURE__*/React.createElement(as, {
    className,
    id,
    ref,
    style: css.sanitizeCustomProperties(style),
    role,
    tabIndex,
    ...restProps
  }, children);
});
Box.displayName = 'Box';

exports.Box = Box;
