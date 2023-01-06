import valueParser from 'postcss-value-parser';
import { createSassMigrator, namespace, hasSassFunction, isNumericOperator, isSassFunction, StopWalkingFunctionNodes, setNodeValue } from '../../utilities/sass.mjs';
import { isKeyOf } from '../../utilities/type-guards.mjs';

const DEFAULT_EASING = 'base';
const easingMap = {
  base: '--p-ease',
  in: '--p-ease-in',
  out: '--p-ease-out'
};
const deprecatedEasingFuncs = ['anticipate', 'excite', 'overshoot'];
var scssReplaceEasing = createSassMigrator('scss-replace-easing', (_, {
  methods,
  options
}, context) => {
  const namespacedEasing = namespace('easing', options);
  return root => {
    methods.walkDecls(root, decl => {
      const parsedValue = valueParser(decl.value);
      if (!hasSassFunction(namespacedEasing, parsedValue)) return;
      parsedValue.walk(node => {
        if (isNumericOperator(node)) {
          methods.report({
            node: decl,
            severity: 'warning',
            message: 'Numeric operator detected.'
          });
          return;
        }

        if (isSassFunction(namespacedEasing, node)) {
          var _node$nodes$0$value, _node$nodes$;

          const easing = (_node$nodes$0$value = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.value) !== null && _node$nodes$0$value !== void 0 ? _node$nodes$0$value : DEFAULT_EASING;

          if (!isKeyOf(easingMap, easing)) {
            const comment = deprecatedEasingFuncs.includes(easing) ? `The ${easing} easing function is no longer available in Polaris. See https://polaris.shopify.com/tokens/motion for possible values.` : `Unexpected easing function '${easing}'.`;
            methods.report({
              severity: 'warning',
              node: decl,
              message: comment
            });
            return StopWalkingFunctionNodes;
          }

          const easingCustomProperty = easingMap[easing];
          const targetValue = `var(${easingCustomProperty})`;

          if (context.fix) {
            setNodeValue(node, targetValue);
          } else {
            methods.report({
              severity: 'error',
              node: decl,
              message: `Replace easing function with token: ${targetValue}`
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

export { scssReplaceEasing as default };
