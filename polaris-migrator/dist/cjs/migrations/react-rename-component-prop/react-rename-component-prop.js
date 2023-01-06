'use strict';

var jsx = require('../../utilities/jsx.js');

function reactRenameComponentProp(file, {
  jscodeshift: j
}, options) {
  if (!options.componentName || !options.from || !options.to) {
    throw new Error('Missing required options: componentName, from, to');
  }

  const source = j(file.source);
  const componentName = options.componentName;
  const props = {
    [options.from]: options.to
  };
  jsx.renameProps(j, source, componentName, props);
  return source.toSource();
}

module.exports = reactRenameComponentProp;
