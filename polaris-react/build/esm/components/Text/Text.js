import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './Text.scss.js';

const VariantFontWeightMapping = {
  headingXs: 'semibold',
  headingSm: 'semibold',
  headingMd: 'semibold',
  headingLg: 'semibold',
  headingXl: 'semibold',
  heading2xl: 'semibold',
  heading3xl: 'semibold',
  heading4xl: 'bold',
  bodySm: 'regular',
  bodyMd: 'regular',
  bodyLg: 'regular'
};
const Text = ({
  alignment,
  as,
  breakWord,
  children,
  color,
  fontWeight,
  id,
  truncate = false,
  variant,
  visuallyHidden = false
}) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');
  const className = classNames(styles.root, styles[variant], fontWeight ? styles[fontWeight] : styles[VariantFontWeightMapping[variant]], (alignment || truncate) && styles.block, alignment && styles[alignment], breakWord && styles.break, color && styles[color], truncate && styles.truncate, visuallyHidden && styles.visuallyHidden);
  return /*#__PURE__*/React.createElement(Component, Object.assign({
    className: className
  }, id && {
    id
  }), children);
};

export { Text };
