import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './Choice.scss.js';
import { Text } from '../Text/Text.js';
import { InlineError } from '../InlineError/InlineError.js';

function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
  onClick,
  onMouseOut,
  onMouseOver
}) {
  const className = classNames(styles.Choice, labelHidden && styles.labelHidden, disabled && styles.disabled);
  const labelMarkup = /*#__PURE__*/React.createElement("label", {
    className: className,
    htmlFor: id,
    onClick: onClick,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.Control
  }, children), /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, label)));
  const helpTextMarkup = helpText ? /*#__PURE__*/React.createElement("div", {
    className: styles.HelpText,
    id: helpTextID(id)
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    color: "subdued"
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== 'boolean' && /*#__PURE__*/React.createElement("div", {
    className: styles.Error
  }, /*#__PURE__*/React.createElement(InlineError, {
    message: error,
    fieldID: id
  }));
  const descriptionMarkup = helpTextMarkup || errorMarkup ? /*#__PURE__*/React.createElement("div", {
    className: styles.Descriptions
  }, errorMarkup, helpTextMarkup) : null;
  return descriptionMarkup ? /*#__PURE__*/React.createElement("div", null, labelMarkup, descriptionMarkup) : labelMarkup;
}
function helpTextID(id) {
  return `${id}HelpText`;
}

export { Choice, helpTextID };
