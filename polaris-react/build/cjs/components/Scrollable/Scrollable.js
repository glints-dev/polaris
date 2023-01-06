'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var debounce = require('../../utilities/debounce.js');
var css = require('../../utilities/css.js');
var shared = require('../shared.js');
var useLazyRef = require('../../utilities/use-lazy-ref.js');
var useComponentDidMount = require('../../utilities/use-component-did-mount.js');
var context = require('./context.js');
var Scrollable$1 = require('./Scrollable.scss.js');
var ScrollTo = require('./components/ScrollTo/ScrollTo.js');
var context$1 = require('../../utilities/sticky-manager/context.js');
var stickyManager = require('../../utilities/sticky-manager/sticky-manager.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  const [topShadow, setTopShadow] = React.useState(false);
  const [bottomShadow, setBottomShadow] = React.useState(false);
  const stickyManager$1 = useLazyRef.useLazyRef(() => new stickyManager.StickyManager());
  const scrollArea = React.useRef(null);
  const scrollTo = React.useCallback(scrollY => {
    var _scrollArea$current;

    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    (_scrollArea$current = scrollArea.current) === null || _scrollArea$current === void 0 ? void 0 : _scrollArea$current.scrollTo({
      top: scrollY,
      behavior
    });
  }, []);
  const handleScroll = React.useCallback(() => {
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
  useComponentDidMount.useComponentDidMount(() => {
    handleScroll();

    if (hint) {
      requestAnimationFrame(() => performScrollHint(scrollArea.current));
    }
  });
  React.useEffect(() => {
    var _stickyManager$curren;

    const currentScrollArea = scrollArea.current;

    if (!currentScrollArea) {
      return;
    }

    const handleResize = debounce.debounce(handleScroll, 50, {
      trailing: true
    });
    (_stickyManager$curren = stickyManager$1.current) === null || _stickyManager$curren === void 0 ? void 0 : _stickyManager$curren.setContainer(currentScrollArea);
    currentScrollArea.addEventListener('scroll', handleScroll);
    globalThis.addEventListener('resize', handleResize);
    return () => {
      currentScrollArea.removeEventListener('scroll', handleScroll);
      globalThis.removeEventListener('resize', handleResize);
    };
  }, [stickyManager$1, handleScroll]);
  const finalClassName = css.classNames(className, Scrollable$1["default"].Scrollable, vertical && Scrollable$1["default"].vertical, horizontal && Scrollable$1["default"].horizontal, shadow && topShadow && Scrollable$1["default"].hasTopShadow, shadow && bottomShadow && Scrollable$1["default"].hasBottomShadow);
  return /*#__PURE__*/React__default["default"].createElement(context.ScrollableContext.Provider, {
    value: scrollTo
  }, /*#__PURE__*/React__default["default"].createElement(context$1.StickyManagerContext.Provider, {
    value: stickyManager$1.current
  }, /*#__PURE__*/React__default["default"].createElement("div", Object.assign({
    className: finalClassName
  }, shared.scrollable.props, rest, {
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

Scrollable.ScrollTo = ScrollTo.ScrollTo;

Scrollable.forNode = node => {
  const closestElement = node.closest(shared.scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
};

exports.Scrollable = Scrollable;
