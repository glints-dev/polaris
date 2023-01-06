'use strict';

var postcss = require('postcss');
var sass = require('../../utilities/sass.js');
var typeGuards = require('../../utilities/type-guards.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);

/** Mapping of static breakpoint mixins from old to new */

const staticBreakpointMixins = {
  'page-content-when-partially-condensed': '#{$p-breakpoints-lg-down}',
  'page-content-when-not-partially-condensed': '#{$p-breakpoints-md-up}',
  'page-content-when-fully-condensed': '#{$p-breakpoints-sm-down}',
  'page-content-when-not-fully-condensed': '#{$p-breakpoints-sm-up}',
  'page-content-when-layout-stacked': '#{$p-breakpoints-lg-down}',
  'page-content-when-layout-not-stacked': '#{$p-breakpoints-md-up}',
  'page-before-resource-list-small': '#{$p-breakpoints-sm-down}',
  'page-after-resource-list-small': '#{$p-breakpoints-sm-up}',
  'page-when-not-max-width': '#{$p-breakpoints-lg-down}',
  'when-typography-condensed': '#{$p-breakpoints-md-down}',
  'when-typography-not-condensed': '#{$p-breakpoints-md-up}',
  'frame-when-nav-hidden': '#{$p-breakpoints-md-down}',
  'frame-when-nav-displayed': '#{$p-breakpoints-md-up}',
  'frame-with-nav-when-not-max-width': '#{$p-breakpoints-lg-down}',
  'after-topbar-sheet': '#{$p-breakpoints-sm-up}'
};

const plugin = (options = {}) => {
  const namespacePattern = sass.getNamespacePattern(options);
  const namespacedMixinRegExp = new RegExp(String.raw`^${namespacePattern}([\w-]+)`);
  return {
    postcssPlugin: 'scss-replace-breakpoints',

    AtRule(atRule) {
      var _atRule$params$match;

      if (atRule.name !== 'include') return; // Extract mixin name e.g. name from `@include name;` or `@include name();`

      const mixinName = (_atRule$params$match = atRule.params.match(namespacedMixinRegExp)) === null || _atRule$params$match === void 0 ? void 0 : _atRule$params$match[1];
      if (!typeGuards.isKeyOf(staticBreakpointMixins, mixinName)) return;
      atRule.assign({
        name: 'media',
        params: staticBreakpointMixins[mixinName]
      });
    }

  };
};

function sassReplaceBreakpoints(fileInfo, _, options) {
  return postcss__default["default"](plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss')
  }).css;
}

module.exports = sassReplaceBreakpoints;
