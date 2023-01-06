import { hasImportDeclaration } from '../../utilities/imports.mjs';
import { replaceDisplayText } from './steps/replace-display-text.mjs';
import { replaceOther } from './steps/replace-other.mjs';
import { replaceTextStyle } from './steps/replace-text-style.mjs';

function reactReplaceTextComponents(file, {
  jscodeshift: j
}, options) {
  const source = j(file.source);

  if (!options.relative && !hasImportDeclaration(j, source, '@shopify/polaris')) {
    return file.source;
  }

  replaceDisplayText(j, source, options);
  replaceOther(j, source, options);
  replaceTextStyle(j, source, options);
  return source.toSource();
}

export { reactReplaceTextComponents as default };
