import { renameProps } from '../../utilities/jsx.mjs';

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
  renameProps(j, source, componentName, props);
  return source.toSource();
}

export { reactRenameComponentProp as default };
