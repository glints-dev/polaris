import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import { POLARIS_MIGRATOR_COMMENT } from '../../constants.mjs';
import { isSassFunction, getFunctionArgs, StopWalkingFunctionNodes, createInlineComment, namespace } from '../../utilities/sass.mjs';
import { isKeyOf } from '../../utilities/type-guards.mjs';

function scssReplaceFontFamily(fileInfo, _, options) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}
const processed = Symbol('processed');

const plugin = (options = {}) => {
  const namespacedFontFamily = namespace('font-family', options);
  return {
    postcssPlugin: 'scss-replace-font-family',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      let needsComment = false;
      let needsFix = false;
      const parsedValue = valueParser(decl.value);
      parsedValue.walk(node => {
        if (isSassFunction(namespacedFontFamily, node)) {
          var _args$, _node$nodes$0$sourceI, _node$nodes$;

          const args = getFunctionArgs(node); // `font-family()` args reference:
          // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L945

          const family = (_args$ = args[0]) !== null && _args$ !== void 0 ? _args$ : 'base';

          if (!isKeyOf(fontFamilyMap, family)) {
            needsComment = true;
            return StopWalkingFunctionNodes;
          }

          const fontFamilyCustomProperty = fontFamilyMap[family];
          needsFix = true;
          node.value = 'var';
          node.nodes = [{
            type: 'word',
            value: fontFamilyCustomProperty,
            sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
            sourceEndIndex: fontFamilyCustomProperty.length
          }];
          return StopWalkingFunctionNodes;
        }
      });

      if (needsComment) {
        decl.before(createInlineComment(POLARIS_MIGRATOR_COMMENT));
        decl.before(createInlineComment(`${decl.prop}: ${parsedValue.toString()};`));
      }

      if (needsFix) {
        decl.value = parsedValue.toString();
      } // @ts-expect-error - Mark the declaration as processed


      decl[processed] = true;
    }

  };
};

const fontFamilyMap = {
  base: '--p-font-family-sans',
  monospace: '--p-font-family-mono'
};

export { scssReplaceFontFamily as default };
