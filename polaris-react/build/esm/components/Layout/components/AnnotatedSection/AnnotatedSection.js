import React from 'react';
import styles from '../../Layout.scss.js';
import { TextContainer } from '../../../TextContainer/TextContainer.js';
import { Text } from '../../../Text/Text.js';
import { Box } from '../../../Box/Box.js';

function AnnotatedSection({
  children,
  title,
  description,
  id
}) {
  const descriptionMarkup = typeof description === 'string' ? /*#__PURE__*/React.createElement("p", null, description) : description;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.AnnotatedSection
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.AnnotationWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Annotation
  }, /*#__PURE__*/React.createElement(TextContainer, null, /*#__PURE__*/React.createElement(Text, {
    id: id,
    variant: "headingMd",
    as: "h2"
  }, title), descriptionMarkup && /*#__PURE__*/React.createElement(Box, {
    color: "text-subdued"
  }, descriptionMarkup))), /*#__PURE__*/React.createElement("div", {
    className: styles.AnnotationContent
  }, children)));
}

export { AnnotatedSection };
