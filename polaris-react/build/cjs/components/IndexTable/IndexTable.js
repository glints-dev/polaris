'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var reactTransitionGroup = require('react-transition-group');
var polarisTokens = require('@shopify/polaris-tokens');
var debounce = require('../../utilities/debounce.js');
var useToggle = require('../../utilities/use-toggle.js');
var css = require('../../utilities/css.js');
var IndexTable$1 = require('./IndexTable.scss.js');
var IndexProvider = require('../IndexProvider/IndexProvider.js');
var Cell = require('./components/Cell/Cell.js');
var Row = require('./components/Row/Row.js');
var useIsBulkActionsSticky = require('../BulkActions/hooks/use-is-bulk-actions-sticky.js');
var types = require('../../utilities/index-provider/types.js');
var utilities = require('./utilities/utilities.js');
var EmptySearchResult = require('../EmptySearchResult/EmptySearchResult.js');
var ScrollContainer = require('./components/ScrollContainer/ScrollContainer.js');
var BulkActions = require('../BulkActions/BulkActions.js');
var SelectAllActions = require('../SelectAllActions/SelectAllActions.js');
var hooks = require('../../utilities/index-provider/hooks.js');
var hooks$1 = require('../../utilities/i18n/hooks.js');
var Stack = require('../Stack/Stack.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var Spinner = require('../Spinner/Spinner.js');
var AfterInitialMount = require('../AfterInitialMount/AfterInitialMount.js');
var EventListener = require('../EventListener/EventListener.js');
var Badge = require('../Badge/Badge.js');
var Text = require('../Text/Text.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');
var Tooltip = require('../Tooltip/Tooltip.js');
var Sticky = require('../Sticky/Sticky.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  } = hooks.useIndexValue();
  const handleSelectionChange = hooks.useIndexSelectionChange();
  const i18n = hooks$1.useI18n();
  const {
    value: hasMoreLeftColumns,
    toggle: toggleHasMoreLeftColumns
  } = useToggle.useToggle(false);
  const tablePosition = React.useRef({
    top: 0,
    left: 0
  });
  const tableHeadingRects = React.useRef([]);
  const scrollableContainerElement = React.useRef(null);
  const tableElement = React.useRef(null);
  const condensedListElement = React.useRef(null);
  const loadingElement = React.useRef(null);
  const [tableInitialized, setTableInitialized] = React.useState(false);
  const [stickyWrapper, setStickyWrapper] = React.useState(null);
  const [hideScrollContainer, setHideScrollContainer] = React.useState(false);
  const tableHeadings = React.useRef([]);
  const stickyTableHeadings = React.useRef([]);
  const stickyHeaderWrapperElement = React.useRef(null);
  const firstStickyHeaderElement = React.useRef(null);
  const stickyHeaderElement = React.useRef(null);
  const scrollBarElement = React.useRef(null);
  const scrollContainerElement = React.useRef(null);
  const scrollingWithBar = React.useRef(false);
  const scrollingContainer = React.useRef(false);
  const {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
    computeTableDimensions
  } = useIsBulkActionsSticky.useIsBulkActionsSticky(selectMode);
  React.useEffect(() => {
    computeTableDimensions();
  }, [computeTableDimensions, itemCount]);
  const tableBodyRef = React.useCallback(node => {
    if (node !== null && !tableInitialized) {
      setTableInitialized(true);
    }
  }, [tableInitialized]);
  const handleSelectAllItemsInStore = React.useCallback(() => {
    handleSelectionChange(selectedItemsCount === types.SELECT_ALL_ITEMS ? types.SelectionType.Page : types.SelectionType.All, true);
  }, [handleSelectionChange, selectedItemsCount]);
  const calculateFirstHeaderOffset = React.useCallback(() => {
    if (!selectable) {
      return tableHeadingRects.current[0].offsetWidth;
    }

    return condensed ? tableHeadingRects.current[0].offsetWidth : tableHeadingRects.current[0].offsetWidth + tableHeadingRects.current[1].offsetWidth;
  }, [condensed, selectable]);
  const resizeTableHeadings = React.useMemo(() => debounce.debounce(() => {
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
  const resizeTableScrollBar = React.useCallback(() => {
    if (scrollBarElement.current && tableElement.current && tableInitialized) {
      var _scrollContainerEleme, _tableElement$current;

      scrollBarElement.current.style.setProperty('--pc-index-table-scroll-bar-content-width', `${tableElement.current.offsetWidth - SCROLL_BAR_PADDING}px`);
      setHideScrollContainer(((_scrollContainerEleme = scrollContainerElement.current) === null || _scrollContainerEleme === void 0 ? void 0 : _scrollContainerEleme.offsetWidth) === ((_tableElement$current = tableElement.current) === null || _tableElement$current === void 0 ? void 0 : _tableElement$current.offsetWidth));
    }
  }, [tableInitialized]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const debounceResizeTableScrollbar = React.useCallback(debounce.debounce(resizeTableScrollBar, SCROLL_BAR_DEBOUNCE_PERIOD, {
    trailing: true
  }), [resizeTableScrollBar]);
  const [canScrollRight, setCanScrollRight] = React.useState(true); // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleCanScrollRight = React.useCallback(debounce.debounce(() => {
    if (!lastColumnSticky || !tableElement.current || !scrollableContainerElement.current) {
      return;
    }

    const tableRect = tableElement.current.getBoundingClientRect();
    const scrollableRect = scrollableContainerElement.current.getBoundingClientRect();
    setCanScrollRight(tableRect.width > scrollableRect.width);
  }), [lastColumnSticky]);
  React.useEffect(() => {
    handleCanScrollRight();
  }, [handleCanScrollRight]);
  const [canFitStickyColumn, setCanFitStickyColumn] = React.useState(true);
  const handleCanFitStickyColumn = React.useCallback(() => {
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
  React.useEffect(() => {
    if (tableInitialized) {
      handleCanFitStickyColumn();
    }
  }, [handleCanFitStickyColumn, tableInitialized]);
  const handleResize = React.useCallback(() => {
    var _scrollBarElement$cur;

    // hide the scrollbar when resizing
    (_scrollBarElement$cur = scrollBarElement.current) === null || _scrollBarElement$cur === void 0 ? void 0 : _scrollBarElement$cur.style.setProperty('--pc-index-table-scroll-bar-content-width', `0px`);
    resizeTableHeadings();
    debounceResizeTableScrollbar();
    handleCanScrollRight();
    handleCanFitStickyColumn();
  }, [resizeTableHeadings, debounceResizeTableScrollbar, handleCanScrollRight, handleCanFitStickyColumn]);
  const handleScrollContainerScroll = React.useCallback((canScrollLeft, canScrollRight) => {
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
  const handleScrollBarScroll = React.useCallback(() => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }

    if (!scrollingContainer.current) {
      scrollingWithBar.current = true;
      scrollableContainerElement.current.scrollLeft = scrollBarElement.current.scrollLeft;
    }

    scrollingContainer.current = false;
  }, []);
  React.useEffect(() => {
    tableHeadings.current = utilities.getTableHeadingsBySelector(tableElement.current, '[data-index-table-heading]');
    stickyTableHeadings.current = utilities.getTableHeadingsBySelector(stickyHeaderWrapperElement.current, '[data-index-table-sticky-heading]');
    resizeTableHeadings();
  }, [headings, resizeTableHeadings, firstStickyHeaderElement, tableInitialized]);
  React.useEffect(() => {
    resizeTableScrollBar();
    setStickyWrapper(condensed ? condensedListElement.current : tableElement.current);
  }, [tableInitialized, resizeTableScrollBar, condensed]);
  const hasBulkActions = Boolean(promotedBulkActions && promotedBulkActions.length > 0 || bulkActions && bulkActions.length > 0);
  const headingsMarkup = headings.map(renderHeading).reduce((acc, heading) => acc.concat(heading), []);
  const bulkActionsSelectable = Boolean(promotedBulkActions.length > 0 || bulkActions.length > 0);
  const stickyColumnHeaderStyle = tableHeadingRects.current && tableHeadingRects.current.length > 0 ? {
    minWidth: calculateFirstHeaderOffset()
  } : undefined;
  const stickyColumnHeader = /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"].TableHeading,
    key: getHeadingKey(headings[0]),
    style: stickyColumnHeaderStyle,
    "data-index-table-sticky-heading": true
  }, /*#__PURE__*/React__default["default"].createElement(Stack.Stack, {
    spacing: "none",
    wrap: false,
    alignment: "center"
  }, selectable && /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"].FirstStickyHeaderElement,
    ref: firstStickyHeaderElement
  }, renderCheckboxContent()), selectable && /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"]['StickyTableHeading-second-scrolling']
  }, renderHeadingContent(headings[0], 0)), !selectable && /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"].FirstStickyHeaderElement,
    ref: firstStickyHeaderElement
  }, renderHeadingContent(headings[0], 0))));
  const stickyHeadingsMarkup = headings.map(renderStickyHeading);
  const selectedItemsCountLabel = selectedItemsCount === types.SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount;
  const handleTogglePage = React.useCallback(() => {
    handleSelectionChange(types.SelectionType.Page, Boolean(!bulkSelectState || bulkSelectState === 'indeterminate'));
  }, [bulkSelectState, handleSelectionChange]);
  const paginatedSelectAllAction = getPaginatedSelectAllAction();
  const loadingTransitionClassNames = {
    enter: IndexTable$1["default"]['LoadingContainer-enter'],
    enterActive: IndexTable$1["default"]['LoadingContainer-enter-active'],
    exit: IndexTable$1["default"]['LoadingContainer-exit'],
    exitActive: IndexTable$1["default"]['LoadingContainer-exit-active']
  };
  const loadingMarkup = /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.CSSTransition, {
    in: loading,
    classNames: loadingTransitionClassNames,
    timeout: parseInt(polarisTokens.motion['duration-100'], 10),
    nodeRef: loadingElement,
    appear: true,
    unmountOnExit: true
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"].LoadingPanel,
    ref: loadingElement
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"].LoadingPanelRow
  }, /*#__PURE__*/React__default["default"].createElement(Spinner.Spinner, {
    size: "small"
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    className: IndexTable$1["default"].LoadingPanelText
  }, i18n.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
    resourceNamePlural: resourceName.plural.toLocaleLowerCase()
  })))));
  const stickyTableClassNames = css.classNames(IndexTable$1["default"].StickyTable, condensed && IndexTable$1["default"]['StickyTable-condensed']);
  const shouldShowBulkActions = bulkActionsSelectable && selectedItemsCount;
  const bulkActionClassNames = css.classNames(IndexTable$1["default"].BulkActionsWrapper, isBulkActionsSticky && IndexTable$1["default"].BulkActionsWrapperSticky);
  const shouldShowActions = !condensed || selectedItemsCount;
  const promotedActions = shouldShowActions ? promotedBulkActions : [];
  const actions = shouldShowActions ? bulkActions : [];
  const bulkActionsMarkup = shouldShowBulkActions && !condensed ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: bulkActionClassNames,
    style: {
      insetBlockStart: isBulkActionsSticky ? undefined : bulkActionsAbsoluteOffset,
      width: bulkActionsMaxWidth,
      insetInlineStart: isBulkActionsSticky ? bulkActionsOffsetLeft : undefined
    }
  }, /*#__PURE__*/React__default["default"].createElement(BulkActions.BulkActions, {
    selectMode: selectMode,
    promotedActions: promotedActions,
    actions: actions,
    onSelectModeToggle: condensed ? handleSelectModeToggle : undefined,
    isSticky: isBulkActionsSticky,
    width: bulkActionsMaxWidth
  })) : null;
  const stickyHeaderMarkup = /*#__PURE__*/React__default["default"].createElement("div", {
    className: stickyTableClassNames,
    role: "presentation"
  }, /*#__PURE__*/React__default["default"].createElement(Sticky.Sticky, {
    boundingElement: stickyWrapper
  }, isSticky => {
    const stickyHeaderClassNames = css.classNames(IndexTable$1["default"].StickyTableHeader, isSticky && IndexTable$1["default"]['StickyTableHeader-isSticky']);
    const selectAllActionsClassName = css.classNames(IndexTable$1["default"].SelectAllActionsWrapper, condensed && IndexTable$1["default"]['StickyTableHeader-condensed'], isSticky && IndexTable$1["default"]['StickyTableHeader-isSticky']);
    const selectAllActionsMarkup = shouldShowBulkActions && !condensed ? /*#__PURE__*/React__default["default"].createElement("div", {
      className: selectAllActionsClassName
    }, /*#__PURE__*/React__default["default"].createElement(SelectAllActions.SelectAllActions, {
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
    const headerMarkup = condensed ? /*#__PURE__*/React__default["default"].createElement("div", {
      className: css.classNames(IndexTable$1["default"].HeaderWrapper, (!selectable || condensed) && IndexTable$1["default"].unselectable)
    }, loadingMarkup, sort) : /*#__PURE__*/React__default["default"].createElement("div", {
      className: stickyHeaderClassNames,
      ref: stickyHeaderWrapperElement
    }, loadingMarkup, /*#__PURE__*/React__default["default"].createElement("div", {
      className: IndexTable$1["default"].StickyTableColumnHeader
    }, stickyColumnHeader), /*#__PURE__*/React__default["default"].createElement("div", {
      className: IndexTable$1["default"].StickyTableHeadings,
      ref: stickyHeaderElement
    }, stickyHeadingsMarkup));
    const stickyContent = selectAllActionsMarkup !== null && selectAllActionsMarkup !== void 0 ? selectAllActionsMarkup : headerMarkup;
    return stickyContent;
  }), bulkActionsMarkup);
  const scrollBarWrapperClassNames = css.classNames(IndexTable$1["default"].ScrollBarContainer, condensed && IndexTable$1["default"].scrollBarContainerCondensed, hideScrollContainer && IndexTable$1["default"].scrollBarContainerHidden);
  const scrollBarClassNames = css.classNames(tableElement.current && tableInitialized && IndexTable$1["default"].ScrollBarContent);
  const scrollBarMarkup = itemCount > 0 ? /*#__PURE__*/React__default["default"].createElement(AfterInitialMount.AfterInitialMount, {
    onMount: resizeTableScrollBar
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: scrollBarWrapperClassNames,
    ref: scrollContainerElement
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    onScroll: handleScrollBarScroll,
    className: IndexTable$1["default"].ScrollBar,
    ref: scrollBarElement
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: scrollBarClassNames
  })))) : null;
  const isSortable = sortable === null || sortable === void 0 ? void 0 : sortable.some(value => value);
  const tableClassNames = css.classNames(IndexTable$1["default"].Table, hasMoreLeftColumns && IndexTable$1["default"]['Table-scrolling'], selectMode && IndexTable$1["default"].disableTextSelection, selectMode && shouldShowBulkActions && IndexTable$1["default"].selectMode, !selectable && IndexTable$1["default"]['Table-unselectable'], canFitStickyColumn && IndexTable$1["default"]['Table-sticky'], isSortable && IndexTable$1["default"]['Table-sortable'], canFitStickyColumn && lastColumnSticky && IndexTable$1["default"]['Table-sticky-last'], canFitStickyColumn && lastColumnSticky && canScrollRight && IndexTable$1["default"]['Table-sticky-scrolling']);
  const emptyStateMarkup = emptyState ? emptyState : /*#__PURE__*/React__default["default"].createElement(EmptySearchResult.EmptySearchResult, {
    title: i18n.translate('Polaris.IndexTable.emptySearchTitle', {
      resourceNamePlural: resourceName.plural
    }),
    description: i18n.translate('Polaris.IndexTable.emptySearchDescription'),
    withIllustration: true
  });
  const sharedMarkup = /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(EventListener.EventListener, {
    event: "resize",
    handler: handleResize
  }), /*#__PURE__*/React__default["default"].createElement(AfterInitialMount.AfterInitialMount, null, stickyHeaderMarkup));
  const bodyMarkup = condensed ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, sharedMarkup, /*#__PURE__*/React__default["default"].createElement("ul", {
    "data-selectmode": Boolean(selectMode),
    className: IndexTable$1["default"].CondensedList,
    ref: condensedListElement
  }, children)) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, sharedMarkup, /*#__PURE__*/React__default["default"].createElement(ScrollContainer.ScrollContainer, {
    scrollableContainerRef: scrollableContainerElement,
    onScroll: handleScrollContainerScroll
  }, /*#__PURE__*/React__default["default"].createElement("table", {
    ref: tableElement,
    className: tableClassNames
  }, /*#__PURE__*/React__default["default"].createElement("thead", null, /*#__PURE__*/React__default["default"].createElement("tr", {
    className: IndexTable$1["default"].HeadingRow
  }, headingsMarkup)), /*#__PURE__*/React__default["default"].createElement("tbody", {
    ref: tableBodyRef
  }, children))));
  const tableContentMarkup = itemCount > 0 ? bodyMarkup : /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"].EmptySearchResultWrapper
  }, emptyStateMarkup);
  const tableWrapperClassNames = css.classNames(IndexTable$1["default"].IndexTableWrapper, Boolean(bulkActionsMarkup) && selectMode && IndexTable$1["default"].IndexTableWrapperWithBulkActions);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: IndexTable$1["default"].IndexTable
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: tableWrapperClassNames,
    ref: tableMeasurerRef
  }, !shouldShowBulkActions && !condensed && loadingMarkup, tableContentMarkup), /*#__PURE__*/React__default["default"].createElement("div", {
    ref: bulkActionsIntersectionRef
  })), scrollBarMarkup);

  function renderHeading(heading, index) {
    const isSecond = index === 0;
    const isLast = index === headings.length - 1;
    const hasSortable = sortable === null || sortable === void 0 ? void 0 : sortable.some(value => value === true);
    const headingContentClassName = css.classNames(IndexTable$1["default"].TableHeading, hasSortable && IndexTable$1["default"]['TableHeading-sortable'], isSecond && IndexTable$1["default"]['TableHeading-second'], isLast && !heading.hidden && IndexTable$1["default"]['TableHeading-last'], !selectable && IndexTable$1["default"]['TableHeading-unselectable'], heading.flush && IndexTable$1["default"]['TableHeading-flush']);
    const stickyPositioningStyle = selectable !== false && isSecond && tableHeadingRects.current && tableHeadingRects.current.length > 0 ? {
      left: tableHeadingRects.current[0].offsetWidth
    } : undefined;
    const headingContent = /*#__PURE__*/React__default["default"].createElement("th", {
      className: headingContentClassName,
      key: getHeadingKey(heading),
      "data-index-table-heading": true,
      style: stickyPositioningStyle
    }, renderHeadingContent(heading, index));

    if (index !== 0 || !selectable) {
      return headingContent;
    }

    const checkboxClassName = css.classNames(IndexTable$1["default"].TableHeading, hasSortable && IndexTable$1["default"]['TableHeading-sortable'], index === 0 && IndexTable$1["default"]['TableHeading-first']);
    const checkboxContent = /*#__PURE__*/React__default["default"].createElement("th", {
      className: checkboxClassName,
      key: `${heading}-${index}`,
      "data-index-table-heading": true
    }, renderCheckboxContent());
    return [checkboxContent, headingContent];
  }

  function renderCheckboxContent() {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: IndexTable$1["default"].ColumnHeaderCheckboxWrapper
    }, /*#__PURE__*/React__default["default"].createElement(Checkbox.Checkbox, {
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
      headingContent = /*#__PURE__*/React__default["default"].createElement(Stack.Stack, {
        wrap: false,
        alignment: "center"
      }, /*#__PURE__*/React__default["default"].createElement("span", null, heading.title), /*#__PURE__*/React__default["default"].createElement(Badge.Badge, {
        status: "new"
      }, i18n.translate('Polaris.IndexTable.onboardingBadgeText')));
    } else if (heading.hidden) {
      headingContent = /*#__PURE__*/React__default["default"].createElement(Text.Text, {
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
      let SourceComponent = defaultSortDirection === 'ascending' ? polarisIcons.SortAscendingMajor : polarisIcons.SortDescendingMajor;

      if (isCurrentlySorted) {
        newDirection = isAscending ? 'descending' : 'ascending';
        SourceComponent = sortDirection === 'ascending' ? polarisIcons.SortAscendingMajor : polarisIcons.SortDescendingMajor;
      }

      const iconMarkup = /*#__PURE__*/React__default["default"].createElement("span", {
        className: css.classNames(IndexTable$1["default"].TableHeadingSortIcon, isCurrentlySorted && IndexTable$1["default"]['TableHeadingSortIcon-visible'])
      }, /*#__PURE__*/React__default["default"].createElement(SourceComponent, {
        focusable: "false",
        "aria-hidden": "true",
        className: IndexTable$1["default"].TableHeadingSortSvg
      }));
      const sortMarkup = /*#__PURE__*/React__default["default"].createElement(UnstyledButton.UnstyledButton, {
        onClick: () => handleSortHeadingClick(index, newDirection),
        className: IndexTable$1["default"].TableHeadingSortButton,
        tabIndex: selectMode ? -1 : 0
      }, iconMarkup, headingContent);

      if (!sortToggleLabels || selectMode) {
        return sortMarkup;
      }

      const tooltipDirection = isCurrentlySorted ? sortDirection : defaultSortDirection;
      const tooltipContent = sortToggleLabels[index][tooltipDirection];
      return /*#__PURE__*/React__default["default"].createElement(Tooltip.Tooltip, {
        content: tooltipContent
      }, sortMarkup);
    }

    return headingContent;
  }

  function handleSelectPage(checked) {
    handleSelectionChange(types.SelectionType.Page, checked);
  }

  function renderStickyHeading(heading, index) {
    const position = index + 1;
    const headingStyle = tableHeadingRects.current && tableHeadingRects.current.length > position ? {
      minWidth: tableHeadingRects.current[position].offsetWidth
    } : undefined;
    const headingContent = renderHeadingContent(heading, index);
    const stickyHeadingClassName = css.classNames(IndexTable$1["default"].TableHeading, index === 0 && IndexTable$1["default"]['StickyTableHeading-second'], index === 0 && !selectable && IndexTable$1["default"].unselectable);
    return /*#__PURE__*/React__default["default"].createElement("div", {
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
    const actionText = selectedItemsCount === types.SELECT_ALL_ITEMS ? i18n.translate('Polaris.IndexTable.undo') : customActionText;
    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore
    };
  }

  function handleSelectModeToggle() {
    handleSelectionChange(types.SelectionType.All, false);
  }
}

const isBreakpointsXS = () => {
  var _toPx;

  return typeof window === 'undefined' ? false : window.innerWidth < parseFloat((_toPx = polarisTokens.toPx(polarisTokens.tokens.breakpoints['breakpoints-sm'])) !== null && _toPx !== void 0 ? _toPx : '');
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
  return /*#__PURE__*/React__default["default"].createElement(IndexProvider.IndexProvider, {
    selectable: selectable,
    itemCount: itemCount,
    selectedItemsCount: selectedItemsCount,
    resourceName: passedResourceName,
    loading: loading,
    hasMoreItems: hasMoreItems,
    condensed: condensed,
    onSelectionChange: onSelectionChange
  }, /*#__PURE__*/React__default["default"].createElement(IndexTableBase, indexTableBaseProps, children));
}
IndexTable.Cell = Cell.Cell;
IndexTable.Row = Row.Row;

exports.IndexTable = IndexTable;
