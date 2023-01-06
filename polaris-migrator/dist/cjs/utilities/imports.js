'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function hasImportDeclaration(j, source, sourcePath) {
  return Boolean(source.find(j.ImportDeclaration).filter(path => path.node.importKind !== 'type').filter(path => path.node.source.value === sourcePath).length);
}
function getImportDeclaration(j, source, sourcePath) {
  return source.find(j.ImportDeclaration).filter(path => path.node.importKind !== 'type').filter(path => path.node.source.value === sourcePath);
}
function getRelativeImportDeclaration(j, source, fileName = '') {
  const relativeRegex = new RegExp(String.raw`^[\.\/]*${fileName}$`);
  return source.find(j.ImportDeclaration).filter(path => typeof path.node.source.value === 'string' && relativeRegex.test(path.node.source.value));
}
function getRelativeImportDeclarationValue(j, source, fileName = '') {
  const declarations = getRelativeImportDeclaration(j, source, fileName);
  if (!declarations.length) return null;
  return declarations.nodes()[0].source.value || null;
}
function removeImportDeclaration(j, source, sourcePath) {
  getImportDeclaration(j, source, sourcePath).remove();
}
function insertImportDeclaration(j, source, importSpecifier, sourcePath, afterSourcePath) {
  const isSameModuleSpecifier = sourcePath === afterSourcePath;

  if (isSameModuleSpecifier) {
    insertImportSpecifier(j, source, sourcePath, importSpecifier);
  } else {
    getImportDeclaration(j, source, afterSourcePath).insertAfter(j.importDeclaration.from({
      source: j.literal(sourcePath),
      specifiers: [j.importSpecifier(j.identifier(importSpecifier))]
    }));
  }
}
function getImportAllSpecifiers(j, source, sourcePath) {
  return source.find(j.ImportDeclaration).filter(path => path.node.source.value === sourcePath).find(j.ImportSpecifier);
}
function getImportSpecifier(j, source, specifier, sourcePath) {
  return getImportAllSpecifiers(j, source, sourcePath).filter(path => path.value.imported.name === specifier);
}
function getImportSpecifierName(j, source, specifier, sourcePath) {
  const specifiers = getImportSpecifier(j, source, specifier, sourcePath);
  return specifiers.length > 0 ? specifiers.nodes()[0].local.name : null;
}
function hasImportSpecifiers(j, source, sourcePath) {
  var _getImportAllSpecifie;

  return Boolean((_getImportAllSpecifie = getImportAllSpecifiers(j, source, sourcePath)) === null || _getImportAllSpecifie === void 0 ? void 0 : _getImportAllSpecifie.length);
}
function hasImportSpecifier(j, source, specifier, sourcePath) {
  var _getImportSpecifier;

  return Boolean((_getImportSpecifier = getImportSpecifier(j, source, specifier, sourcePath)) === null || _getImportSpecifier === void 0 ? void 0 : _getImportSpecifier.length);
}
function insertImportSpecifier(j, source, importSpecifier, sourcePath) {
  getImportDeclaration(j, source, sourcePath).replaceWith(declaration => {
    return j.importDeclaration.from({
      source: j.literal(sourcePath),
      specifiers: [...(declaration.value.specifiers || []).filter(item => item.type === 'ImportSpecifier' && item.imported != null), j.importSpecifier(j.identifier(importSpecifier))],
      comments: declaration.value.comments || null
    });
  });
}
function removeImportSpecifier(j, source, specifier, sourcePath) {
  getImportSpecifier(j, source, specifier, sourcePath).remove();
}
function normalizeImportSourcePaths(j, source, options = {
  relative: false,
  from: '',
  to: ''
}) {
  const {
    relative,
    from,
    to
  } = options;
  const sourcePaths = {
    from: '@shopify/polaris',
    to: '@shopify/polaris'
  };

  if (relative) {
    sourcePaths.from = getRelativeImportDeclarationValue(j, source, from) || '';
    if (!sourcePaths.from) return null;
    sourcePaths.to = getRelativeImportDeclarationValue(j, source, to) || sourcePaths.from.replace(from, to);
  }

  return sourcePaths;
}
function updateImports(j, source, options) {
  const {
    fromSpecifier,
    toSpecifier,
    fromSourcePath,
    toSourcePath
  } = options; // Insert new import

  if (!hasImportDeclaration(j, source, toSourcePath)) {
    insertImportDeclaration(j, source, toSpecifier, toSourcePath, fromSourcePath);
  }

  if (!hasImportSpecifier(j, source, toSpecifier, toSourcePath)) {
    insertImportSpecifier(j, source, toSpecifier, toSourcePath);
  } // Remove old import


  if (hasImportSpecifier(j, source, fromSpecifier, fromSourcePath)) {
    removeImportSpecifier(j, source, fromSpecifier, fromSourcePath);
  }

  if (!hasImportSpecifiers(j, source, fromSourcePath)) {
    removeImportDeclaration(j, source, fromSourcePath);
  }
}

exports.getImportAllSpecifiers = getImportAllSpecifiers;
exports.getImportDeclaration = getImportDeclaration;
exports.getImportSpecifier = getImportSpecifier;
exports.getImportSpecifierName = getImportSpecifierName;
exports.getRelativeImportDeclaration = getRelativeImportDeclaration;
exports.getRelativeImportDeclarationValue = getRelativeImportDeclarationValue;
exports.hasImportDeclaration = hasImportDeclaration;
exports.hasImportSpecifier = hasImportSpecifier;
exports.hasImportSpecifiers = hasImportSpecifiers;
exports.insertImportDeclaration = insertImportDeclaration;
exports.insertImportSpecifier = insertImportSpecifier;
exports.normalizeImportSourcePaths = normalizeImportSourcePaths;
exports.removeImportDeclaration = removeImportDeclaration;
exports.removeImportSpecifier = removeImportSpecifier;
exports.updateImports = updateImports;
