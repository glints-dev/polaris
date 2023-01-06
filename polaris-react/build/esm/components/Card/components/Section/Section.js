import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../Card.scss.js';
import { ButtonGroup } from '../../../ButtonGroup/ButtonGroup.js';
import { buttonsFrom } from '../../../Button/utils.js';
import { Stack } from '../../../Stack/Stack.js';
import { Text } from '../../../Text/Text.js';

function Section({
  children,
  title,
  subdued,
  flush,
  fullWidth,
  actions,
  hideOnPrint
}) {
  const className = classNames(styles.Section, flush && styles['Section-flush'], subdued && styles['Section-subdued'], fullWidth && styles['Section-fullWidth'], hideOnPrint && styles['Section-hideOnPrint']);
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup, null, buttonsFrom(actions, {
    plain: true
  })) : null;
  const titleMarkup = typeof title === 'string' ? /*#__PURE__*/React.createElement(Text, {
    variant: "headingSm",
    as: "h3"
  }, title) : title;
  const titleAreaMarkup = titleMarkup || actionMarkup ? /*#__PURE__*/React.createElement("div", {
    className: styles.SectionHeader
  }, actionMarkup ? /*#__PURE__*/React.createElement(Stack, {
    alignment: "baseline"
  }, /*#__PURE__*/React.createElement(Stack.Item, {
    fill: true
  }, titleMarkup), actionMarkup) : titleMarkup) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, titleAreaMarkup, children);
}

export { Section };
