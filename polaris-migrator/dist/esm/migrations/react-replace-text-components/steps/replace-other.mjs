import { hasJSXSpreadAttribute, insertJSXComment, replaceJSXElement, insertJSXAttribute, hasJSXAttribute, replaceJSXAttributes } from '../../../utilities/jsx.mjs';
import { normalizeImportSourcePaths, hasImportSpecifier, getImportSpecifierName, updateImports } from '../../../utilities/imports.mjs';
import { POLARIS_MIGRATOR_COMMENT } from '../../../constants.mjs';

const components = {
  Heading: {
    variant: 'headingMd',
    as: 'h2'
  },
  Subheading: {
    variant: 'headingXs',
    as: 'h3'
  },
  Caption: {
    variant: 'bodySm',
    as: 'p'
  },
  VisuallyHidden: {
    variant: 'bodySm',
    as: 'span'
  }
};
/**
 * Replace <Heading>, <Subheading>, <Caption>, and <VisuallyHidden> with the <Text> component
 */

function replaceOther(j, source, options) {
  const relative = options.relative;
  Object.entries(components).forEach(([componentName, {
    variant,
    as
  }]) => {
    const sourcePaths = normalizeImportSourcePaths(j, source, {
      relative,
      from: componentName,
      to: 'Text'
    });
    if (!sourcePaths) return;
    if (!hasImportSpecifier(j, source, componentName, sourcePaths.from)) return;
    const localElementName = getImportSpecifierName(j, source, componentName, sourcePaths.from) || componentName;
    updateImports(j, source, {
      fromSpecifier: componentName,
      toSpecifier: 'Text',
      fromSourcePath: sourcePaths.from,
      toSourcePath: sourcePaths.to
    });
    source.findJSXElements(localElementName).forEach(element => {
      if (hasJSXSpreadAttribute(j, element)) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      }

      replaceJSXElement(j, element, 'Text');
      insertJSXAttribute(j, element, 'variant', variant);

      if (hasJSXAttribute(j, element, 'element')) {
        replaceJSXAttributes(j, element, 'element', 'as');
      } else {
        insertJSXAttribute(j, element, 'as', as);
      }

      if (componentName === 'VisuallyHidden') {
        insertJSXAttribute(j, element, 'visuallyHidden');
      }
    });
    source.find(j.Identifier).filter(path => path.node.name === localElementName).forEach(path => {
      path.node.name = 'Text';
    });
  });
}

export { replaceOther };
