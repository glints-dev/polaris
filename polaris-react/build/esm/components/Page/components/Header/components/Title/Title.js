import React from 'react';
import { classNames } from '../../../../../../utilities/css.js';
import styles from './Title.scss.js';

function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle
}) {
  const className = classNames(styles.Title, subtitle && styles.TitleWithSubtitle);
  const titleMarkup = title ? /*#__PURE__*/React.createElement("h1", {
    className: className
  }, title) : null;
  const titleMetadataMarkup = titleMetadata ? /*#__PURE__*/React.createElement("div", {
    className: styles.TitleMetadata
  }, titleMetadata) : null;
  const wrappedTitleMarkup = titleMetadata ? /*#__PURE__*/React.createElement("div", {
    className: styles.TitleWithMetadataWrapper
  }, titleMarkup, titleMetadataMarkup) : titleMarkup;
  const subtitleMarkup = subtitle ? /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.SubTitle, compactTitle && styles.SubtitleCompact)
  }, /*#__PURE__*/React.createElement("p", null, subtitle)) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

export { Title };
