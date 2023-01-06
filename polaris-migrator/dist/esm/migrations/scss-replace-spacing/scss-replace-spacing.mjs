import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import { POLARIS_MIGRATOR_COMMENT } from '../../constants.mjs';
import { hasNegativeSassInterpolation, replaceNegativeSassInterpolation, hasSassInterpolation, removeSassInterpolation, hasSassFunction, isSassFunction, hasNumericOperator, namespace, createInlineComment } from '../../utilities/sass.mjs';
import { isKeyOf } from '../../utilities/type-guards.mjs';

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
  const namespacedSpacing = namespace('spacing', options);
  return {
    postcssPlugin: 'ReplaceSassSpacing',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      const parsedValue = valueParser(decl.value); // Convert -#{spacing()} to -1 * #{spacing()}

      if (hasNegativeSassInterpolation(decl.value)) {
        replaceNegativeSassInterpolation(parsedValue);
      } // Remove #{} from spacing()


      if (hasSassInterpolation(parsedValue.toString())) {
        removeSassInterpolation(namespacedSpacing, parsedValue);
      } // Now we can check if the value is a spacing() function


      if (!hasSassFunction(namespacedSpacing, parsedValue)) return;
      parsedValue.walk(node => {
        var _node$nodes$0$value, _node$nodes$, _node$nodes$0$sourceI, _node$nodes$2;

        if (!isSassFunction(namespacedSpacing, node)) return;
        const spacing = (_node$nodes$0$value = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.value) !== null && _node$nodes$0$value !== void 0 ? _node$nodes$0$value : '';
        if (!isKeyOf(spacingMap, spacing)) return;
        const spacingCustomProperty = spacingMap[spacing];
        node.value = 'var';
        node.nodes = [{
          type: 'word',
          value: spacingCustomProperty,
          sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$2 = node.nodes[0]) === null || _node$nodes$2 === void 0 ? void 0 : _node$nodes$2.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
          sourceEndIndex: spacingCustomProperty.length
        }];
      });

      if (hasNumericOperator(parsedValue)) {
        // Insert comment if the declaration value contains calculations
        decl.before(createInlineComment(POLARIS_MIGRATOR_COMMENT));
        decl.before(createInlineComment(`${decl.prop}: ${parsedValue.toString()};`));
      } else {
        decl.value = parsedValue.toString();
      } // @ts-expect-error - Mark the declaration as processed


      decl[processed] = true;
    }

  };
};

function scssReplaceSpacing(file, _, options) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss')
  }).css;
}

export { scssReplaceSpacing as default };
