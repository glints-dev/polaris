'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./AppProvider.scss.js');
require('./global.scss.js');
var stickyManager = require('../../utilities/sticky-manager/sticky-manager.js');
var scrollLockManager = require('../../utilities/scroll-lock-manager/scroll-lock-manager.js');
var uniqueIdFactory = require('../../utilities/unique-id/unique-id-factory.js');
var I18n = require('../../utilities/i18n/I18n.js');
var context = require('../../utilities/features/context.js');
var context$1 = require('../../utilities/i18n/context.js');
var context$2 = require('../../utilities/scroll-lock-manager/context.js');
var context$3 = require('../../utilities/sticky-manager/context.js');
var context$4 = require('../../utilities/unique-id/context.js');
var context$5 = require('../../utilities/link/context.js');
var MediaQueryProvider = require('../MediaQueryProvider/MediaQueryProvider.js');
var PortalsManager = require('../PortalsManager/PortalsManager.js');
var FocusManager = require('../FocusManager/FocusManager.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.stickyManager = void 0;
    this.scrollLockManager = void 0;
    this.uniqueIdFactory = void 0;

    this.setBodyStyles = () => {
      document.body.style.backgroundColor = 'var(--p-background)';
      document.body.style.color = 'var(--p-text)';
    };

    this.stickyManager = new stickyManager.StickyManager();
    this.scrollLockManager = new scrollLockManager.ScrollLockManager();
    this.uniqueIdFactory = new uniqueIdFactory.UniqueIdFactory(uniqueIdFactory.globalIdGeneratorFactory);
    const {
      i18n,
      linkComponent
    } = this.props; // eslint-disable-next-line react/state-in-constructor

    this.state = {
      link: linkComponent,
      intl: new I18n.I18n(i18n)
    };
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
      this.setBodyStyles();
    }
  }

  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent
  }) {
    const {
      i18n,
      linkComponent
    } = this.props;

    if (i18n === prevI18n && linkComponent === prevLinkComponent) {
      return;
    }

    this.setState({
      link: linkComponent,
      intl: new I18n.I18n(i18n)
    });
  }

  render() {
    const {
      children,
      features = {}
    } = this.props;
    const {
      intl,
      link
    } = this.state;
    return /*#__PURE__*/React__default["default"].createElement(context.FeaturesContext.Provider, {
      value: features
    }, /*#__PURE__*/React__default["default"].createElement(context$1.I18nContext.Provider, {
      value: intl
    }, /*#__PURE__*/React__default["default"].createElement(context$2.ScrollLockManagerContext.Provider, {
      value: this.scrollLockManager
    }, /*#__PURE__*/React__default["default"].createElement(context$3.StickyManagerContext.Provider, {
      value: this.stickyManager
    }, /*#__PURE__*/React__default["default"].createElement(context$4.UniqueIdFactoryContext.Provider, {
      value: this.uniqueIdFactory
    }, /*#__PURE__*/React__default["default"].createElement(context$5.LinkContext.Provider, {
      value: link
    }, /*#__PURE__*/React__default["default"].createElement(MediaQueryProvider.MediaQueryProvider, null, /*#__PURE__*/React__default["default"].createElement(PortalsManager.PortalsManager, null, /*#__PURE__*/React__default["default"].createElement(FocusManager.FocusManager, null, children)))))))));
  }

}

exports.AppProvider = AppProvider;
