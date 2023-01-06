'use strict';

var valueParser = require('postcss-value-parser');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

const DEFAULT_DURATION = 'base';
const durationMap = {
  none: '--p-duration-0',
  fast: '--p-duration-100',
  base: '--p-duration-200',
  slow: '--p-duration-300',
  slower: '--p-duration-400',
  slowest: '--p-duration-500'
};
var scssReplaceDuration = sass.createSassMigrator('replace-sass-transition', (_, {
  methods,
  options
}, context) => {
  const namespacedDuration = sass.namespace('duration', options);
  return root => {
    methods.walkDecls(root, decl => {
      const parsedValue = valueParser__default["default"](decl.value);
      if (!sass.hasSassFunction(namespacedDuration, parsedValue)) return;
      parsedValue.walk(node => {
        if (sass.isNumericOperator(node)) {
          methods.report({
            node: decl,
            severity: 'warning',
            message: 'Numeric operator detected.'
          });
        }

        if (sass.isSassFunction(namespacedDuration, node)) {
          var _node$nodes$0$value, _node$nodes$;

          const duration = (_node$nodes$0$value = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.value) !== null && _node$nodes$0$value !== void 0 ? _node$nodes$0$value : DEFAULT_DURATION;

          if (!typeGuards.isKeyOf(durationMap, duration)) {
            methods.report({
              severity: 'warning',
              node: decl,
              message: `Unknown duration key '${duration}'.`
            });
            return sass.StopWalkingFunctionNodes;
          }

          const durationCustomProperty = durationMap[duration];
          const targetValue = `var(${durationCustomProperty})`;

          if (context.fix) {
            sass.setNodeValue(node, targetValue);
          } else {
            methods.report({
              severity: 'error',
              node: decl,
              message: `Replace duration with token: ${targetValue}`
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

module.exports = scssReplaceDuration;
