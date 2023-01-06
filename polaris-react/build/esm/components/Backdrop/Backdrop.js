import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './Backdrop.scss.js';
import { ScrollLock } from '../ScrollLock/ScrollLock.js';

function Backdrop(props) {
  const {
    onClick,
    onTouchStart,
    belowNavigation,
    transparent,
    setClosing
  } = props;
  const className = classNames(styles.Backdrop, belowNavigation && styles.belowNavigation, transparent && styles.transparent);

  const handleMouseDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };

  const handleMouseUp = () => {
    if (setClosing && onClick) {
      setClosing(false);
      onClick();
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollLock, null), /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: onClick,
    onTouchStart: onTouchStart,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp
  }));
}

export { Backdrop };
