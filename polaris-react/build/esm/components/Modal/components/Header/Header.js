import React from 'react';
import styles from './Header.scss.js';
import { CloseButton } from '../CloseButton/CloseButton.js';
import { Text } from '../../../Text/Text.js';

function Header({
  id,
  titleHidden,
  closing,
  children,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: titleHidden || !children ? styles.titleHidden : styles.Header
  }, /*#__PURE__*/React.createElement("div", {
    id: id,
    className: styles.Title
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h2",
    variant: "headingLg"
  }, children)), /*#__PURE__*/React.createElement(CloseButton, {
    pressed: closing,
    titleHidden: titleHidden,
    onClick: onClose
  }));
}

export { Header };
