import React, { useState, useReducer, useRef, useEffect, useCallback, Children } from 'react';
import { EnableSelectionMinor } from '@shopify/polaris-icons';
import { toPx, tokens } from '@shopify/polaris-tokens';
import { debounce } from '../../utilities/debounce.js';
import { classNames } from '../../utilities/css.js';
import { isElementOfType } from '../../utilities/components.js';
import { useLazyRef } from '../../utilities/use-lazy-ref.js';
import styles from './ResourceList.scss.js';
import { Select } from '../Select/Select.js';
import { ResourceItem } from '../ResourceItem/ResourceItem.js';
import { SELECT_ALL_ITEMS } from '../../utilities/resource-list/types.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { useIsBulkActionsSticky } from '../BulkActions/hooks/use-is-bulk-actions-sticky.js';
import { SelectAllActions } from '../SelectAllActions/SelectAllActions.js';
import { Button } from '../Button/Button.js';
import { CheckableButton } from '../CheckableButton/CheckableButton.js';
import { Sticky } from '../Sticky/Sticky.js';
import { EmptySearchResult } from '../EmptySearchResult/EmptySearchResult.js';
import { Spinner } from '../Spinner/Spinner.js';
import { ResourceListContext } from '../../utilities/resource-list/context.js';
import { EventListener } from '../EventListener/EventListener.js';
import { BulkActions } from '../BulkActions/BulkActions.js';

const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

function getAllItemsOnPage(items, idForItem) {
  return items.map((item, index) => {
    return idForItem(item, index);
  });
}

const isBreakpointsXS = () => {
  var _toPx;

  return typeof window === 'undefined' ? false : window.innerWidth < parseFloat((_toPx = toPx(tokens.breakpoints['breakpoints-sm'])) !== null && _toPx !== void 0 ? _toPx : '');
};

function defaultIdForItem(item, index) {
  return Object.prototype.hasOwnProperty.call(item, 'id') ? item.id : index.toString();
}

