import React from 'react';
import styles from './Divider.scss.js';

const Divider = ({
  borderStyle = 'divider'
}) => {
  const style = {
    '--pc-divider-border-style': borderStyle ? `var(--p-border-${borderStyle})` : undefined
  };
  return /*#__PURE__*/React.createElement("hr", {
    className: styles.Divider,
    style: style
  });
};

export { Divider };
