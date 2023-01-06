import valueParser from 'postcss-value-parser';
import { createSassMigrator, namespace, hasSassFunction, isNumericOperator, isSassFunction, StopWalkingFunctionNodes, setNodeValue } from '../../utilities/sass.mjs';
import { isKeyOf } from '../../utilities/type-guards.mjs';

const DEFAULT_DURATION = 'base';
const durationMap = {
  none: '--p-duration-0',
  fast: '--p-duration-100',
  base: '--p-duration-200',
  slow: '--p-duration-300',
  slower: '--p-duration-400',
  slowest: '--p-duration-500'
};
var scssReplaceDuration = createSassMigrator('replace-sass-transition', (_, {
  methods,
  options
}, context) => {
  const namespacedDuration = namespace('duration', options);
  return root => {
    methods.walkDecls(root, decl => {
      const parsedValue = valueParser(decl.value);
      if (!hasSassFunction(namespacedDuration, parsedValue)) return;
      parsedValue.walk(node => {
        if (isNumericOperator(node)) {
          methods.report({
            node: decl,
            severity: 'warning',
            message: 'Numeric operator detected.'
          });
        }

        if (isSassFunction(namespacedDuration, node)) {
          var _node$nodes$0$value, _node$nodes$;

          const duration = (_node$nodes$0$value = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.value) !== null && _node$nodes$0$value !== void 0 ? _node$nodes$0$value : DEFAULT_DURATION;

          if (!isKeyOf(durationMap, duration)) {
            methods.report({
              severity: 'warning',
              node: decl,
              message: `Unknown duration key '${duration}'.`
            });
            return StopWalkingFunctionNodes;
          }

          const durationCustomProperty = durationMap[duration];
          const targetValue = `var(${durationCustomProperty})`;

          if (context.fix) {
            setNodeValue(node, targetValue);
          } else {
            methods.report({
              severity: 'error',
              node: decl,
              message: `Replace duration with token: ${targetValue}`
            });
          }

          return StopWalkingFunctionNodes;
        }
      });

      if (context.fix) {
        decl.value = parsedValue.toString();
      }
    });
  };
});

export { scssReplaceDuration as default };
