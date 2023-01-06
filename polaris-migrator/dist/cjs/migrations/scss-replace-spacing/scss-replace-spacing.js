'use strict';

var postcss = require('postcss');
var valueParser = require('postcss-value-parser');
var constants = require('../../constants.js');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

const spacingMap = {
  none: '--p-space-0',
  'extra-tight': '--p-space-1',
  tight: '--p-space-2',
  'base-tight': '--p-space-3',
  '': '--p-space-4',
  base: '--p-space-4',
  loose: '--p-space-5',
  'extra-loose': '--p-space-8'
};
const processed = Symbol('processed');

const plugin = (options = {}) => {
  const namespacedSpacing = sass.namespace('spacing', options);
  return {
    postcssPlugin: 'ReplaceSassSpacing',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      const parsedValue = valueParser__default["default"](decl.value); // Convert -#{spacing()} to -1 * #{spacing()}

      if (sass.hasNegativeSassInterpolation(decl.value)) {
        sass.replaceNegativeSassInterpolation(parsedValue);
      } // Remove #{} from spacing()


      if (sass.hasSassInterpolation(parsedValue.toString())) {
        sass.removeSassInterpolation(namespacedSpacing, parsedValue);
      } // Now we can check if the value is a spacing() function


      if (!sass.hasSassFunction(namespacedSpacing, parsedValue)) return;
      parsedValue.walk(node => {
        var _node$nodes$0$value, _node$nodes$, _node$nodes$0$sourceI, _node$nodes$2;

        if (!sass.isSassFunction(namespacedSpacing, node)) return;
        const spacing = (_node$nodes$0$value = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.value) !== null && _node$nodes$0$value !== void 0 ? _node$nodes$0$value : '';
        if (!typeGuards.isKeyOf(spacingMap, spacing)) return;
        const spacingCustomProperty = spacingMap[spacing];
        node.value = 'var';
        node.nodes = [{
          type: 'word',
          value: spacingCustomProperty,
          sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$2 = node.nodes[0]) === null || _node$nodes$2 === void 0 ? void 0 : _node$nodes$2.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
          sourceEndIndex: spacingCustomProperty.length
        }];
      });

      if (sass.hasNumericOperator(parsedValue)) {
        // Insert comment if the declaration value contains calculations
        decl.before(sass.createInlineComment(constants.POLARIS_MIGRATOR_COMMENT));
        decl.before(sass.createInlineComment(`${decl.prop}: ${parsedValue.toString()};`));
      } else {
        decl.value = parsedValue.toString();
      } // @ts-expect-error - Mark the declaration as processed


      decl[processed] = true;
    }

  };
};

function scssReplaceSpacing(file, _, options) {
  return postcss__default["default"](plugin(options)).process(file.source, {
    syntax: require('postcss-scss')
  }).css;
}

module.exports = scssReplaceSpacing;
