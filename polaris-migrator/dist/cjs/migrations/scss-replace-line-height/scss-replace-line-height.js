'use strict';

var postcss = require('postcss');
var valueParser = require('postcss-value-parser');
var constants = require('../../constants.js');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

/* eslint-disable line-comment-position */
function scssReplaceLineHeight(fileInfo, _, options) {
  return postcss__default["default"](plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}
const processed = Symbol('processed');

const plugin = (options = {}) => {
  const namespacedLineHeight = sass.namespace('line-height', options);
  return {
    postcssPlugin: 'scss-replace-line-height',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      let needsFix = false;
      let needsComment = false;
      const parsedValue = valueParser__default["default"](decl.value);
      parsedValue.walk(node => {
        if (sass.isSassFunction(namespacedLineHeight, node)) {
          var _args$;

          const args = sass.getFunctionArgs(node); // `line-height()` args reference:
          // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L961

          const styleArg = args[0];
          const variantArg = (_args$ = args[1]) !== null && _args$ !== void 0 ? _args$ : 'base';

          if (!(typeGuards.isKeyOf(lineHeightMap, styleArg) && typeGuards.isKeyOf(lineHeightMap[styleArg], variantArg))) {
            needsComment = true;
            return sass.StopWalkingFunctionNodes;
          }

          needsFix = true;
          const lineHeightVariant = lineHeightMap[styleArg][variantArg];

          if (lineHeightVariant.startsWith('--')) {
            var _node$nodes$0$sourceI, _node$nodes$;

            node.value = 'var';
            node.nodes = [{
              type: 'word',
              value: lineHeightVariant,
              sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
              sourceEndIndex: lineHeightVariant.length
            }];
          } else {
            // @ts-expect-error: We are intentionally changing the node type
            node.type = 'word';
            node.value = lineHeightVariant;
          }

          return sass.StopWalkingFunctionNodes;
        }
      });

      if (needsComment) {
        decl.before(sass.createInlineComment(constants.POLARIS_MIGRATOR_COMMENT));
        decl.before(sass.createInlineComment(`${decl.prop}: ${parsedValue.toString()};`));
      }

      if (needsFix) {
        decl.value = parsedValue.toString();
      } // @ts-expect-error - Mark the declaration as processed


      decl[processed] = true;
    }

  };
};

const lineHeightMap = {
  caption: {
    base: '--p-font-line-height-2',
    'large-screen': '--p-font-line-height-1'
  },
  heading: {
    base: '--p-font-line-height-3'
  },
  subheading: {
    base: '--p-font-line-height-1'
  },
  input: {
    base: '--p-font-line-height-3'
  },
  body: {
    base: '--p-font-line-height-2'
  },
  button: {
    base: '--p-font-line-height-1'
  },
  'button-large': {
    base: '--p-font-line-height-2'
  },
  'display-x-large': {
    base: '2.25rem',
    // 36px
    'large-screen': '2.75rem' // 44px

  },
  'display-large': {
    base: '--p-font-line-height-4',
    'large-screen': '--p-font-line-height-5'
  },
  'display-medium': {
    base: '--p-font-line-height-4',
    'large-screen': '--p-font-line-height-5'
  },
  'display-small': {
    base: '--p-font-line-height-3',
    'large-screen': '--p-font-line-height-4'
  }
};

module.exports = scssReplaceLineHeight;