const ResourceList = function ResourceList({
  items,
  filterControl,
  emptyState,
  emptySearchState,
  resourceName: resourceNameProp,
  promotedBulkActions,
  bulkActions,
  selectedItems = [],
  isFiltered,
  selectable,
  hasMoreItems,
  loading,
  showHeader,
  totalItemsCount,
  sortValue,
  sortOptions,
  alternateTool,
  onSortChange,
  onSelectionChange,
  renderItem,
  idForItem = defaultIdForItem,
  resolveItemId
}) {
  const i18n = useI18n();
  const [selectMode, setSelectMode] = useState(Boolean(selectedItems && selectedItems.length > 0));
  const [loadingPosition, setLoadingPositionState] = useState(0);
  const [lastSelected, setLastSelected] = useState();
  const [smallScreen, setSmallScreen] = useState(isBreakpointsXS());
  const forceUpdate = useReducer((x = 0) => x + 1, 0)[1];
  const checkableButtonRef = useRef(null);
  const {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
    computeTableDimensions
  } = useIsBulkActionsSticky(selectMode);
  useEffect(() => {
    computeTableDimensions();
  }, [computeTableDimensions, items.length]);
  const defaultResourceName = useLazyRef(() => ({
    singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: i18n.translate('Polaris.ResourceList.defaultItemPlural')
  }));
  const listRef = useRef(null);

  const handleSelectMode = selectMode => {
    setSelectMode(selectMode);

    if (!selectMode && onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleResize = debounce(() => {
    const newSmallScreen = isBreakpointsXS();

    if (selectedItems && selectedItems.length === 0 && selectMode && !newSmallScreen) {
      handleSelectMode(false);
    }

    if (smallScreen !== newSmallScreen) {
      setSmallScreen(newSmallScreen);
    }
  }, 50, {
    leading: true,
    trailing: true,
    maxWait: 50
  });
  const isSelectable = Boolean(promotedBulkActions && promotedBulkActions.length > 0 || bulkActions && bulkActions.length > 0 || selectable) && !smallScreen;

  const selectAllSelectState = () => {
    let selectState = 'indeterminate';

    if (!selectedItems || Array.isArray(selectedItems) && selectedItems.length === 0) {
      selectState = false;
    } else if (selectedItems === SELECT_ALL_ITEMS || Array.isArray(selectedItems) && selectedItems.length === items.length) {
      selectState = true;
    }

    return selectState;
  };

  const resourceName = resourceNameProp ? resourceNameProp : defaultResourceName.current;

  const headerTitle = () => {
    const itemsCount = items.length;
    const resource = !loading && (!totalItemsCount && itemsCount === 1 || totalItemsCount === 1) ? resourceName.singular : resourceName.plural;

    if (loading) {
      return i18n.translate('Polaris.ResourceList.loading', {
        resource
      });
    } else if (totalItemsCount) {
      return i18n.translate('Polaris.ResourceList.showingTotalCount', {
        itemsCount,
        totalItemsCount,
        resource
      });
    } else {
      return i18n.translate('Polaris.ResourceList.showing', {
        itemsCount,
        resource
      });
    }
  };

  const selectAllActionsLabel = () => {
    const selectedItemsCount = selectedItems === SELECT_ALL_ITEMS ? `${items.length}+` : selectedItems.length;
    return i18n.translate('Polaris.ResourceList.selected', {
      selectedItemsCount
    });
  };

  const selectAllActionsAccessibilityLabel = () => {
    const selectedItemsCount = selectedItems.length;
    const totalItemsCount = items.length;
    const allSelected = selectedItemsCount === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxDeselectAllSingle', {
        resourceNameSingular: resourceName.singular
      });
    } else if (totalItemsCount === 1) {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxSelectAllSingle', {
        resourceNameSingular: resourceName.singular
      });
    } else if (allSelected) {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxDeselectAllMultiple', {
        itemsLength: items.length,
        resourceNamePlural: resourceName.plural
      });
    } else {
      return i18n.translate('Polaris.ResourceList.a11yCheckboxSelectAllMultiple', {
        itemsLength: items.length,
        resourceNamePlural: resourceName.plural
      });
    }
  };

  const paginatedSelectAllText = () => {
    if (!isSelectable || !hasMoreItems) {
      return;
    }

    if (selectedItems === SELECT_ALL_ITEMS) {
      return i18n.translate(isFiltered ? 'Polaris.ResourceList.allFilteredItemsSelected' : 'Polaris.ResourceList.allItemsSelected', {
        itemsLength: items.length,
        resourceNamePlural: resourceName.plural
      });
    }
  };

  const paginatedSelectAllAction = () => {
    if (!isSelectable || !hasMoreItems) {
      return;
    }

    const actionText = selectedItems === SELECT_ALL_ITEMS ? i18n.translate('Polaris.Common.undo') : i18n.translate(isFiltered ? 'Polaris.ResourceList.selectAllFilteredItems' : 'Polaris.ResourceList.selectAllItems', {
      itemsLength: items.length,
      resourceNamePlural: resourceName.plural
    });
    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore
    };
  };

  const emptySearchResultText = {
    title: i18n.translate('Polaris.ResourceList.emptySearchResultTitle', {
      resourceNamePlural: resourceName.plural
    }),
    description: i18n.translate('Polaris.ResourceList.emptySearchResultDescription')
  };

  const handleSelectAllItemsInStore = () => {
    const newlySelectedItems = selectedItems === SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : SELECT_ALL_ITEMS;

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  };

  const setLoadingPosition = useCallback(() => {
    if (listRef.current != null) {
      if (typeof window === 'undefined') {
        return;
      }

      const overlay = listRef.current.getBoundingClientRect();
      const viewportHeight = Math.max(document.documentElement ? document.documentElement.clientHeight : 0, window.innerHeight || 0);
      const overflow = viewportHeight - overlay.height;
      const spinnerHeight = items.length === 1 ? SMALL_SPINNER_HEIGHT : LARGE_SPINNER_HEIGHT;
      const spinnerPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 : (viewportHeight - overlay.top - spinnerHeight) / 2;
      setLoadingPositionState(spinnerPosition);
    }
  }, [listRef, items.length]);
  const itemsExist = items.length > 0;
  useEffect(() => {
    if (loading) {
      setLoadingPosition();
    }
  }, [loading, setLoadingPosition]);
  useEffect(() => {
    if (selectedItems && selectedItems.length > 0 && !selectMode) {
      setSelectMode(true);
    }

    if ((!selectedItems || selectedItems.length === 0) && !isBreakpointsXS()) {
      setSelectMode(false);
    }
  }, [selectedItems, selectMode]);
  useEffect(() => {
    forceUpdate();
  }, [forceUpdate, items]);

  const renderItemWithId = (item, index) => {
    const id = idForItem(item, index);
    const itemContent = renderItem(item, id, index);

    if (process.env.NODE_ENV === 'development' && !isElementOfType(itemContent, ResourceItem)) {
      // eslint-disable-next-line no-console
      console.warn('<ResourceList /> renderItem function should return a <ResourceItem />.');
    }

    return itemContent;
  };

  const handleMultiSelectionChange = (lastSelected, currentSelected, resolveItemId) => {
    const min = Math.min(lastSelected, currentSelected);
    const max = Math.max(lastSelected, currentSelected);
    return items.slice(min, max + 1).map(resolveItemId);
  };

  const handleSelectionChange = (selected, id, sortOrder, shiftKey) => {
    if (selectedItems == null || onSelectionChange == null) {
      return;
    }

    let newlySelectedItems = selectedItems === SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : [...selectedItems];

    if (sortOrder !== undefined) {
      setLastSelected(sortOrder);
    }

    const lastSelectedFromState = lastSelected;
    let selectedIds = [id];

    if (shiftKey && lastSelectedFromState != null && sortOrder !== undefined && resolveItemId) {
      selectedIds = handleMultiSelectionChange(lastSelectedFromState, sortOrder, resolveItemId);
    }

    newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];

    if (!selected) {
      for (const selectedId of selectedIds) {
        newlySelectedItems.splice(newlySelectedItems.indexOf(selectedId), 1);
      }
    }

    if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
      handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      handleSelectMode(true);
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  };

  const handleToggleAll = () => {
    let newlySelectedItems;

    if (Array.isArray(selectedItems) && selectedItems.length === items.length || selectedItems === SELECT_ALL_ITEMS) {
      newlySelectedItems = [];
    } else {
      newlySelectedItems = items.map((item, index) => {
        return idForItem(item, index);
      });
    }

    if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
      handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      handleSelectMode(true);
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    } // setTimeout ensures execution after the Transition on BulkActions


    setTimeout(() => {
      var _checkableButtonRef$c;

      checkableButtonRef === null || checkableButtonRef === void 0 ? void 0 : (_checkableButtonRef$c = checkableButtonRef.current) === null || _checkableButtonRef$c === void 0 ? void 0 : _checkableButtonRef$c.focus();
    }, 0);
  };

  const selectAllActionsMarkup = isSelectable ? /*#__PURE__*/React.createElement("div", {
    className: styles.SelectAllActionsWrapper
  }, /*#__PURE__*/React.createElement(SelectAllActions, {
    label: selectAllActionsLabel(),
    accessibilityLabel: selectAllActionsAccessibilityLabel(),
    selected: selectAllSelectState(),
    onToggleAll: handleToggleAll,
    selectMode: selectMode,
    paginatedSelectAllAction: paginatedSelectAllAction(),
    paginatedSelectAllText: paginatedSelectAllText(),
    disabled: loading,
    ref: checkableButtonRef
  })) : null;
  const bulkActionClassNames = classNames(styles.BulkActionsWrapper, isBulkActionsSticky && styles.BulkActionsWrapperSticky);
  const bulkActionsMarkup = isSelectable && selectMode ? /*#__PURE__*/React.createElement("div", {
    className: bulkActionClassNames,
    style: {
      top: isBulkActionsSticky ? undefined : bulkActionsAbsoluteOffset,
      width: bulkActionsMaxWidth,
      left: isBulkActionsSticky ? bulkActionsOffsetLeft : undefined
    }
  }, /*#__PURE__*/React.createElement(BulkActions, {
    selectMode: selectMode,
    onSelectModeToggle: handleSelectMode,
    promotedActions: promotedBulkActions,
    actions: bulkActions,
    disabled: loading,
    isSticky: isBulkActionsSticky,
    width: bulkActionsMaxWidth
  })) : null;
  const filterControlMarkup = filterControl ? /*#__PURE__*/React.createElement("div", {
    className: styles.FiltersWrapper
  }, filterControl) : null;
  const sortingSelectMarkup = sortOptions && sortOptions.length > 0 && !alternateTool ? /*#__PURE__*/React.createElement("div", {
    className: styles.SortWrapper
  }, /*#__PURE__*/React.createElement(Select, {
    label: i18n.translate('Polaris.ResourceList.sortingLabel'),
    labelInline: !smallScreen,
    labelHidden: smallScreen,
    options: sortOptions,
    onChange: onSortChange,
    value: sortValue,
    disabled: selectMode
  })) : null;
  const alternateToolMarkup = alternateTool && !sortingSelectMarkup ? /*#__PURE__*/React.createElement("div", {
    className: styles.AlternateToolWrapper
  }, alternateTool) : null;
  const headerTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.HeaderTitleWrapper
  }, headerTitle());
  const selectButtonMarkup = isSelectable ? /*#__PURE__*/React.createElement("div", {
    className: styles.SelectButtonWrapper
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: selectMode,
    icon: EnableSelectionMinor,
    onClick: () => handleSelectMode(true)
  }, i18n.translate('Polaris.ResourceList.selectButtonText'))) : null;
  const checkableButtonMarkup = isSelectable ? /*#__PURE__*/React.createElement("div", {
    className: styles.CheckableButtonWrapper
  }, /*#__PURE__*/React.createElement(CheckableButton, {
    accessibilityLabel: selectAllActionsAccessibilityLabel(),
    label: headerTitle(),
    onToggleAll: handleToggleAll,
    disabled: loading,
    ref: checkableButtonRef
  })) : null;
  const needsHeader = isSelectable || sortOptions && sortOptions.length > 0 || alternateTool;
  const headerWrapperOverlay = loading ? /*#__PURE__*/React.createElement("div", {
    className: styles['HeaderWrapper-overlay']
  }) : null;
  const showEmptyState = emptyState && !itemsExist && !loading;
  const showEmptySearchState = !showEmptyState && filterControl && !itemsExist && !loading;
  const headerMarkup = !showEmptyState && showHeader !== false && !showEmptySearchState && (showHeader || needsHeader) && listRef.current && /*#__PURE__*/React.createElement("div", {
    className: styles.HeaderOuterWrapper
  }, /*#__PURE__*/React.createElement(Sticky, {
    boundingElement: listRef.current
  }, isSticky => {
    const headerClassName = classNames(styles.HeaderWrapper, sortOptions && sortOptions.length > 0 && !alternateTool && styles['HeaderWrapper-hasSort'], alternateTool && styles['HeaderWrapper-hasAlternateTool'], isSelectable && styles['HeaderWrapper-hasSelect'], loading && styles['HeaderWrapper-disabled'], isSelectable && selectMode && styles['HeaderWrapper-inSelectMode'], isSticky && styles['HeaderWrapper-isSticky']);
    return /*#__PURE__*/React.createElement("div", {
      className: headerClassName
    }, headerWrapperOverlay, /*#__PURE__*/React.createElement("div", {
      className: styles.HeaderContentWrapper
    }, headerTitleMarkup, checkableButtonMarkup, alternateToolMarkup, sortingSelectMarkup, selectButtonMarkup), selectAllActionsMarkup);
  }), bulkActionsMarkup);
  const emptySearchStateMarkup = showEmptySearchState ? emptySearchState || /*#__PURE__*/React.createElement("div", {
    className: styles.EmptySearchResultWrapper
  }, /*#__PURE__*/React.createElement(EmptySearchResult, Object.assign({}, emptySearchResultText, {
    withIllustration: true
  }))) : null;
  const emptyStateMarkup = showEmptyState ? emptyState : null;
  const defaultTopPadding = 8;
  const topPadding = loadingPosition > 0 ? loadingPosition : defaultTopPadding;
  const spinnerStyle = {
    paddingTop: `${topPadding}px`
  };
  const spinnerSize = items.length < 2 ? 'small' : 'large';
  const loadingOverlay = loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
    className: styles.SpinnerContainer,
    style: spinnerStyle
  }, /*#__PURE__*/React.createElement(Spinner, {
    size: spinnerSize,
    accessibilityLabel: "Items are loading"
  })), /*#__PURE__*/React.createElement("li", {
    className: styles.LoadingOverlay
  })) : null;
  const className = classNames(styles.ItemWrapper, loading && styles['ItemWrapper-isLoading']);
  const loadingWithoutItemsMarkup = loading && !itemsExist ? /*#__PURE__*/React.createElement("div", {
    className: className,
    tabIndex: -1
  }, loadingOverlay) : null;
  const resourceListClassName = classNames(styles.ResourceList, loading && styles.disabledPointerEvents, selectMode && styles.disableTextSelection);
  const listMarkup = itemsExist ? /*#__PURE__*/React.createElement("ul", {
    className: resourceListClassName,
    ref: listRef,
    "aria-live": "polite",
    "aria-busy": loading
  }, loadingOverlay, Children.toArray(items.map(renderItemWithId))) : null; // This is probably a legit error but I don't have the time to refactor this
  // eslint-disable-next-line react/jsx-no-constructed-context-values

  const context = {
    selectable: isSelectable,
    selectedItems,
    selectMode,
    resourceName,
    loading,
    onSelectionChange: handleSelectionChange
  };
  const resourceListWrapperClasses = classNames(styles.ResourceListWrapper, Boolean(bulkActionsMarkup) && selectMode && styles.ResourceListWrapperWithBulkActions);
  return /*#__PURE__*/React.createElement(ResourceListContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(EventListener, {
    event: "resize",
    handler: handleResize
  }), /*#__PURE__*/React.createElement("div", {
    className: resourceListWrapperClasses,
    ref: tableMeasurerRef
  }, filterControlMarkup, headerMarkup, listMarkup, emptySearchStateMarkup, emptyStateMarkup, loadingWithoutItemsMarkup), /*#__PURE__*/React.createElement("div", {
    ref: bulkActionsIntersectionRef
  }));
};
ResourceList.Item = ResourceItem;

export { ResourceList };
