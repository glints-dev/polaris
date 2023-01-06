import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './SkeletonPage.scss.js';
import { SkeletonDisplayText } from '../SkeletonDisplayText/SkeletonDisplayText.js';
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText.js';
import { useI18n } from '../../utilities/i18n/hooks.js';

function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  title = '',
  breadcrumbs
}) {
  const i18n = useI18n();
  const className = classNames(styles.Page, fullWidth && styles.fullWidth, narrowWidth && styles.narrowWidth);
  const titleContent = title ? /*#__PURE__*/React.createElement("h1", {
    className: styles.Title
  }, title) : /*#__PURE__*/React.createElement("div", {
    className: styles.SkeletonTitle
  });
  const titleMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.TitleWrapper
  }, titleContent);
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement("div", {
    className: styles.PrimaryAction
  }, /*#__PURE__*/React.createElement(SkeletonDisplayText, {
    size: "large"
  })) : null;
  const breadcrumbMarkup = breadcrumbs ? /*#__PURE__*/React.createElement("div", {
    className: styles.BreadcrumbAction,
    style: {
      width: 60
    }
  }, /*#__PURE__*/React.createElement(SkeletonBodyText, {
    lines: 1
  })) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    role: "status",
    "aria-label": i18n.translate('Polaris.SkeletonPage.loadingLabel')
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Header
  }, breadcrumbMarkup, /*#__PURE__*/React.createElement("div", {
    className: styles.TitleAndPrimaryAction
  }, titleMarkup, primaryActionMarkup)), /*#__PURE__*/React.createElement("div", {
    className: styles.Content
  }, children));
}

export { SkeletonPage };
