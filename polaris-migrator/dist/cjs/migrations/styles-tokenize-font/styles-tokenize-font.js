'use strict';

var postcss = require('postcss');
var valueParser = require('postcss-value-parser');
var polarisTokens = require('@shopify/polaris-tokens');
var constants = require('../../constants.js');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

function stylesTokenizeFont(fileInfo, _, options) {
  return postcss__default["default"](plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}
const processed = Symbol('processed');

const plugin = (options = {}) => {
  const namespacedRem = sass.namespace('rem', options);
  return {
    postcssPlugin: 'styles-tokenize-font',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      const handlers = {
        'font-size': handleFontSize,
        'font-weight': handleFontWeight,
        'line-height': handleFontLineHeight
      };
      if (!typeGuards.isKeyOf(handlers, decl.prop)) return;
      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */

      const targets = [];
      let hasNumericOperator = false;
      const parsedValue = valueParser__default["default"](decl.value);
      handlers[decl.prop]();

      if (targets.some(({
        replaced
      }) => !replaced || hasNumericOperator)) {
        decl.before(sass.createInlineComment(constants.POLARIS_MIGRATOR_COMMENT));
        decl.before(sass.createInlineComment(`${decl.prop}: ${parsedValue.toString()};`));
      } else {
        decl.value = parsedValue.toString();
      } //
      // Handlers
      //


      function handleFontSize() {
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
            const fontSizeInPx = sass.isUnitlessZero(dimension) ? `${dimension.number}px` : polarisTokens.toPx(`${dimension.number}${dimension.unit}`);
            if (!typeGuards.isKeyOf(fontSizeMap, fontSizeInPx)) return;
            targets[targets.length - 1].replaced = true;
            node.value = `var(${fontSizeMap[fontSizeInPx]})`;
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
              const fontSizeInPx = sass.toTransformablePx(args[0]);
              if (!typeGuards.isKeyOf(fontSizeMap, fontSizeInPx)) return;
              targets[targets.length - 1].replaced = true;
              node.value = 'var';
              node.nodes = [{
                type: 'word',
                value: fontSizeMap[fontSizeInPx],
                sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
                sourceEndIndex: fontSizeMap[fontSizeInPx].length
              }];
            }

            return sass.StopWalkingFunctionNodes;
          }
        });
      }

      function handleFontWeight() {
        parsedValue.walk(node => {
          if (node.type === 'function') return sass.StopWalkingFunctionNodes;

          if (sass.isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            targets.push({
              replaced: false
            });
            const fontWeight = node.value;
            if (!typeGuards.isKeyOf(fontWeightMap, fontWeight)) return;
            targets[targets.length - 1].replaced = true;
            node.value = `var(${fontWeightMap[fontWeight]})`;
          }
        });
      }

      function handleFontLineHeight() {
        parsedValue.walk(node => {
          if (sass.isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            targets.push({
              replaced: false
            });
            const lineHeighInPx = sass.toTransformablePx(node.value);
            if (!typeGuards.isKeyOf(fontLineHeightMap, lineHeighInPx)) return;
            targets[targets.length - 1].replaced = true;
            node.value = `var(${fontLineHeightMap[lineHeighInPx]})`;
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
              const lineHeightInPx = sass.toTransformablePx(args[0]);
              if (!typeGuards.isKeyOf(fontLineHeightMap, lineHeightInPx)) return;
              targets[targets.length - 1].replaced = true;
              node.value = 'var';
              node.nodes = [{
                type: 'word',
                value: fontLineHeightMap[lineHeightInPx],
                sourceIndex: (_node$nodes$0$sourceI2 = (_node$nodes$2 = node.nodes[0]) === null || _node$nodes$2 === void 0 ? void 0 : _node$nodes$2.sourceIndex) !== null && _node$nodes$0$sourceI2 !== void 0 ? _node$nodes$0$sourceI2 : 0,
                sourceEndIndex: fontLineHeightMap[lineHeightInPx].length
              }];
            }

            return sass.StopWalkingFunctionNodes;
          }
        });
      } // @ts-expect-error - Mark the declaration as processed


      decl[processed] = true;
    }

  };
};

const globalValues = new Set(['inherit', 'initial', 'unset']);
const fontSizeMap = {
  '12px': '--p-font-size-75',
  '14px': '--p-font-size-100',
  '16px': '--p-font-size-200',
  '20px': '--p-font-size-300',
  '24px': '--p-font-size-400',
  '28px': '--p-font-size-500',
  '32px': '--p-font-size-600',
  '40px': '--p-font-size-700'
};
const fontLineHeightMap = {
  '16px': '--p-font-line-height-1',
  '20px': '--p-font-line-height-2',
  '24px': '--p-font-line-height-3',
  '28px': '--p-font-line-height-4',
  '32px': '--p-font-line-height-5',
  '40px': '--p-font-line-height-6',
  '48px': '--p-font-line-height-7'
};
const fontWeightMap = {
  400: '--p-font-weight-regular',
  500: '--p-font-weight-medium',
  600: '--p-font-weight-semibold',
  700: '--p-font-weight-bold',
  // https://drafts.csswg.org/css-fonts-3/#propdef-font-weight
  // 100 - Thin
  // 200 - Extra Light (Ultra Light)
  // 300 - Light
  // 400 - Normal
  normal: '--p-font-weight-regular',
  // 500 - Medium
  // 600 - Semi Bold (Demi Bold)
  // 700 - Bold
  bold: '--p-font-weight-bold' // 800 - Extra Bold (Ultra Bold)
  // 900 - Black (Heavy)

};

module.exports = stylesTokenizeFont;
