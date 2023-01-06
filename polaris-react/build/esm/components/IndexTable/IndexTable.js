import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { SortAscendingMajor, SortDescendingMajor } from '@shopify/polaris-icons';
import { CSSTransition } from 'react-transition-group';
import { toPx, tokens, motion } from '@shopify/polaris-tokens';
import { debounce } from '../../utilities/debounce.js';
import { useToggle } from '../../utilities/use-toggle.js';
import { classNames } from '../../utilities/css.js';
import styles from './IndexTable.scss.js';
import { IndexProvider } from '../IndexProvider/IndexProvider.js';
import { Cell } from './components/Cell/Cell.js';
import { Row } from './components/Row/Row.js';
import { useIsBulkActionsSticky } from '../BulkActions/hooks/use-is-bulk-actions-sticky.js';
import { SELECT_ALL_ITEMS, SelectionType } from '../../utilities/index-provider/types.js';
import { getTableHeadingsBySelector } from './utilities/utilities.js';
import { EmptySearchResult } from '../EmptySearchResult/EmptySearchResult.js';
import { ScrollContainer } from './components/ScrollContainer/ScrollContainer.js';
import { BulkActions } from '../BulkActions/BulkActions.js';
import { SelectAllActions } from '../SelectAllActions/SelectAllActions.js';
import { useIndexValue, useIndexSelectionChange } from '../../utilities/index-provider/hooks.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Stack } from '../Stack/Stack.js';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { Spinner } from '../Spinner/Spinner.js';
import { AfterInitialMount } from '../AfterInitialMount/AfterInitialMount.js';
import { EventListener } from '../EventListener/EventListener.js';
import { Badge } from '../Badge/Badge.js';
import { Text } from '../Text/Text.js';
import { UnstyledButton } from '../UnstyledButton/UnstyledButton.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { Sticky } from '../Sticky/Sticky.js';

const SCROLL_BAR_PADDING = 4;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;

