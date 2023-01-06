import { hasJSXSpreadAttribute, insertJSXComment, replaceJSXElement, insertJSXAttribute, getJSXAttributes, removeJSXAttributes, hasJSXAttribute, replaceJSXAttributes } from '../../../utilities/jsx.mjs';
import { normalizeImportSourcePaths, hasImportSpecifier, getImportSpecifierName, updateImports, insertImportDeclaration, insertImportSpecifier } from '../../../utilities/imports.mjs';
import { POLARIS_MIGRATOR_COMMENT } from '../../../constants.mjs';

const variationMap = {
  strong: {
    fontWeight: 'semibold'
  },
  subdued: {
    color: 'subdued'
  },
  positive: {
    color: 'success'
  },
  negative: {
    color: 'critical'
  },
  warning: {
    color: 'warning'
  },
  code: {}
};
/**
 * Replace <TextStyle> with the <Text> component
 */

function replaceTextStyle(j, source, options) {
  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'TextStyle',
    to: 'Text'
  });
  if (!sourcePaths) return;
  if (!hasImportSpecifier(j, source, 'TextStyle', sourcePaths.from)) return;
  const localElementName = getImportSpecifierName(j, source, 'TextStyle', sourcePaths.from) || 'TextStyle';
  updateImports(j, source, {
    fromSpecifier: 'TextStyle',
    toSpecifier: 'Text',
    fromSourcePath: sourcePaths.from,
    toSourcePath: sourcePaths.to
  });
  source.findJSXElements(localElementName).forEach(element => {
    if (hasJSXSpreadAttribute(j, element)) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
    }

    replaceJSXElement(j, element, 'Text');
    insertJSXAttribute(j, element, 'variant', 'bodyMd');
    getJSXAttributes(j, element, 'variation').find(j.StringLiteral).forEach(literal => {
      const currentValue = literal.node.value;

      if (currentValue === 'code') {
        const inlineTextSourcePath = options.relative ? sourcePaths.from.replace('TextStyle', 'InlineCode') : '@shopify/polaris';

        if (!hasImportSpecifier(j, source, 'InlineCode', inlineTextSourcePath)) {
          if (options.relative) {
            insertImportDeclaration(j, source, 'InlineCode', inlineTextSourcePath, sourcePaths.to);
          } else {
            insertImportSpecifier(j, source, 'InlineCode', inlineTextSourcePath);
          }
        }

        const InlineCode = j.jsxElement(j.jsxOpeningElement(j.jsxIdentifier('InlineCode')), j.jsxClosingElement(j.jsxIdentifier('InlineCode')), element.node.children);
        element.replace(j.jsxElement(element.node.openingElement, element.node.closingElement, [InlineCode]));
      } else {
        const newAttributes = variationMap[currentValue];
        Object.entries(newAttributes).forEach(([name, value]) => {
          insertJSXAttribute(j, element, name, value);
        });
      }
    });
    removeJSXAttributes(j, element, 'variation');

    if (hasJSXAttribute(j, element, 'element')) {
      replaceJSXAttributes(j, element, 'element', 'as');
    } else {
      insertJSXAttribute(j, element, 'as', 'span');
    }
  });
  source.find(j.Identifier).filter(path => path.node.name === localElementName).forEach(path => {
    path.node.name = 'Text';
  });
}

export { replaceTextStyle };
