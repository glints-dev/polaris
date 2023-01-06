'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var Columns$1 = require('./Columns.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    ...css.getResponsiveProps('columns', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: Columns$1["default"].Columns,
    style: css.sanitizeCustomProperties(style)
  }, children);
}

function formatColumns(columns) {
  if (!columns) return undefined;
  return typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns;
}

exports.Columns = Columns;
