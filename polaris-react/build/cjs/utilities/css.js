'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function variationName(name, value) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
function sanitizeCustomProperties(styles) {
  const nonNullValues = Object.entries(styles).filter(([_, value]) => value != null);
  return nonNullValues.length ? Object.fromEntries(nonNullValues) : undefined;
}
function getResponsiveProps(componentName, componentProp, tokenSubgroup, responsiveProp) {
  if (!responsiveProp) return {};

  if (typeof responsiveProp === 'string') {
    return {
      [`--pc-${componentName}-${componentProp}-xs`]: `var(--p-${tokenSubgroup}-${responsiveProp})`
    };
  }

  return Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, `var(--p-${tokenSubgroup}-${aliasOrScale})`]));
}

exports.classNames = classNames;
exports.getResponsiveProps = getResponsiveProps;
exports.sanitizeCustomProperties = sanitizeCustomProperties;
exports.variationName = variationName;
