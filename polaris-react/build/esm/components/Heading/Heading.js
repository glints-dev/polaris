import React from 'react';
import styles from './Heading.scss.js';

/**
 * @deprecated The Heading component will be removed in the next
 * major version. Use the Text component instead. See the
 * Polaris component guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
function Heading({
  element: Element = 'h2',
  children,
  id
}) {
  return /*#__PURE__*/React.createElement(Element, {
    className: styles.Heading,
    id: id
  }, children);
}

export { Heading };
