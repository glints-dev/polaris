import React from 'react';
import { getResponsiveProps } from '../../utilities/css.js';
import styles from './Inline.scss.js';

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
    ...getResponsiveProps('inline', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Inline,
    style: style
  }, children);
};

export { Inline };
