'use strict';

var imports = require('../../utilities/imports.js');
var replaceDisplayText = require('./steps/replace-display-text.js');
var replaceOther = require('./steps/replace-other.js');
var replaceTextStyle = require('./steps/replace-text-style.js');

function reactReplaceTextComponents(file, {
  jscodeshift: j
}, options) {
  const source = j(file.source);

  if (!options.relative && !imports.hasImportDeclaration(j, source, '@shopify/polaris')) {
    return file.source;
  }

  replaceDisplayText.replaceDisplayText(j, source, options);
  replaceOther.replaceOther(j, source, options);
  replaceTextStyle.replaceTextStyle(j, source, options);
  return source.toSource();
}

module.exports = reactReplaceTextComponents;
