import React from 'react';
import { getResponsiveProps, sanitizeCustomProperties } from '../../utilities/css.js';
import styles from './Columns.scss.js';

function Columns({
  children,
  columns,
  gap = '4'
}) {
  const style = {
    '--pc-columns-xs': formatColumns((columns === null || columns === void 0 ? void 0 : columns.xs) || 6),
    '--pc-columns-sm': formatColumns(columns === null || columns === void 0 ? void 0 : columns.sm),
    '--pc-columns-md': formatColumns(columns === null || columns === void 0 ? void 0 : columns.md),
    '--pc-columns-lg': formatColumns(columns === null || columns === void 0 ? void 0 : columns.lg),
    '--pc-columns-xl': formatColumns(columns === null || columns === void 0 ? void 0 : columns.xl),
    ...getResponsiveProps('columns', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Columns,
    style: sanitizeCustomProperties(style)
  }, children);
}

function formatColumns(columns) {
  if (!columns) return undefined;
  return typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns;
}

export { Columns };
