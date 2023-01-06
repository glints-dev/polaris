import React from 'react';
import { Text } from '../../../Text/Text.js';

function TagsWrapper({
  children,
  hidden
}) {
  if (hidden) {
    return /*#__PURE__*/React.createElement(Text, {
      variant: "bodySm",
      as: "span",
      visuallyHidden: true
    }, children);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
}

export { TagsWrapper };
