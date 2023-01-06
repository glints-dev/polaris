import React from 'react';
import { isInterface } from '../../utilities/is-interface.js';
import { isReactElement } from '../../utilities/is-react-element.js';
import styles from './PageActions.scss.js';
import { buttonsFrom } from '../Button/utils.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';
import { Stack } from '../Stack/Stack.js';

function PageActions({
  primaryAction,
  secondaryActions
}) {
  let primaryActionMarkup = null;

  if (isReactElement(primaryAction)) {
    primaryActionMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, primaryAction);
  } else if (primaryAction) {
    primaryActionMarkup = buttonsFrom(primaryAction, {
      primary: true
    });
  }

  let secondaryActionsMarkup = null;

  if (isInterface(secondaryActions) && secondaryActions.length > 0) {
    secondaryActionsMarkup = /*#__PURE__*/React.createElement(ButtonGroup, null, buttonsFrom(secondaryActions));
  } else if (isReactElement(secondaryActions)) {
    secondaryActionsMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActions);
  }

  const distribution = secondaryActionsMarkup ? 'equalSpacing' : 'trailing';
  return /*#__PURE__*/React.createElement("div", {
    className: styles.PageActions
  }, /*#__PURE__*/React.createElement(Stack, {
    distribution: distribution,
    spacing: "tight"
  }, secondaryActionsMarkup, primaryActionMarkup));
}

export { PageActions };
