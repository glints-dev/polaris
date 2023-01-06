'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('../../../utilities/jsx.js');
var imports = require('../../../utilities/imports.js');
var constants = require('../../../constants.js');

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
  const sourcePaths = imports.normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'DisplayText',
    to: 'Text'
  });
  if (!sourcePaths) return;
  if (!imports.hasImportSpecifier(j, source, 'DisplayText', sourcePaths.from)) return;
  const localElementName = imports.getImportSpecifierName(j, source, 'DisplayText', sourcePaths.from) || 'DisplayText';
  imports.updateImports(j, source, {
    fromSpecifier: 'DisplayText',
    toSpecifier: 'Text',
    fromSourcePath: sourcePaths.from,
    toSourcePath: sourcePaths.to
  });
  source.findJSXElements(localElementName).forEach(element => {
    if (jsx.hasJSXSpreadAttribute(j, element)) {
      jsx.insertJSXComment(j, element, constants.POLARIS_MIGRATOR_COMMENT);
    }

    jsx.replaceJSXElement(j, element, 'Text');

    if (!jsx.hasJSXAttribute(j, element, 'size')) {
      jsx.insertJSXAttribute(j, element, 'size', defaultDisplayTextSize);
    }

    jsx.replaceJSXAttributes(j, element, 'size', 'variant', displayTextSizeMap);

    if (jsx.hasJSXAttribute(j, element, 'element')) {
      jsx.replaceJSXAttributes(j, element, 'element', 'as');
    } else {
      jsx.insertJSXAttribute(j, element, 'as', 'p');
    }
  });
  source.find(j.Identifier).filter(path => path.node.name === localElementName).forEach(path => {
    path.node.name = 'Text';
  });
}

exports.replaceDisplayText = replaceDisplayText;
