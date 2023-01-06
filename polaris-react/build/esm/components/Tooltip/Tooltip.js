import React, { useState, useRef, useEffect, useCallback } from 'react';
import { findFirstFocusableNode } from '../../utilities/focus.js';
import { useToggle } from '../../utilities/use-toggle.js';
import { TooltipOverlay } from './components/TooltipOverlay/TooltipOverlay.js';
import { useUniqueId } from '../../utilities/unique-id/hooks.js';
import { Portal } from '../Portal/Portal.js';

function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  active: originalActive,
  hoverDelay,
  preferredPosition = 'below',
  activatorWrapper = 'span',
  accessibilityLabel,
  onOpen,
  onClose
}) {
  const WrapperComponent = activatorWrapper;
  const {
    value: active,
    setTrue: handleFocus,
    setFalse: handleBlur
  } = useToggle(Boolean(originalActive));
  const [activatorNode, setActivatorNode] = useState(null);
  const id = useUniqueId('TooltipContent');
  const activatorContainer = useRef(null);
  const mouseEntered = useRef(false);
  const hoverDelayTimeout = useRef(null);
  useEffect(() => {
    const firstFocusable = activatorContainer.current ? findFirstFocusableNode(activatorContainer.current) : null;
    const accessibilityNode = firstFocusable || activatorContainer.current;
    if (!accessibilityNode) return;
    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
    accessibilityNode.setAttribute('data-polaris-tooltip-activator', 'true');
  }, [id, children]);
  useEffect(() => {
    return () => {
      if (hoverDelayTimeout.current) {
        clearTimeout(hoverDelayTimeout.current);
      }
    };
  }, []);
  const handleKeyUp = useCallback(event => {
    if (event.key !== 'Escape') return;
    onClose === null || onClose === void 0 ? void 0 : onClose();
    handleBlur();
  }, [handleBlur, onClose]);
  const portal = activatorNode ? /*#__PURE__*/React.createElement(Portal, {
    idPrefix: "tooltip"
  }, /*#__PURE__*/React.createElement(TooltipOverlay, {
    id: id,
    preferredPosition: preferredPosition,
    activator: activatorNode,
    active: active,
    accessibilityLabel: accessibilityLabel,
    onClose: noop,
    preventInteraction: dismissOnMouseOut
  }, content)) : null;
  return /*#__PURE__*/React.createElement(WrapperComponent, {
    onFocus: () => {
      onOpen === null || onOpen === void 0 ? void 0 : onOpen();
      handleFocus();
    },
    onBlur: () => {
      onClose === null || onClose === void 0 ? void 0 : onClose();
      handleBlur();
    },
    onMouseLeave: handleMouseLeave,
    onMouseOver: handleMouseEnterFix,
    ref: setActivator,
    onKeyUp: handleKeyUp
  }, children, portal);

  function setActivator(node) {
    const activatorContainerRef = activatorContainer;

    if (node == null) {
      activatorContainerRef.current = null;
      setActivatorNode(null);
      return;
    }

    node.firstElementChild instanceof HTMLElement && setActivatorNode(node.firstElementChild);
    activatorContainerRef.current = node;
  }

  function handleMouseEnter() {
    mouseEntered.current = true;

    if (hoverDelay) {
      hoverDelayTimeout.current = setTimeout(() => {
        onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        handleFocus();
      }, hoverDelay);
    } else {
      onOpen === null || onOpen === void 0 ? void 0 : onOpen();
      handleFocus();
    }
  }

  function handleMouseLeave() {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }

    mouseEntered.current = false;
    onClose === null || onClose === void 0 ? void 0 : onClose();
    handleBlur();
  } // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button


  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}

function noop() {}

export { Tooltip };
