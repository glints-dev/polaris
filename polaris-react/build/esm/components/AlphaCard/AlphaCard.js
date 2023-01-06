import React from 'react';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import { Box } from '../Box/Box.js';

const AlphaCard = ({
  children,
  background = 'surface',
  padding = {
    xs: '4',
    sm: '5'
  },
  roundedAbove
}) => {
  const breakpoints = useBreakpoints();
  const defaultBorderRadius = '2';
  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }

  return /*#__PURE__*/React.createElement(Box, {
    background: background,
    padding: padding,
    shadow: "card",
    borderRadius: hasBorderRadius ? defaultBorderRadius : undefined
  }, children);
};

export { AlphaCard };
