function getJSXAttributes(j, element, attributeName) {
  return j(element).find(j.JSXOpeningElement).find(j.JSXAttribute).filter(attribute => {
    const matches = j(attribute).find(j.JSXIdentifier).filter(identifier => identifier.value.name === attributeName);
    return Boolean(matches.length);
  });
}
function hasJSXAttribute(j, element, attributeName) {
  return getJSXAttributes(j, element, attributeName).length > 0;
}
function hasJSXSpreadAttribute(j, element) {
  return j(element).find(j.JSXOpeningElement).find(j.JSXSpreadAttribute).length > 0;
}
function removeJSXAttributes(j, element, attributeName) {
  return getJSXAttributes(j, element, attributeName).remove();
}
function insertJSXAttribute(j, element, attributeName, attributeValue) {
  const newComponent = j.jsxElement(j.jsxOpeningElement(element.node.openingElement.name, [...(element.node.openingElement.attributes || []), j.jsxAttribute(j.jsxIdentifier(attributeName), attributeValue ? j.stringLiteral(attributeValue) : null)]), element.node.closingElement, element.node.children);
  return j(element).replaceWith(newComponent);
}
function replaceJSXAttributes(j, element, attributeName, newAttributeName, newAttributeValue) {
  return getJSXAttributes(j, element, attributeName).forEach(attribute => {
    j(attribute).find(j.JSXIdentifier).replaceWith(j.jsxIdentifier(newAttributeName));

    if (!newAttributeValue) {
      return;
    }

    j(attribute).find(j.StringLiteral).forEach(literal => {
      literal.node.value = typeof newAttributeValue === 'string' ? newAttributeValue : newAttributeValue[literal.node.value];
    });
  });
}
function replaceJSXElement(j, element, componentName) {
  const newComponent = j.jsxElement(j.jsxOpeningElement(j.jsxIdentifier(componentName), element.node.openingElement.attributes), j.jsxClosingElement(j.jsxIdentifier(componentName)), element.node.children);
  return j(element).replaceWith(newComponent);
}
function renameProps(_j, source, componentName, props) {
  var _source$findJSXElemen;

  const fromProps = Object.keys(props);

  const isFromProp = prop => fromProps.includes(prop);

  (_source$findJSXElemen = source.findJSXElements(componentName)) === null || _source$findJSXElemen === void 0 ? void 0 : _source$findJSXElemen.forEach(path => {
    var _path$node$openingEle;

    (_path$node$openingEle = path.node.openingElement.attributes) === null || _path$node$openingEle === void 0 ? void 0 : _path$node$openingEle.forEach(node => {
      if (node.type === 'JSXAttribute' && isFromProp(node.name.name)) {
        node.name.name = props[node.name.name];
      }
    });
  });
  return source;
}
function insertJSXComment(j, element, comment, position = 'before') {
  const commentContent = j.jsxEmptyExpression();
  commentContent.comments = [j.commentBlock(` ${comment} `, false, true)];
  const jsxComment = j.jsxExpressionContainer(commentContent);
  const lineBreak = j.jsxText('\n');

  if (position === 'before') {
    element.insertBefore(jsxComment);
    element.insertBefore(lineBreak);
  }

  if (position === 'after') {
    element.insertAfter(lineBreak);
    element.insertAfter(jsxComment);
  }
}

export { getJSXAttributes, hasJSXAttribute, hasJSXSpreadAttribute, insertJSXAttribute, insertJSXComment, removeJSXAttributes, renameProps, replaceJSXAttributes, replaceJSXElement };
