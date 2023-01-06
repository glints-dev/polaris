import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import { POLARIS_MIGRATOR_COMMENT } from '../../constants.mjs';
import { createInlineComment, isNumericOperator, isSassFunction, getFunctionArgs, StopWalkingFunctionNodes, namespace } from '../../utilities/sass.mjs';
import { isKeyOf } from '../../utilities/type-guards.mjs';

function scssReplaceBorderWidth(fileInfo, _, options) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}
const processed = Symbol('processed');

const plugin = (options = {}) => {
  const namespacedBorderWidth = namespace('border-width', options);
  return {
    postcssPlugin: 'scss-replace-border-width',

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
      let hasNumericOperator = false;
      const parsedValue = valueParser(decl.value);
      handleBorderProps();

      if (targets.some(({
        replaced
      }) => !replaced || hasNumericOperator)) {
        // Insert comment if the declaration value contains calculations
        decl.before(createInlineComment(POLARIS_MIGRATOR_COMMENT));
        decl.before(createInlineComment(`${decl.prop}: ${parsedValue.toString()};`));
      } else {
        decl.value = parsedValue.toString();
      } //
      // Handlers
      //


      function handleBorderProps() {
        parsedValue.walk(node => {
          if (isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedBorderWidth, node)) {
              var _args$, _node$nodes$0$sourceI, _node$nodes$;

              targets.push({
                replaced: false
              });
              const args = getFunctionArgs(node);
              if (!(args.length === 0 || args.length === 1)) return; // `border-width()` args reference:
              // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L616

              const value = (_args$ = args[0]) !== null && _args$ !== void 0 ? _args$ : 'base';
              if (!isKeyOf(borderWidthFunctionMap, value)) return;
              node.value = 'var';
              node.nodes = [{
                type: 'word',
                value: borderWidthFunctionMap[value],
                sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
                sourceEndIndex: borderWidthFunctionMap[value].length
              }];
              targets[targets.length - 1].replaced = true;
            }

            return StopWalkingFunctionNodes;
          }
        });
      }
    }

  };
};

const borderProps = new Set(['border', 'border-top', 'border-right', 'border-bottom', 'border-left', 'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']);
const borderWidthFunctionMap = {
  '': '--p-border-width-1',
  base: '--p-border-width-1',
  "'base'": '--p-border-width-1',
  thick: '--p-border-width-2',
  "'thick'": '--p-border-width-2',
  thicker: '--p-border-width-3',
  "'thicker'": '--p-border-width-3'
};

export { scssReplaceBorderWidth as default };