function IndexTableBase({
  headings,
  bulkActions = [],
  promotedBulkActions = [],
  children,
  emptyState,
  sort,
  paginatedSelectAllActionText,
  lastColumnSticky = false,
  sortable,
  sortDirection,
  defaultSortDirection = 'descending',
  sortColumnIndex,
  onSort,
  sortToggleLabels,
  ...restProps
}) {
  const {
    loading,
    bulkSelectState,
    resourceName,
    bulkActionsAccessibilityLabel,
    selectMode,
    selectable = restProps.selectable,
    paginatedSelectAllText,
    itemCount,
    hasMoreItems,
    selectedItemsCount,
    condensed
  } = useIndexValue();
  const handleSelectionChange = useIndexSelectionChange();
  const i18n = useI18n();
  const {
    value: hasMoreLeftColumns,
    toggle: toggleHasMoreLeftColumns
  } = useToggle(false);
  const tablePosition = useRef({
    top: 0,
    left: 0
  });
  const tableHeadingRects = useRef([]);
  const scrollableContainerElement = useRef(null);
  const tableElement = useRef(null);
  const condensedListElement = useRef(null);
  const loadingElement = useRef(null);
  const [tableInitialized, setTableInitialized] = useState(false);
  const [stickyWrapper, setStickyWrapper] = useState(null);
  const [hideScrollContainer, setHideScrollContainer] = useState(false);
  const tableHeadings = useRef([]);
  const stickyTableHeadings = useRef([]);
  const stickyHeaderWrapperElement = useRef(null);
  const firstStickyHeaderElement = useRef(null);
  const stickyHeaderElement = useRef(null);
  const scrollBarElement = useRef(null);
  const scrollContainerElement = useRef(null);
  const scrollingWithBar = useRef(false);
  const scrollingContainer = useRef(false);
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
  }, [computeTableDimensions, itemCount]);
  const tableBodyRef = useCallback(node => {
    if (node !== null && !tableInitialized) {
      setTableInitialized(true);
    }
  }, [tableInitialized]);
  const handleSelectAllItemsInStore = useCallback(() => {
    handleSelectionChange(selectedItemsCount === SELECT_ALL_ITEMS ? SelectionType.Page : SelectionType.All, true);
  }, [handleSelectionChange, selectedItemsCount]);
  const calculateFirstHeaderOffset = useCallback(() => {
    if (!selectable) {
      return tableHeadingRects.current[0].offsetWidth;
    }

    return condensed ? tableHeadingRects.current[0].offsetWidth : tableHeadingRects.current[0].offsetWidth + tableHeadingRects.current[1].offsetWidth;
  }, [condensed, selectable]);
  const resizeTableHeadings = useMemo(() => debounce(() => {
    if (!tableElement.current || !scrollableContainerElement.current) {
      return;
    }

    const boundingRect = scrollableContainerElement.current.getBoundingClientRect();
    tablePosition.current = {
      top: boundingRect.top,
      left: boundingRect.left
    };
    tableHeadingRects.current = tableHeadings.current.map(heading => ({
      offsetWidth: heading.offsetWidth || 0,
      offsetLeft: heading.offsetLeft || 0
    }));

    if (tableHeadings.current.length === 0) {
      return;
    } // update left offset for first column


    if (selectable && tableHeadings.current.length > 1) tableHeadings.current[1].style.left = `${tableHeadingRects.current[0].offsetWidth}px`; // update the min width of the checkbox to be the be the un-padded width of the first heading

    if (selectable && firstStickyHeaderElement !== null && firstStickyHeaderElement !== void 0 && firstStickyHeaderElement.current) {
      const elementStyle = getComputedStyle(tableHeadings.current[0]);
      const boxWidth = tableHeadings.current[0].offsetWidth;
      firstStickyHeaderElement.current.style.minWidth = `calc(${boxWidth}px - ${elementStyle.paddingLeft} - ${elementStyle.paddingRight} + 2px)`;
    } // update sticky header min-widths


    stickyTableHeadings.current.forEach((heading, index) => {
      let minWidth = 0;

      if (index === 0 && (!isBreakpointsXS() || !selectable)) {
        minWidth = calculateFirstHeaderOffset();
      } else if (selectable && tableHeadingRects.current.length > index) {
        var _tableHeadingRects$cu;

        minWidth = ((_tableHeadingRects$cu = tableHeadingRects.current[index]) === null || _tableHeadingRects$cu === void 0 ? void 0 : _tableHeadingRects$cu.offsetWidth) || 0;
      } else if (!selectable && tableHeadingRects.current.length >= index) {
        var _tableHeadingRects$cu2;

        minWidth = ((_tableHeadingRects$cu2 = tableHeadingRects.current[index - 1]) === null || _tableHeadingRects$cu2 === void 0 ? void 0 : _tableHeadingRects$cu2.offsetWidth) || 0;
      }

      heading.style.minWidth = `${minWidth}px`;
    });
  }), [calculateFirstHeaderOffset, selectable]);
  const resizeTableScrollBar = useCallback(() => {
    if (scrollBarElement.current && tableElement.current && tableInitialized) {
      var _scrollContainerEleme, _tableElement$current;

      scrollBarElement.current.style.setProperty('--pc-index-table-scroll-bar-content-width', `${tableElement.current.offsetWidth - SCROLL_BAR_PADDING}px`);
      setHideScrollContainer(((_scrollContainerEleme = scrollContainerElement.current) === null || _scrollContainerEleme === void 0 ? void 0 : _scrollContainerEleme.offsetWidth) === ((_tableElement$current = tableElement.current) === null || _tableElement$current === void 0 ? void 0 : _tableElement$current.offsetWidth));
    }
  }, [tableInitialized]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const debounceResizeTableScrollbar = useCallback(debounce(resizeTableScrollBar, SCROLL_BAR_DEBOUNCE_PERIOD, {
    trailing: true
  }), [resizeTableScrollBar]);
  const [canScrollRight, setCanScrollRight] = useState(true); // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleCanScrollRight = useCallback(debounce(() => {
    if (!lastColumnSticky || !tableElement.current || !scrollableContainerElement.current) {
      return;
    }

    const tableRect = tableElement.current.getBoundingClientRect();
    const scrollableRect = scrollableContainerElement.current.getBoundingClientRect();
    setCanScrollRight(tableRect.width > scrollableRect.width);
  }), [lastColumnSticky]);
  useEffect(() => {
    handleCanScrollRight();
  }, [handleCanScrollRight]);
  const [canFitStickyColumn, setCanFitStickyColumn] = useState(true);
  const handleCanFitStickyColumn = useCallback(() => {
    if (!scrollableContainerElement.current || !tableHeadings.current.length) {
      return;
    }

    const scrollableRect = scrollableContainerElement.current.getBoundingClientRect();
    const checkboxColumnWidth = selectable ? tableHeadings.current[0].getBoundingClientRect().width : 0;
    const firstStickyColumnWidth = tableHeadings.current[selectable ? 1 : 0].getBoundingClientRect().width;
    const lastColumnIsNotTheFirst = selectable ? tableHeadings.current.length > 2 : 1; // Don't consider the last column in the calculations if it's not sticky

    const lastStickyColumnWidth = lastColumnSticky && lastColumnIsNotTheFirst ? tableHeadings.current[tableHeadings.current.length - 1].getBoundingClientRect().width : 0; // Secure some space for the remaining columns to be visible

    const restOfContentMinWidth = 100;
    setCanFitStickyColumn(scrollableRect.width > firstStickyColumnWidth + checkboxColumnWidth + lastStickyColumnWidth + restOfContentMinWidth);
  }, [lastColumnSticky, selectable]);
  useEffect(() => {
    if (tableInitialized) {
      handleCanFitStickyColumn();
    }
  }, [handleCanFitStickyColumn, tableInitialized]);
  const handleResize = useCallback(() => {
    var _scrollBarElement$cur;

    // hide the scrollbar when resizing
    (_scrollBarElement$cur = scrollBarElement.current) === null || _scrollBarElement$cur === void 0 ? void 0 : _scrollBarElement$cur.style.setProperty('--pc-index-table-scroll-bar-content-width', `0px`);
    resizeTableHeadings();
    debounceResizeTableScrollbar();
    handleCanScrollRight();
    handleCanFitStickyColumn();
  }, [resizeTableHeadings, debounceResizeTableScrollbar, handleCanScrollRight, handleCanFitStickyColumn]);
  const handleScrollContainerScroll = useCallback((canScrollLeft, canScrollRight) => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }

    if (!scrollingWithBar.current) {
      scrollingContainer.current = true;
      scrollBarElement.current.scrollLeft = scrollableContainerElement.current.scrollLeft;
    }

    scrollingWithBar.current = false;

    if (stickyHeaderElement.current) {
      stickyHeaderElement.current.scrollLeft = scrollableContainerElement.current.scrollLeft;
    }

    if (canScrollLeft && !hasMoreLeftColumns || !canScrollLeft && hasMoreLeftColumns) {
      toggleHasMoreLeftColumns();
    }

    setCanScrollRight(canScrollRight);
  }, [hasMoreLeftColumns, toggleHasMoreLeftColumns]);
  const handleScrollBarScroll = useCallback(() => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }

    if (!scrollingContainer.current) {
      scrollingWithBar.current = true;
      scrollableContainerElement.current.scrollLeft = scrollBarElement.current.scrollLeft;
    }

    scrollingContainer.current = false;
  }, []);
  useEffect(() => {
    tableHeadings.current = getTableHeadingsBySelector(tableElement.current, '[data-index-table-heading]');
    stickyTableHeadings.current = getTableHeadingsBySelector(stickyHeaderWrapperElement.current, '[data-index-table-sticky-heading]');
    resizeTableHeadings();
  }, [headings, resizeTableHeadings, firstStickyHeaderElement, tableInitialized]);
  useEffect(() => {
    resizeTableScrollBar();
    setStickyWrapper(condensed ? condensedListElement.current : tableElement.current);
  }, [tableInitialized, resizeTableScrollBar, condensed]);
  const hasBulkActions = Boolean(promotedBulkActions && promotedBulkActions.length > 0 || bulkActions && bulkActions.length > 0);
  const headingsMarkup = headings.map(renderHeading).reduce((acc, heading) => acc.concat(heading), []);
  const bulkActionsSelectable = Boolean(promotedBulkActions.length > 0 || bulkActions.length > 0);
  const stickyColumnHeaderStyle = tableHeadingRects.current && tableHeadingRects.current.length > 0 ? {
    minWidth: calculateFirstHeaderOffset()
  } : undefined;
  const stickyColumnHeader = /*#__PURE__*/React.createElement("div", {
    className: styles.TableHeading,
    key: getHeadingKey(headings[0]),
    style: stickyColumnHeaderStyle,
    "data-index-table-sticky-heading": true
  }, /*#__PURE__*/React.createElement(Stack, {
    spacing: "none",
    wrap: false,
    alignment: "center"
  }, selectable && /*#__PURE__*/React.createElement("div", {
    className: styles.FirstStickyHeaderElement,
    ref: firstStickyHeaderElement
  }, renderCheckboxContent()), selectable && /*#__PURE__*/React.createElement("div", {
    className: styles['StickyTableHeading-second-scrolling']
  }, renderHeadingContent(headings[0], 0)), !selectable && /*#__PURE__*/React.createElement("div", {
    className: styles.FirstStickyHeaderElement,
    ref: firstStickyHeaderElement
  }, renderHeadingContent(headings[0], 0))));
  const stickyHeadingsMarkup = headings.map(renderStickyHeading);
  const selectedItemsCountLabel = selectedItemsCount === SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount;
  const handleTogglePage = useCallback(() => {
    handleSelectionChange(SelectionType.Page, Boolean(!bulkSelectState || bulkSelectState === 'indeterminate'));
  }, [bulkSelectState, handleSelectionChange]);
  const paginatedSelectAllAction = getPaginatedSelectAllAction();
  const loadingTransitionClassNames = {
    enter: styles['LoadingContainer-enter'],
    enterActive: styles['LoadingContainer-enter-active'],
    exit: styles['LoadingContainer-exit'],
    exitActive: styles['LoadingContainer-exit-active']
  };
  const loadingMarkup = /*#__PURE__*/React.createElement(CSSTransition, {
    in: loading,
    classNames: loadingTransitionClassNames,
    timeout: parseInt(motion['duration-100'], 10),
    nodeRef: loadingElement,
    appear: true,
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.LoadingPanel,
    ref: loadingElement
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.LoadingPanelRow
  }, /*#__PURE__*/React.createElement(Spinner, {
    size: "small"
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.LoadingPanelText
  }, i18n.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
    resourceNamePlural: resourceName.plural.toLocaleLowerCase()
  })))));
  const stickyTableClassNames = classNames(styles.StickyTable, condensed && styles['StickyTable-condensed']);
  const shouldShowBulkActions = bulkActionsSelectable && selectedItemsCount;
  const bulkActionClassNames = classNames(styles.BulkActionsWrapper, isBulkActionsSticky && styles.BulkActionsWrapperSticky);
  const shouldShowActions = !condensed || selectedItemsCount;
  const promotedActions = shouldShowActions ? promotedBulkActions : [];
  const actions = shouldShowActions ? bulkActions : [];
  const bulkActionsMarkup = shouldShowBulkActions && !condensed ? /*#__PURE__*/React.createElement("div", {
    className: bulkActionClassNames,
    style: {
      insetBlockStart: isBulkActionsSticky ? undefined : bulkActionsAbsoluteOffset,
      width: bulkActionsMaxWidth,
      insetInlineStart: isBulkActionsSticky ? bulkActionsOffsetLeft : undefined
    }
  }, /*#__PURE__*/React.createElement(BulkActions, {
    selectMode: selectMode,
    promotedActions: promotedActions,
    actions: actions,
    onSelectModeToggle: condensed ? handleSelectModeToggle : undefined,
    isSticky: isBulkActionsSticky,
    width: bulkActionsMaxWidth
  })) : null;
  const stickyHeaderMarkup = /*#__PURE__*/React.createElement("div", {
    className: stickyTableClassNames,
    role: "presentation"
  }, /*#__PURE__*/React.createElement(Sticky, {
    boundingElement: stickyWrapper
  }, isSticky => {
    const stickyHeaderClassNames = classNames(styles.StickyTableHeader, isSticky && styles['StickyTableHeader-isSticky']);
    const selectAllActionsClassName = classNames(styles.SelectAllActionsWrapper, condensed && styles['StickyTableHeader-condensed'], isSticky && styles['StickyTableHeader-isSticky']);
    const selectAllActionsMarkup = shouldShowBulkActions && !condensed ? /*#__PURE__*/React.createElement("div", {
      className: selectAllActionsClassName
    }, /*#__PURE__*/React.createElement(SelectAllActions, {
      label: i18n.translate('Polaris.IndexTable.selected', {
        selectedItemsCount: selectedItemsCountLabel
      }),
      accessibilityLabel: bulkActionsAccessibilityLabel,
      selected: bulkSelectState,
      selectMode: selectMode,
      onToggleAll: handleTogglePage,
      paginatedSelectAllText: paginatedSelectAllText,
      paginatedSelectAllAction: paginatedSelectAllAction
    }), loadingMarkup) : null;
    const headerMarkup = condensed ? /*#__PURE__*/React.createElement("div", {
      className: classNames(styles.HeaderWrapper, (!selectable || condensed) && styles.unselectable)
    }, loadingMarkup, sort) : /*#__PURE__*/React.createElement("div", {
      className: stickyHeaderClassNames,
      ref: stickyHeaderWrapperElement
    }, loadingMarkup, /*#__PURE__*/React.createElement("div", {
      className: styles.StickyTableColumnHeader
    }, stickyColumnHeader), /*#__PURE__*/React.createElement("div", {
      className: styles.StickyTableHeadings,
      ref: stickyHeaderElement
    }, stickyHeadingsMarkup));
    const stickyContent = selectAllActionsMarkup !== null && selectAllActionsMarkup !== void 0 ? selectAllActionsMarkup : headerMarkup;
    return stickyContent;
  }), bulkActionsMarkup);
  const scrollBarWrapperClassNames = classNames(styles.ScrollBarContainer, condensed && styles.scrollBarContainerCondensed, hideScrollContainer && styles.scrollBarContainerHidden);
  const scrollBarClassNames = classNames(tableElement.current && tableInitialized && styles.ScrollBarContent);
  const scrollBarMarkup = itemCount > 0 ? /*#__PURE__*/React.createElement(AfterInitialMount, {
    onMount: resizeTableScrollBar
  }, /*#__PURE__*/React.createElement("div", {
    className: scrollBarWrapperClassNames,
    ref: scrollContainerElement
  }, /*#__PURE__*/React.createElement("div", {
    onScroll: handleScrollBarScroll,
    className: styles.ScrollBar,
    ref: scrollBarElement
  }, /*#__PURE__*/React.createElement("div", {
    className: scrollBarClassNames
  })))) : null;
  const isSortable = sortable === null || sortable === void 0 ? void 0 : sortable.some(value => value);
  const tableClassNames = classNames(styles.Table, hasMoreLeftColumns && styles['Table-scrolling'], selectMode && styles.disableTextSelection, selectMode && shouldShowBulkActions && styles.selectMode, !selectable && styles['Table-unselectable'], canFitStickyColumn && styles['Table-sticky'], isSortable && styles['Table-sortable'], canFitStickyColumn && lastColumnSticky && styles['Table-sticky-last'], canFitStickyColumn && lastColumnSticky && canScrollRight && styles['Table-sticky-scrolling']);
  const emptyStateMarkup = emptyState ? emptyState : /*#__PURE__*/React.createElement(EmptySearchResult, {
    title: i18n.translate('Polaris.IndexTable.emptySearchTitle', {
      resourceNamePlural: resourceName.plural
    }),
    description: i18n.translate('Polaris.IndexTable.emptySearchDescription'),
    withIllustration: true
  });
  const sharedMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EventListener, {
    event: "resize",
    handler: handleResize
  }), /*#__PURE__*/React.createElement(AfterInitialMount, null, stickyHeaderMarkup));
  const bodyMarkup = condensed ? /*#__PURE__*/React.createElement(React.Fragment, null, sharedMarkup, /*#__PURE__*/React.createElement("ul", {
    "data-selectmode": Boolean(selectMode),
    className: styles.CondensedList,
    ref: condensedListElement
  }, children)) : /*#__PURE__*/React.createElement(React.Fragment, null, sharedMarkup, /*#__PURE__*/React.createElement(ScrollContainer, {
    scrollableContainerRef: scrollableContainerElement,
    onScroll: handleScrollContainerScroll
  }, /*#__PURE__*/React.createElement("table", {
    ref: tableElement,
    className: tableClassNames
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: styles.HeadingRow
  }, headingsMarkup)), /*#__PURE__*/React.createElement("tbody", {
    ref: tableBodyRef
  }, children))));
  const tableContentMarkup = itemCount > 0 ? bodyMarkup : /*#__PURE__*/React.createElement("div", {
    className: styles.EmptySearchResultWrapper
  }, emptyStateMarkup);
  const tableWrapperClassNames = classNames(styles.IndexTableWrapper, Boolean(bulkActionsMarkup) && selectMode && styles.IndexTableWrapperWithBulkActions);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.IndexTable
  }, /*#__PURE__*/React.createElement("div", {
    className: tableWrapperClassNames,
    ref: tableMeasurerRef
  }, !shouldShowBulkActions && !condensed && loadingMarkup, tableContentMarkup), /*#__PURE__*/React.createElement("div", {
    ref: bulkActionsIntersectionRef
  })), scrollBarMarkup);

  function renderHeading(heading, index) {
    const isSecond = index === 0;
    const isLast = index === headings.length - 1;
    const hasSortable = sortable === null || sortable === void 0 ? void 0 : sortable.some(value => value === true);
    const headingContentClassName = classNames(styles.TableHeading, hasSortable && styles['TableHeading-sortable'], isSecond && styles['TableHeading-second'], isLast && !heading.hidden && styles['TableHeading-last'], !selectable && styles['TableHeading-unselectable'], heading.flush && styles['TableHeading-flush']);
    const stickyPositioningStyle = selectable !== false && isSecond && tableHeadingRects.current && tableHeadingRects.current.length > 0 ? {
      left: tableHeadingRects.current[0].offsetWidth
    } : undefined;
    const headingContent = /*#__PURE__*/React.createElement("th", {
      className: headingContentClassName,
      key: getHeadingKey(heading),
      "data-index-table-heading": true,
      style: stickyPositioningStyle
    }, renderHeadingContent(heading, index));

    if (index !== 0 || !selectable) {
      return headingContent;
    }

    const checkboxClassName = classNames(styles.TableHeading, hasSortable && styles['TableHeading-sortable'], index === 0 && styles['TableHeading-first']);
    const checkboxContent = /*#__PURE__*/React.createElement("th", {
      className: checkboxClassName,
      key: `${heading}-${index}`,
      "data-index-table-heading": true
    }, renderCheckboxContent());
    return [checkboxContent, headingContent];
  }

  function renderCheckboxContent() {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.ColumnHeaderCheckboxWrapper
    }, /*#__PURE__*/React.createElement(Checkbox, {
      label: i18n.translate('Polaris.IndexTable.selectAllLabel', {
        resourceNamePlural: resourceName.plural
      }),
      labelHidden: true,
      onChange: handleSelectPage,
      checked: bulkSelectState
    }));
  }

  function handleSortHeadingClick(index, direction) {
    onSort === null || onSort === void 0 ? void 0 : onSort(index, direction);
  }

  function renderHeadingContent(heading, index) {
    let headingContent;

    if (heading.new) {
      headingContent = /*#__PURE__*/React.createElement(Stack, {
        wrap: false,
        alignment: "center"
      }, /*#__PURE__*/React.createElement("span", null, heading.title), /*#__PURE__*/React.createElement(Badge, {
        status: "new"
      }, i18n.translate('Polaris.IndexTable.onboardingBadgeText')));
    } else if (heading.hidden) {
      headingContent = /*#__PURE__*/React.createElement(Text, {
        variant: "bodySm",
        as: "span",
        visuallyHidden: true
      }, heading.title);
    } else {
      headingContent = heading.title;
    }

    if (sortable !== null && sortable !== void 0 && sortable[index]) {
      const isCurrentlySorted = index === sortColumnIndex;
      const isAscending = sortDirection === 'ascending';
      let newDirection = defaultSortDirection;
      let SourceComponent = defaultSortDirection === 'ascending' ? SortAscendingMajor : SortDescendingMajor;

      if (isCurrentlySorted) {
        newDirection = isAscending ? 'descending' : 'ascending';
        SourceComponent = sortDirection === 'ascending' ? SortAscendingMajor : SortDescendingMajor;
      }

      const iconMarkup = /*#__PURE__*/React.createElement("span", {
        className: classNames(styles.TableHeadingSortIcon, isCurrentlySorted && styles['TableHeadingSortIcon-visible'])
      }, /*#__PURE__*/React.createElement(SourceComponent, {
        focusable: "false",
        "aria-hidden": "true",
        className: styles.TableHeadingSortSvg
      }));
      const sortMarkup = /*#__PURE__*/React.createElement(UnstyledButton, {
        onClick: () => handleSortHeadingClick(index, newDirection),
        className: styles.TableHeadingSortButton,
        tabIndex: selectMode ? -1 : 0
      }, iconMarkup, headingContent);

      if (!sortToggleLabels || selectMode) {
        return sortMarkup;
      }

      const tooltipDirection = isCurrentlySorted ? sortDirection : defaultSortDirection;
      const tooltipContent = sortToggleLabels[index][tooltipDirection];
      return /*#__PURE__*/React.createElement(Tooltip, {
        content: tooltipContent
      }, sortMarkup);
    }

    return headingContent;
  }

  function handleSelectPage(checked) {
    handleSelectionChange(SelectionType.Page, checked);
  }

  function renderStickyHeading(heading, index) {
    const position = index + 1;
    const headingStyle = tableHeadingRects.current && tableHeadingRects.current.length > position ? {
      minWidth: tableHeadingRects.current[position].offsetWidth
    } : undefined;
    const headingContent = renderHeadingContent(heading, index);
    const stickyHeadingClassName = classNames(styles.TableHeading, index === 0 && styles['StickyTableHeading-second'], index === 0 && !selectable && styles.unselectable);
    return /*#__PURE__*/React.createElement("div", {
      className: stickyHeadingClassName,
      key: getHeadingKey(heading),
      style: headingStyle,
      "data-index-table-sticky-heading": true
    }, headingContent);
  }

  function getPaginatedSelectAllAction() {
    if (!selectable || !hasBulkActions || !hasMoreItems) {
      return;
    }

    const customActionText = paginatedSelectAllActionText !== null && paginatedSelectAllActionText !== void 0 ? paginatedSelectAllActionText : i18n.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: itemCount,
      resourceNamePlural: resourceName.plural.toLocaleLowerCase()
    });
    const actionText = selectedItemsCount === SELECT_ALL_ITEMS ? i18n.translate('Polaris.IndexTable.undo') : customActionText;
    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore
    };
  }

  function handleSelectModeToggle() {
    handleSelectionChange(SelectionType.All, false);
  }
}

const isBreakpointsXS = () => {
  var _toPx;

  return typeof window === 'undefined' ? false : window.innerWidth < parseFloat((_toPx = toPx(tokens.breakpoints['breakpoints-sm'])) !== null && _toPx !== void 0 ? _toPx : '');
};

function getHeadingKey(heading) {
  if ('id' in heading && heading.id) {
    return heading.id;
  }

  if (typeof heading.title === 'string') {
    return heading.title;
  }

  return '';
}

function IndexTable({
  children,
  selectable = true,
  itemCount,
  selectedItemsCount = 0,
  resourceName: passedResourceName,
  loading,
  hasMoreItems,
  condensed,
  onSelectionChange,
  ...indexTableBaseProps
}) {
  return /*#__PURE__*/React.createElement(IndexProvider, {
    selectable: selectable,
    itemCount: itemCount,
    selectedItemsCount: selectedItemsCount,
    resourceName: passedResourceName,
    loading: loading,
    hasMoreItems: hasMoreItems,
    condensed: condensed,
    onSelectionChange: onSelectionChange
  }, /*#__PURE__*/React.createElement(IndexTableBase, indexTableBaseProps, children));
}
IndexTable.Cell = Cell;
IndexTable.Row = Row;

export { IndexTable };
