'use strict';

var valueParser = require('postcss-value-parser');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

const DEFAULT_EASING = 'base';
const easingMap = {
  base: '--p-ease',
  in: '--p-ease-in',
  out: '--p-ease-out'
};
const deprecatedEasingFuncs = ['anticipate', 'excite', 'overshoot'];
var scssReplaceEasing = sass.createSassMigrator('scss-replace-easing', (_, {
  methods,
  options
}, context) => {
  const namespacedEasing = sass.namespace('easing', options);
  return root => {
    methods.walkDecls(root, decl => {
      const parsedValue = valueParser__default["default"](decl.value);
      if (!sass.hasSassFunction(namespacedEasing, parsedValue)) return;
      parsedValue.walk(node => {
        if (sass.isNumericOperator(node)) {
          methods.report({
            node: decl,
            severity: 'warning',
            message: 'Numeric operator detected.'
          });
          return;
        }

        if (sass.isSassFunction(namespacedEasing, node)) {
          var _node$nodes$0$value, _node$nodes$;

          const easing = (_node$nodes$0$value = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.value) !== null && _node$nodes$0$value !== void 0 ? _node$nodes$0$value : DEFAULT_EASING;

          if (!typeGuards.isKeyOf(easingMap, easing)) {
            const comment = deprecatedEasingFuncs.includes(easing) ? `The ${easing} easing function is no longer available in Polaris. See https://polaris.shopify.com/tokens/motion for possible values.` : `Unexpected easing function '${easing}'.`;
            methods.report({
              severity: 'warning',
              node: decl,
              message: comment
            });
            return sass.StopWalkingFunctionNodes;
          }

          const easingCustomProperty = easingMap[easing];
          const targetValue = `var(${easingCustomProperty})`;

          if (context.fix) {
            sass.setNodeValue(node, targetValue);
          } else {
            methods.report({
              severity: 'error',
              node: decl,
              message: `Replace easing function with token: ${targetValue}`
            });
          }

          return sass.StopWalkingFunctionNodes;
        }
      });

      if (context.fix) {
        decl.value = parsedValue.toString();
      }
    });
  };
});

module.exports = scssReplaceEasing;
