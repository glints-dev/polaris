'use strict';

var postcss = require('postcss');
var valueParser = require('postcss-value-parser');
var constants = require('../../constants.js');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

function scssReplaceBorder(fileInfo, _, options) {
  return postcss__default["default"](plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}
const processed = Symbol('processed');

const plugin = (options = {}) => {
  const namespacedBorder = sass.namespace('border', options);
  return {
    postcssPlugin: 'scss-replace-border',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      if (!borderProps.has(decl.prop)) return;
      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */

      const targets = [];
      const parsedValue = valueParser__default["default"](decl.value);
      handleBorderProps();

      if (targets.some(({
        replaced
      }) => !replaced)) {
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
          if (node.type === 'function' && sass.isSassFunction(namespacedBorder, node)) {
            var _args$, _node$nodes$0$sourceI, _node$nodes$;

            targets.push({
              replaced: false
            });
            const args = sass.getFunctionArgs(node);
            if (!(args.length === 0 || args.length === 1)) return; // `border()` args reference:
            // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L641

            const value = (_args$ = args[0]) !== null && _args$ !== void 0 ? _args$ : 'base';
            if (!typeGuards.isKeyOf(borderFunctionMap, value)) return;
            node.value = 'var';
            node.nodes = [{
              type: 'word',
              value: borderFunctionMap[value],
              sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
              sourceEndIndex: borderFunctionMap[value].length
            }];
            targets[targets.length - 1].replaced = true;
          }
        });
      }
    }

  };
};

const borderProps = new Set(['border', 'border-top', 'border-right', 'border-bottom', 'border-left']);
const borderFunctionMap = {
  '': '--p-border-base',
  base: '--p-border-base',
  "'base'": '--p-border-base',
  dark: '--p-border-dark',
  "'dark'": '--p-border-dark',
  transparent: '--p-border-transparent',
  "'transparent'": '--p-border-transparent',
  divider: '	--p-border-divider',
  "'divider'": '	--p-border-divider'
};

module.exports = scssReplaceBorder;
