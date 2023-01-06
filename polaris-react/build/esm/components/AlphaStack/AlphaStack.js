import { createElement } from 'react';
import { classNames, getResponsiveProps, sanitizeCustomProperties } from '../../utilities/css.js';
import styles from './AlphaStack.scss.js';

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
  const className = classNames(styles.AlphaStack, fullWidth && styles.fullWidth, as === 'ul' && styles.listReset);
  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    '--pc-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('stack', 'gap', 'space', gap)
  };
  return /*#__PURE__*/createElement(as, {
    className,
    style: sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

export { AlphaStack };
