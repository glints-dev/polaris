import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import { hasSassFunction, isSassFunction, hasNumericOperator, namespace } from '../../utilities/sass.mjs';
import { POLARIS_MIGRATOR_COMMENT } from '../../constants.mjs';

const processed = Symbol('processed');
const zIndexMap = {
  content: '--p-z-1',
  overlay: '--p-z-2'
};
const fixedElementStackingOrder = {
  'global-ribbon': '--p-z-3',
  'top-bar': '--p-z-4',
  'context-bar': '--p-z-5',
  'small-screen-loading-bar': '--p-z-6',
  'nav-backdrop': '--p-z-7',
  nav: '--p-z-8',
  'skip-to-content': '--p-z-9',
  backdrop: '--p-z-10',
  modal: '--p-z-11',
  toast: '--p-z-12'
};

function isValidElement(element, mapObj) {
  return Object.keys(mapObj).includes(element);
}

const hasMoreThanOneArgument = node => node.nodes.length > 1;

const plugin = (options = {}) => {
  const namespacedZIndex = namespace('z-index', options);
  const namespacedFixedElementStackingOrder = namespace('$fixed-element-stacking-order', options);
  return {
    postcssPlugin: 'scss-replace-z-index',

    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;
      const parsedValue = valueParser(decl.value);
      if (!hasSassFunction(namespacedZIndex, parsedValue)) return;
      let containsUnknownSecondArgument = false;
      parsedValue.walk(node => {
        if (!isSassFunction(namespacedZIndex, node)) return;

        if (hasMoreThanOneArgument(node)) {
          // If there's more than one argument to the zIndex fn
          // We assume they're passing in a custom map
          // In this case its unlikely this will resolve to a polaris token value
          // transform legacy zIndex usage to map-get and move on.
          const [key, _, map] = node.nodes;

          if (map.value === namespacedFixedElementStackingOrder && isValidElement(key.value, fixedElementStackingOrder)) {
            var _node$nodes$0$sourceI, _node$nodes$;

            const fixedElementStackingOrderToken = fixedElementStackingOrder[key.value];
            node.value = 'var';
            node.nodes = [{
              type: 'word',
              value: fixedElementStackingOrderToken,
              sourceIndex: (_node$nodes$0$sourceI = (_node$nodes$ = node.nodes[0]) === null || _node$nodes$ === void 0 ? void 0 : _node$nodes$.sourceIndex) !== null && _node$nodes$0$sourceI !== void 0 ? _node$nodes$0$sourceI : 0,
              sourceEndIndex: fixedElementStackingOrderToken.length
            }];
          } else {
            // map.get arguments are in the reverse order to z-index arguments.
            // map.get expects the map object first, and the key second.
            containsUnknownSecondArgument = true;
            node.value = 'map.get';
            node.nodes.reverse();
          }
        } else {
          var _node$nodes$0$value, _node$nodes$2, _node$nodes$0$sourceI2, _node$nodes$3;

          const element = (_node$nodes$0$value = (_node$nodes$2 = node.nodes[0]) === null || _node$nodes$2 === void 0 ? void 0 : _node$nodes$2.value) !== null && _node$nodes$0$value !== void 0 ? _node$nodes$0$value : '';
          if (!isValidElement(element, zIndexMap)) return;
          const zIndexCustomProperty = zIndexMap[element];
          node.value = 'var';
          node.nodes = [{
            type: 'word',
            value: zIndexCustomProperty,
            sourceIndex: (_node$nodes$0$sourceI2 = (_node$nodes$3 = node.nodes[0]) === null || _node$nodes$3 === void 0 ? void 0 : _node$nodes$3.sourceIndex) !== null && _node$nodes$0$sourceI2 !== void 0 ? _node$nodes$0$sourceI2 : 0,
            sourceEndIndex: zIndexCustomProperty.length
          }];
        }
      });

      if (hasNumericOperator(parsedValue) || containsUnknownSecondArgument) {
        // Insert comment if the declaration value contains calculations
        // or if the invocation of zIndex has more than one argument
        decl.before(postcss.comment({
          text: POLARIS_MIGRATOR_COMMENT
        }));
        decl.before(postcss.comment({
          text: `${decl.prop}: ${parsedValue.toString()};`
        }));
      } else {
        decl.value = parsedValue.toString();
      } // @ts-expect-error - Mark the declaration as processed


      decl[processed] = true;
    }

  };
};

function scssReplaceZIndex(fileInfo, _, options) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}

export { scssReplaceZIndex as default };
