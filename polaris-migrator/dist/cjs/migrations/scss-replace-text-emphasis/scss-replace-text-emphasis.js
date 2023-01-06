'use strict';

var postcss = require('postcss');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);

/** Mapping of static mixins to replacement declarations */

const staticMixins = {
  // Note: The below mixins do accept arguments, but the logic has
  // since been removed from the mixins.
  'text-emphasis-subdued': {
    color: 'var(--p-text-subdued)'
  },
  'text-emphasis-strong': {
    'font-weight': 'var(--p-font-weight-semibold)'
  },
  'text-emphasis-normal': {
    color: 'var(--p-text)',
    'font-weight': 'var(--p-font-weight-regular)'
  }
};

const plugin = (options = {}) => {
  const namespacePattern = sass.getNamespacePattern(options);
  const namespacedMixinRegExp = new RegExp(String.raw`^${namespacePattern}([\w-]+)`);
  return {
    postcssPlugin: 'scss-replace-text-emphasis',

    AtRule(atRule) {
      var _atRule$params$match;

      if (atRule.name !== 'include') return; // Extract mixin name e.g. name from `@include name;` or `@include name();`

      const mixinName = (_atRule$params$match = atRule.params.match(namespacedMixinRegExp)) === null || _atRule$params$match === void 0 ? void 0 : _atRule$params$match[1];
      if (!typeGuards.isKeyOf(staticMixins, mixinName)) return;
      atRule.replaceWith(...Object.entries(staticMixins[mixinName]).map(([prop, value]) => postcss__default["default"].decl({
        prop,
        value
      })));
    }

  };
};

function sassReplaceTextEmphasis(fileInfo, _, options) {
  return postcss__default["default"](plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}

module.exports = sassReplaceTextEmphasis;
