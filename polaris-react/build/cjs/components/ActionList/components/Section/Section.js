'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ActionList = require('../../ActionList.scss.js');
var Item = require('../Item/Item.js');
var Box = require('../../../Box/Box.js');
var Text = require('../../../Text/Text.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    return /*#__PURE__*/React__default["default"].createElement("li", {
      key: `${content}-${index}`,
      role: actionRole === 'menuitem' ? 'presentation' : undefined
    }, /*#__PURE__*/React__default["default"].createElement(Item.Item, Object.assign({
      content: content,
      helpText: helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item)));
  });
  const className = section.title ? undefined : ActionList["default"]['Section-withoutTitle'];
  const titleMarkup = section.title ? /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    paddingBlockStart: "4",
    paddingInlineStart: "4",
    paddingBlockEnd: "2",
    paddingInlineEnd: "4"
  }, /*#__PURE__*/React__default["default"].createElement(Text.Text, {
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

  const sectionMarkup = /*#__PURE__*/React__default["default"].createElement("div", {
    className: className
  }, titleMarkup, /*#__PURE__*/React__default["default"].createElement("ul", {
    className: ActionList["default"].Actions,
    role: sectionRole,
    tabIndex: !hasMultipleSections ? -1 : undefined
  }, actionMarkup));
  return hasMultipleSections ? /*#__PURE__*/React__default["default"].createElement("li", {
    className: ActionList["default"].Section,
    role: "presentation"
  }, sectionMarkup) : sectionMarkup;
}

exports.Section = Section;
