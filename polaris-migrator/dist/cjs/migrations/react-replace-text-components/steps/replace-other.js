'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('../../../utilities/jsx.js');
var imports = require('../../../utilities/imports.js');
var constants = require('../../../constants.js');

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
    const sourcePaths = imports.normalizeImportSourcePaths(j, source, {
      relative,
      from: componentName,
      to: 'Text'
    });
    if (!sourcePaths) return;
    if (!imports.hasImportSpecifier(j, source, componentName, sourcePaths.from)) return;
    const localElementName = imports.getImportSpecifierName(j, source, componentName, sourcePaths.from) || componentName;
    imports.updateImports(j, source, {
      fromSpecifier: componentName,
      toSpecifier: 'Text',
      fromSourcePath: sourcePaths.from,
      toSourcePath: sourcePaths.to
    });
    source.findJSXElements(localElementName).forEach(element => {
      if (jsx.hasJSXSpreadAttribute(j, element)) {
        jsx.insertJSXComment(j, element, constants.POLARIS_MIGRATOR_COMMENT);
      }

      jsx.replaceJSXElement(j, element, 'Text');
      jsx.insertJSXAttribute(j, element, 'variant', variant);

      if (jsx.hasJSXAttribute(j, element, 'element')) {
        jsx.replaceJSXAttributes(j, element, 'element', 'as');
      } else {
        jsx.insertJSXAttribute(j, element, 'as', as);
      }

      if (componentName === 'VisuallyHidden') {
        jsx.insertJSXAttribute(j, element, 'visuallyHidden');
      }
    });
    source.find(j.Identifier).filter(path => path.node.name === localElementName).forEach(path => {
      path.node.name = 'Text';
    });
  });
}

exports.replaceOther = replaceOther;
