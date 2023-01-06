'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var AlphaStack$1 = require('./AlphaStack.scss.js');

const AlphaStack = ({
  as = 'div',
  children,
  align = 'start',
  fullWidth = false,
  gap = '4',
  id,
  reverseOrder = false,
  ...restProps
}) => {
  const className = css.classNames(AlphaStack$1["default"].AlphaStack, fullWidth && AlphaStack$1["default"].fullWidth, as === 'ul' && AlphaStack$1["default"].listReset);
  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    '--pc-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...css.getResponsiveProps('stack', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React.createElement(as, {
    className,
    style: css.sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

exports.AlphaStack = AlphaStack;
