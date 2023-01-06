import { hasJSXSpreadAttribute, insertJSXComment, replaceJSXElement, hasJSXAttribute, insertJSXAttribute, replaceJSXAttributes } from '../../../utilities/jsx.mjs';
import { normalizeImportSourcePaths, hasImportSpecifier, getImportSpecifierName, updateImports } from '../../../utilities/imports.mjs';
import { POLARIS_MIGRATOR_COMMENT } from '../../../constants.mjs';

const displayTextSizeMap = {
  small: 'headingLg',
  medium: 'headingXl',
  large: 'heading2xl',
  extraLarge: 'heading4xl'
};
const defaultDisplayTextSize = 'medium';
/**
 * Replace <DisplayText> with the <Text> component
 */

function replaceDisplayText(j, source, options) {
  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'DisplayText',
    to: 'Text'
  });
  if (!sourcePaths) return;
  if (!hasImportSpecifier(j, source, 'DisplayText', sourcePaths.from)) return;
  const localElementName = getImportSpecifierName(j, source, 'DisplayText', sourcePaths.from) || 'DisplayText';
  updateImports(j, source, {
    fromSpecifier: 'DisplayText',
    toSpecifier: 'Text',
    fromSourcePath: sourcePaths.from,
    toSourcePath: sourcePaths.to
  });
  source.findJSXElements(localElementName).forEach(element => {
    if (hasJSXSpreadAttribute(j, element)) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
    }

    replaceJSXElement(j, element, 'Text');

    if (!hasJSXAttribute(j, element, 'size')) {
      insertJSXAttribute(j, element, 'size', defaultDisplayTextSize);
    }

    replaceJSXAttributes(j, element, 'size', 'variant', displayTextSizeMap);

    if (hasJSXAttribute(j, element, 'element')) {
      replaceJSXAttributes(j, element, 'element', 'as');
    } else {
      insertJSXAttribute(j, element, 'as', 'p');
    }
  });
  source.find(j.Identifier).filter(path => path.node.name === localElementName).forEach(path => {
    path.node.name = 'Text';
  });
}

export { replaceDisplayText };
