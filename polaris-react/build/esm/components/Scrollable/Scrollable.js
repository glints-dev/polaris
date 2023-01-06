import React, { useState, useRef, useCallback, useEffect } from 'react';
import { debounce } from '../../utilities/debounce.js';
import { classNames } from '../../utilities/css.js';
import { scrollable } from '../shared.js';
import { useLazyRef } from '../../utilities/use-lazy-ref.js';
import { useComponentDidMount } from '../../utilities/use-component-did-mount.js';
import { ScrollableContext } from './context.js';
import styles from './Scrollable.scss.js';
import { ScrollTo } from './components/ScrollTo/ScrollTo.js';
import { StickyManagerContext } from '../../utilities/sticky-manager/context.js';
import { StickyManager } from '../../utilities/sticky-manager/sticky-manager.js';

const MAX_SCROLL_HINT_DISTANCE = 100;
const LOW_RES_BUFFER = 2;
function Scrollable({
  children,
  className,
  horizontal = true,
  vertical = true,
  shadow,
  hint,
  focusable,
  onScrolledToBottom,
  ...rest
}) {
  const [topShadow, setTopShadow] = useState(false);
  const [bottomShadow, setBottomShadow] = useState(false);
  const stickyManager = useLazyRef(() => new StickyManager());
  const scrollArea = useRef(null);
  const scrollTo = useCallback(scrollY => {
    var _scrollArea$current;

    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    (_scrollArea$current = scrollArea.current) === null || _scrollArea$current === void 0 ? void 0 : _scrollArea$current.scrollTo({
      top: scrollY,
      behavior
    });
  }, []);
  const handleScroll = useCallback(() => {
    const currentScrollArea = scrollArea.current;

    if (!currentScrollArea) {
      return;
    }

    requestAnimationFrame(() => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = currentScrollArea;
      const canScroll = Boolean(scrollHeight > clientHeight);
      const isBelowTopOfScroll = Boolean(scrollTop > 0);
      const isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);
      setTopShadow(isBelowTopOfScroll);
      setBottomShadow(!isAtBottomOfScroll);

      if (canScroll && isAtBottomOfScroll && onScrolledToBottom) {
        onScrolledToBottom();
      }
    });
  }, [onScrolledToBottom]);
  useComponentDidMount(() => {
    handleScroll();

    if (hint) {
      requestAnimationFrame(() => performScrollHint(scrollArea.current));
    }
  });
  useEffect(() => {
    var _stickyManager$curren;

    const currentScrollArea = scrollArea.current;

    if (!currentScrollArea) {
      return;
    }

    const handleResize = debounce(handleScroll, 50, {
      trailing: true
    });
    (_stickyManager$curren = stickyManager.current) === null || _stickyManager$curren === void 0 ? void 0 : _stickyManager$curren.setContainer(currentScrollArea);
    currentScrollArea.addEventListener('scroll', handleScroll);
    globalThis.addEventListener('resize', handleResize);
    return () => {
      currentScrollArea.removeEventListener('scroll', handleScroll);
      globalThis.removeEventListener('resize', handleResize);
    };
  }, [stickyManager, handleScroll]);
  const finalClassName = classNames(className, styles.Scrollable, vertical && styles.vertical, horizontal && styles.horizontal, shadow && topShadow && styles.hasTopShadow, shadow && bottomShadow && styles.hasBottomShadow);
  return /*#__PURE__*/React.createElement(ScrollableContext.Provider, {
    value: scrollTo
  }, /*#__PURE__*/React.createElement(StickyManagerContext.Provider, {
    value: stickyManager.current
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: finalClassName
  }, scrollable.props, rest, {
    ref: scrollArea // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    ,
    tabIndex: focusable ? 0 : undefined
  }), children)));
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

function performScrollHint(elem) {
  if (!elem || prefersReducedMotion()) {
    return;
  }

  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek = Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;

  const goBackToTop = () => {
    requestAnimationFrame(() => {
      if (elem.scrollTop >= distanceToPeek) {
        elem.removeEventListener('scroll', goBackToTop);
        elem.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  };

  elem.addEventListener('scroll', goBackToTop);
  elem.scrollTo({
    top: MAX_SCROLL_HINT_DISTANCE,
    behavior: 'smooth'
  });
}

Scrollable.ScrollTo = ScrollTo;

Scrollable.forNode = node => {
  const closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
};

export { Scrollable };
