'use strict';

var valueParser = require('postcss-value-parser');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var valueParser__default = /*#__PURE__*/_interopDefaultLegacy(valueParser);

var stylesTokenizeSpace = sass.createSassMigrator('styles-tokenize-space', (_, {
  methods,
  options
}, context) => {
  const namespacedRem = sass.namespace('rem', options);
  return root => {
    methods.walkDecls(root, decl => {
      if (!spaceProps.has(decl.prop)) return;
      const parsedValue = valueParser__default["default"](decl.value);
      handleSpaceProps();

      if (context.fix) {
        decl.value = parsedValue.toString();
      }

      function handleSpaceProps() {
        parsedValue.walk(node => {
          if (sass.isNumericOperator(node)) {
            methods.report({
              node: decl,
              severity: 'warning',
              message: 'Numeric operator detected.'
            });
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            const dimension = valueParser__default["default"].unit(node.value);
            if (!sass.isTransformableLength(dimension)) return;
            const valueInPx = sass.toTransformablePx(node.value);

            if (!typeGuards.isKeyOf(spaceMap, valueInPx)) {
              methods.report({
                node: decl,
                severity: 'error',
                message: `Non-tokenizable value '${node.value}'`
              });
              return;
            }

            if (context.fix) {
              node.value = `var(${spaceMap[valueInPx]})`;
              return;
            }

            methods.report({
              node: decl,
              severity: 'error',
              message: `Prefer var(${spaceMap[valueInPx]}) Polaris token.`
            });
            return;
          }

          if (node.type === 'function') {
            if (sass.isSassFunction(namespacedRem, node)) {
              const args = sass.getFunctionArgs(node);

              if (args.length !== 1) {
                methods.report({
                  node: decl,
                  severity: 'error',
                  message: `Expected 1 argument, got ${args.length}`
                });
                return;
              }

              const valueInPx = sass.toTransformablePx(args[0]);

              if (!typeGuards.isKeyOf(spaceMap, valueInPx)) {
                methods.report({
                  node: decl,
                  severity: 'error',
                  message: `Non-tokenizable value '${args[0].trim()}'`
                });
                return;
              }

              if (context.fix) {
                var _node$nodes$0$sourceI, _node$nodes$;

                node.value = 'var';
                node.nodes = [{
                  type: 'word',
                  value: spaceMap[valueInPx],
                  sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
                  sourceEndIndex: spaceMap[valueInPx].length
                }];
                return;
              }

              methods.report({
                node: decl,
                severity: 'error',
                message: `Prefer var(${spaceMap[valueInPx]}) Polaris token.`
              });
            }

            return sass.StopWalkingFunctionNodes;
          }
        });
      }
    });
  };
});
const globalValues = new Set(['inherit', 'initial', 'unset']);
const spaceProps = new Set(['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'padding-inline', 'padding-inline-start', 'padding-inline-end', 'padding-block', 'padding-block-start', 'padding-block-end', 'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'margin-inline', 'margin-inline-start', 'margin-inline-end', 'margin-block', 'margin-block-start', 'margin-block-end', 'gap', 'grid-gap', 'row-gap', 'grid-row-gap', 'column-gap', 'grid-column-gap']);
const spaceMap = {
  '1px': '--p-space-025',
  '2px': '--p-space-05',
  '4px': '--p-space-1',
  '8px': '--p-space-2',
  '12px': '--p-space-3',
  '16px': '--p-space-4',
  '20px': '--p-space-5',
  '24px': '--p-space-6',
  '32px': '--p-space-8',
  '40px': '--p-space-10',
  '48px': '--p-space-12',
  '64px': '--p-space-16',
  '80px': '--p-space-20',
  '96px': '--p-space-24',
  '112px': '--p-space-28',
  '128px': '--p-space-32'
};

module.exports = stylesTokenizeSpace;
