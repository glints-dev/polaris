'use strict';

var postcss = require('postcss');
var valueParser = require('postcss-value-parser');
var constants = require('../../constants.js');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

function stylesTokenizeShape(fileInfo, _, options) {
  return postcss__default["default"](plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}
const processed = Symbol('processed');

const plugin = (options = {}) => {
  const namespacedRem = sass.namespace('rem', options);
  return {
    postcssPlugin: 'styles-tokenize-shape',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      let handler;
      if (borderProps.has(decl.prop)) handler = handleBorderProps;else if (borderRadiusProps.has(decl.prop)) handler = handleBorderRadiusProps;else return;
      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */

      const targets = [];
      let hasNumericOperator = false;
      const parsedValue = valueParser__default["default"](decl.value);
      handler();

      if (targets.some(({
        replaced
      }) => !replaced || hasNumericOperator)) {
        // Insert comment if the declaration value contains calculations
        decl.before(sass.createInlineComment(constants.POLARIS_MIGRATOR_COMMENT));
        decl.before(sass.createInlineComment(`${decl.prop}: ${parsedValue.toString()};`));
      } else {
        decl.value = parsedValue.toString();
      } //
      // Handlers
      //


      function handleBorderProps() {
        parsedValue.walk(node => {
          if (sass.isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            const dimension = valueParser__default["default"].unit(node.value);
            if (!sass.isTransformableLength(dimension)) return;
            targets.push({
              replaced: false
            });
            const valueInPx = sass.toTransformablePx(node.value);
            if (!typeGuards.isKeyOf(borderWidthLengthMap, valueInPx)) return;
            node.value = `var(${borderWidthLengthMap[valueInPx]})`;
            targets[targets.length - 1].replaced = true;
            return;
          }

          if (node.type === 'function') {
            if (sass.isSassFunction(namespacedRem, node)) {
              var _node$nodes$0$sourceI, _node$nodes$;

              targets.push({
                replaced: false
              });
              const args = sass.getFunctionArgs(node);
              if (args.length !== 1) return;
              const valueInPx = sass.toTransformablePx(args[0]);
              if (!typeGuards.isKeyOf(borderWidthLengthMap, valueInPx)) return;
              node.value = 'var';
              node.nodes = [{
                type: 'word',
                value: borderWidthLengthMap[valueInPx],
                sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
                sourceEndIndex: borderWidthLengthMap[valueInPx].length
              }];
              targets[targets.length - 1].replaced = true;
            }

            return sass.StopWalkingFunctionNodes;
          }
        });
      }

      function handleBorderRadiusProps() {
        parsedValue.walk(node => {
          if (sass.isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            const dimension = valueParser__default["default"].unit(node.value);
            if (!sass.isTransformableLength(dimension)) return;
            targets.push({
              replaced: false
            });
            const valueInPx = sass.toTransformablePx(node.value);
            if (!typeGuards.isKeyOf(borderRadiusLengthMap, valueInPx)) return;
            node.value = `var(${borderRadiusLengthMap[valueInPx]})`;
            targets[targets.length - 1].replaced = true;
            return;
          }

          if (node.type === 'function') {
            if (sass.isSassFunction(namespacedRem, node)) {
              var _node$nodes$0$sourceI2, _node$nodes$2;

              targets.push({
                replaced: false
              });
              const args = sass.getFunctionArgs(node);
              if (args.length !== 1) return;
              const valueInPx = sass.toTransformablePx(args[0]);
              if (!typeGuards.isKeyOf(borderRadiusLengthMap, valueInPx)) return;
              node.value = 'var';
              node.nodes = [{
                type: 'word',
                value: borderRadiusLengthMap[valueInPx],
                sourceIndex: (_node$nodes$0$sourceI2 = (_node$nodes$2 = node.nodes[0]) === null || _node$nodes$2 === void 0 ? void 0 : _node$nodes$2.sourceIndex) !== null && _node$nodes$0$sourceI2 !== void 0 ? _node$nodes$0$sourceI2 : 0,
                sourceEndIndex: borderRadiusLengthMap[valueInPx].length
              }];
              targets[targets.length - 1].replaced = true;
            }

            return sass.StopWalkingFunctionNodes;
          }
        });
      }
    }

  };
};

const globalValues = new Set(['inherit', 'initial', 'unset']);
const borderProps = new Set(['border', 'border-top', 'border-right', 'border-bottom', 'border-left', 'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']);
const borderRadiusProps = new Set(['border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius']);
const borderWidthLengthMap = {
  '1px': '--p-border-width-1',
  '2px': '--p-border-width-2',
  '3px': '--p-border-width-3',
  '4px': '--p-border-width-4',
  '5px': '--p-border-width-5'
};
const borderRadiusLengthMap = {
  '2px': '--p-border-radius-05',
  '4px': '--p-border-radius-1',
  '8px': '--p-border-radius-2',
  '12px': '--p-border-radius-3',
  '16px': '--p-border-radius-4',
  '20px': '--p-border-radius-5',
  '30px': '--p-border-radius-6',
  '3px': '--p-border-radius-base',
  '6px': '--p-border-radius-large'
};

module.exports = stylesTokenizeShape;
