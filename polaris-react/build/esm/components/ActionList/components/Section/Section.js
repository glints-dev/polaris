import React from 'react';
import styles from '../../ActionList.scss.js';
import { Item } from '../Item/Item.js';
import { Box } from '../../../Box/Box.js';
import { Text } from '../../../Text/Text.js';

function Section({
  section,
  hasMultipleSections,
  actionRole,
  onActionAnyItem
}) {
  const handleAction = itemOnAction => {
    return () => {
      if (itemOnAction) {
        itemOnAction();
      }

      if (onActionAnyItem) {
        onActionAnyItem();
      }
    };
  };

  const actionMarkup = section.items.map(({
    content,
    helpText,
    onAction,
    ...item
  }, index) => {
    return /*#__PURE__*/React.createElement("li", {
      key: `${content}-${index}`,
      role: actionRole === 'menuitem' ? 'presentation' : undefined
    }, /*#__PURE__*/React.createElement(Item, Object.assign({
      content: content,
      helpText: helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item)));
  });
  const className = section.title ? undefined : styles['Section-withoutTitle'];
  const titleMarkup = section.title ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "4",
    paddingInlineStart: "4",
    paddingBlockEnd: "2",
    paddingInlineEnd: "4"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "headingXs"
  }, section.title)) : null;
  let sectionRole;

  switch (actionRole) {
    case 'option':
      sectionRole = 'presentation';
      break;

    case 'menuitem':
      sectionRole = !hasMultipleSections ? 'menu' : 'presentation';
      break;

    default:
      sectionRole = undefined;
      break;
  }

  const sectionMarkup = /*#__PURE__*/React.createElement("div", {
    className: className
  }, titleMarkup, /*#__PURE__*/React.createElement("ul", {
    className: styles.Actions,
    role: sectionRole,
    tabIndex: !hasMultipleSections ? -1 : undefined
  }, actionMarkup));
  return hasMultipleSections ? /*#__PURE__*/React.createElement("li", {
    className: styles.Section,
    role: "presentation"
  }, sectionMarkup) : sectionMarkup;
}

export { Section };
