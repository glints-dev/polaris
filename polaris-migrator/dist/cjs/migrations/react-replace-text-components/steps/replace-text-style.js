'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('../../../utilities/jsx.js');
var imports = require('../../../utilities/imports.js');
var constants = require('../../../constants.js');

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
  const sourcePaths = imports.normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'TextStyle',
    to: 'Text'
  });
  if (!sourcePaths) return;
  if (!imports.hasImportSpecifier(j, source, 'TextStyle', sourcePaths.from)) return;
  const localElementName = imports.getImportSpecifierName(j, source, 'TextStyle', sourcePaths.from) || 'TextStyle';
  imports.updateImports(j, source, {
    fromSpecifier: 'TextStyle',
    toSpecifier: 'Text',
    fromSourcePath: sourcePaths.from,
    toSourcePath: sourcePaths.to
  });
  source.findJSXElements(localElementName).forEach(element => {
    if (jsx.hasJSXSpreadAttribute(j, element)) {
      jsx.insertJSXComment(j, element, constants.POLARIS_MIGRATOR_COMMENT);
    }

    jsx.replaceJSXElement(j, element, 'Text');
    jsx.insertJSXAttribute(j, element, 'variant', 'bodyMd');
    jsx.getJSXAttributes(j, element, 'variation').find(j.StringLiteral).forEach(literal => {
      const currentValue = literal.node.value;

      if (currentValue === 'code') {
        const inlineTextSourcePath = options.relative ? sourcePaths.from.replace('TextStyle', 'InlineCode') : '@shopify/polaris';

        if (!imports.hasImportSpecifier(j, source, 'InlineCode', inlineTextSourcePath)) {
          if (options.relative) {
            imports.insertImportDeclaration(j, source, 'InlineCode', inlineTextSourcePath, sourcePaths.to);
          } else {
            imports.insertImportSpecifier(j, source, 'InlineCode', inlineTextSourcePath);
          }
        }

        const InlineCode = j.jsxElement(j.jsxOpeningElement(j.jsxIdentifier('InlineCode')), j.jsxClosingElement(j.jsxIdentifier('InlineCode')), element.node.children);
        element.replace(j.jsxElement(element.node.openingElement, element.node.closingElement, [InlineCode]));
      } else {
        const newAttributes = variationMap[currentValue];
        Object.entries(newAttributes).forEach(([name, value]) => {
          jsx.insertJSXAttribute(j, element, name, value);
        });
      }
    });
    jsx.removeJSXAttributes(j, element, 'variation');

    if (jsx.hasJSXAttribute(j, element, 'element')) {
      jsx.replaceJSXAttributes(j, element, 'element', 'as');
    } else {
      jsx.insertJSXAttribute(j, element, 'as', 'span');
    }
  });
  source.find(j.Identifier).filter(path => path.node.name === localElementName).forEach(path => {
    path.node.name = 'Text';
  });
}

exports.replaceTextStyle = replaceTextStyle;
