import React, { useRef, useEffect } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './SecondaryAction.scss.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';
import { Button } from '../../../Button/Button.js';

function SecondaryAction({
  children,
  destructive,
  helpText,
  onAction,
  getOffsetWidth,
  ...rest
}) {
  const secondaryActionsRef = useRef(null);
  useEffect(() => {
    var _secondaryActionsRef$;

    if (!getOffsetWidth || !secondaryActionsRef.current) return;
    getOffsetWidth((_secondaryActionsRef$ = secondaryActionsRef.current) === null || _secondaryActionsRef$ === void 0 ? void 0 : _secondaryActionsRef$.offsetWidth);
  }, [getOffsetWidth]);
  const buttonMarkup = /*#__PURE__*/React.createElement(Button, Object.assign({
    onClick: onAction
  }, rest), children);
  const actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip, {
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /*#__PURE__*/React.createElement("span", {
    className: classNames(styles.SecondaryAction, destructive && styles.destructive),
    ref: secondaryActionsRef
  }, actionMarkup);
}

export { SecondaryAction };
