'use strict';

var node = require('vscode-languageserver/node');
var vscodeLanguageserverTextdocument = require('vscode-languageserver-textdocument');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit$1(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _templateObject;

var BASE_FONT_SIZE = 16;
var UNIT_PX = 'px';
var UNIT_EM = 'em';
var UNIT_REM = 'rem'; // https://regex101.com/r/zvY2bu/1

var DIGIT_REGEX = new RegExp(String.raw(_templateObject || (_templateObject = _taggedTemplateLiteral(["-?d+(?:.d+|d*)"], ["-?\\d+(?:\\.\\d+|\\d*)"]))));
var UNIT_REGEX = new RegExp("".concat(UNIT_PX, "|").concat(UNIT_EM, "|").concat(UNIT_REM));
function getUnit() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var unit = value.match(new RegExp("".concat(DIGIT_REGEX.source, "(").concat(UNIT_REGEX.source, ")")));
  return unit && unit[1];
}
function toRem() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var unit = getUnit(value);
  if (!unit) return value;

  if (unit === UNIT_REM) {
    return value;
  }

  if (unit === UNIT_EM) {
    return "".concat(parseFloat(value)).concat(UNIT_REM);
  }

  if (unit === UNIT_PX) {
    return "".concat(parseFloat(value) / BASE_FONT_SIZE).concat(UNIT_REM);
  }
}
function rem(value) {
  return value.replace(new RegExp("".concat(DIGIT_REGEX.source, "(").concat(UNIT_PX, ")"), 'g'), function (px) {
    var _toRem;

    return (_toRem = toRem(px)) !== null && _toRem !== void 0 ? _toRem : px;
  });
}
function tokensToRems(tokenGroup) {
  return Object.fromEntries(Object.entries(tokenGroup).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        token = _ref2[0],
        properties = _ref2[1];

    return [token, _objectSpread2(_objectSpread2({}, properties), {}, {
      value: rem(properties.value)
    })];
  }) // We loose the `tokenGroup` inference after transforming the object with
  // `Object.fromEntries()` and `Object.entries()`. Thus, we cast the result
  // back to `T` since we are simply converting the `value` from px to rem.
  );
}
function createVar(token) {
  return "--p-".concat(token);
}

var breakpoints = {
  'breakpoints-xs': {
    value: '0px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-sm': {
    value: '490px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-md': {
    value: '768px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-lg': {
    value: '1040px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  },
  'breakpoints-xl': {
    value: '1440px',
    description: 'Commonly used for sizing containers (e.g. max-width). See below for media query usage.'
  }
};

var depth = {
  'shadow-transparent': {
    value: '0 0 0 0 transparent'
  },
  'shadow-faint': {
    value: '0 1px 0 0 rgba(22, 29, 37, 0.05)'
  },
  'shadow-base': {
    value: '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)'
  },
  'shadow-deep': {
    value: '0 0 0 1px rgba(6, 44, 82, 0.1), 0 2px 16px rgba(33, 43, 54, 0.08)'
  },
  'shadow-button': {
    value: '0 1px 0 rgba(0, 0, 0, 0.05)'
  },
  'shadow-top-bar': {
    value: '0 2px 2px -1px rgba(0, 0, 0, 0.15)'
  },
  'shadow-card': {
    value: '0 0 5px rgba(23, 24, 24, 0.05), 0 1px 2px rgba(0, 0, 0, 0.15)'
  },
  'shadow-popover': {
    value: '0 3px 6px -3px rgba(23, 24, 24, 0.08), 0 8px 20px -4px rgba(23, 24, 24, 0.12)'
  },
  'shadow-layer': {
    value: '0 31px 41px 0 rgba(32, 42, 53, 0.2), 0 2px 16px 0 rgba(32, 42, 54, 0.08)'
  },
  'shadow-modal': {
    value: '0 26px 80px rgba(0, 0, 0, 0.2), 0 0px 1px rgba(0, 0, 0, 0.2)'
  },
  'shadows-inset-button': {
    value: 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
  },
  'shadows-inset-button-pressed': {
    value: 'inset 0 1px 0 rgba(0, 0, 0, 0.15)'
  }
};

var font = {
  'font-family-sans': {
    value: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
  },
  'font-family-mono': {
    value: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace"
  },
  'font-size-75': {
    value: '12px'
  },
  'font-size-100': {
    value: '14px'
  },
  'font-size-200': {
    value: '16px'
  },
  'font-size-300': {
    value: '20px'
  },
  'font-size-400': {
    value: '24px'
  },
  'font-size-500': {
    value: '28px'
  },
  'font-size-600': {
    value: '32px'
  },
  'font-size-700': {
    value: '40px'
  },
  'font-weight-regular': {
    value: '400'
  },
  'font-weight-medium': {
    value: '500'
  },
  'font-weight-semibold': {
    value: '600'
  },
  'font-weight-bold': {
    value: '700'
  },
  'font-line-height-1': {
    value: '16px'
  },
  'font-line-height-2': {
    value: '20px'
  },
  'font-line-height-3': {
    value: '24px'
  },
  'font-line-height-4': {
    value: '28px'
  },
  'font-line-height-5': {
    value: '32px'
  },
  'font-line-height-6': {
    value: '40px'
  },
  'font-line-height-7': {
    value: '48px'
  }
};

var legacy = {
  'override-loading-z-index': {
    value: '514'
  },
  'choice-size': {
    value: '20px'
  },
  'icon-size-small': {
    value: '8px'
  },
  'icon-size-medium': {
    value: '20px'
  },
  'choice-margin': {
    value: '1px'
  },
  'control-border-width': {
    value: '2px'
  },
  'banner-border-default': {
    value: 'inset 0 1px 0 0 var(--p-border-neutral-subdued), inset 0 0 0 1px var(--p-border-neutral-subdued)'
  },
  'banner-border-success': {
    value: 'inset 0 1px 0 0 var(--p-border-success-subdued), inset 0 0 0 1px var(--p-border-success-subdued)'
  },
  'banner-border-highlight': {
    value: 'inset 0 1px 0 0 var(--p-border-highlight-subdued), inset 0 0 0 1px var(--p-border-highlight-subdued)'
  },
  'banner-border-warning': {
    value: 'inset 0 1px 0 0 var(--p-border-warning-subdued), inset 0 0 0 1px var(--p-border-warning-subdued)'
  },
  'banner-border-critical': {
    value: 'inset 0 1px 0 0 var(--p-border-critical-subdued), inset 0 0 0 1px var(--p-border-critical-subdued)'
  },
  'thin-border-subdued': {
    value: '1px solid var(--p-border-subdued)'
  },
  'text-field-spinner-offset': {
    value: '2px'
  },
  'text-field-focus-ring-offset': {
    value: '-4px'
  },
  'button-group-item-spacing': {
    value: '-1px'
  },
  'range-slider-thumb-size-base': {
    value: '16px'
  },
  'range-slider-thumb-size-active': {
    value: '24px'
  },
  'frame-offset': {
    value: '0px'
  }
};

var colors = {
  background: {
    value: 'rgba(246, 246, 247, 1)',
    description: 'For use as a background color, in components such as Page and Frame backgrounds.'
  },
  'background-hovered': {
    value: 'rgba(241, 242, 243, 1)',
    description: 'For use when an action or navigation is used on a background.'
  },
  'background-pressed': {
    value: 'rgba(237, 238, 239, 1)',
    description: 'For use when an action or navigation is used on a background.'
  },
  'background-selected': {
    value: 'rgba(237, 238, 239, 1)',
    description: 'For use in the selected item in navigation'
  },
  surface: {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a background color, in components such as Card, Modal, and Popover.'
  },
  'surface-dark': {
    value: 'rgba(32, 33, 35, 1)',
    description: 'For use as a dark background color, in components such as Card, Modal, and Popover.'
  },
  'surface-neutral': {
    value: 'rgba(228, 229, 231, 1)',
    description: 'For use as a background color in neutral badges.'
  },
  'surface-neutral-hovered': {
    value: 'rgba(219, 221, 223, 1)',
    description: 'For use as a hovered background color in neutral badges.'
  },
  'surface-neutral-pressed': {
    value: 'rgba(201, 204, 208, 1)',
    description: 'For use as a pressed background color in neutral badges.'
  },
  'surface-neutral-disabled': {
    value: 'rgba(241, 242, 243, 1)',
    description: 'For use as a disabled background color in neutral badges.'
  },
  'surface-neutral-subdued': {
    value: 'rgba(246, 246, 247, 1)',
    description: 'For use as a background color in neutral banners.'
  },
  'surface-neutral-subdued-dark': {
    value: 'rgba(68, 71, 74, 1)',
    description: 'For use as a dark background color in neutral banners.'
  },
  'surface-subdued': {
    value: 'rgba(250, 251, 251, 1)',
    description: 'For use as a subdued background color, in components such as Card, Modal, and Popover.'
  },
  'surface-disabled': {
    value: 'rgba(250, 251, 251, 1)',
    description: 'For use as a surface color on disabled interactive elements such as option list items and action list items when in a disabled state.'
  },
  'surface-hovered': {
    value: 'rgba(246, 246, 247, 1)',
    description: 'For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.'
  },
  'surface-hovered-dark': {
    value: 'rgba(47, 49, 51, 1)',
    description: 'For use as a dark surface color on interactive elements such as resource list items and action list items when in a hovered state.'
  },
  'surface-pressed': {
    value: 'rgba(241, 242, 243, 1)',
    description: 'For use as a surface color on interactive elements such as resource list items and action list items when in a pressed state.'
  },
  'surface-pressed-dark': {
    value: 'rgba(62, 64, 67, 1)',
    description: 'For use as a dark surface color on interactive elements such as resource list items and action list items when in a pressed state.'
  },
  'surface-depressed': {
    value: 'rgba(237, 238, 239, 1)',
    description: 'For use as a surface color on interactive elements such as resource list items and action list items when in a depressed state.'
  },
  'surface-search-field': {
    value: 'rgba(241, 242, 243, 1)',
    description: 'For use as a background color, in components on surface elements such as SearchField'
  },
  'surface-search-field-dark': {
    value: 'rgba(47, 49, 51, 1)',
    description: 'For use as a dark background color, in components on surface elements such as SearchField'
  },
  backdrop: {
    value: 'rgba(0, 0, 0, 0.5)',
    description: 'For use as the background color of the backdrop component for navigation and modal. This color has an alpha of `0.5`.'
  },
  overlay: {
    value: 'rgba(255, 255, 255, 0.5)',
    description: 'For use as the background color of elements which lay on top of surfaces to obscure their contents. This color has an alpha of `0.5`.'
  },
  'shadow-color-picker': {
    value: 'rgba(0, 0, 0, 0.5)'
  },
  'shadow-color-picker-dragger': {
    value: 'rgba(33, 43, 54, 0.32)'
  },
  'hint-from-direct-light': {
    value: 'rgba(0, 0, 0, 0.15)',
    description: 'For use in building shadows scrollables.'
  },
  border: {
    value: 'rgba(140, 145, 150, 1)',
    description: 'For use as the default border on elements.'
  },
  'border-on-dark': {
    value: 'rgba(80, 83, 86, 1)',
    description: 'For use as the default border on dark elements.'
  },
  'border-neutral-subdued': {
    value: 'rgba(186, 191, 195, 1)',
    description: 'For use as the border on banners.'
  },
  'border-hovered': {
    value: 'rgba(153, 158, 164, 1)',
    description: 'Used for borders on hovered interactive elements'
  },
  'border-disabled': {
    value: 'rgba(210, 213, 216, 1)',
    description: 'Used for disabled borders on interactive elements'
  },
  'border-subdued': {
    value: 'rgba(201, 204, 207, 1)',
    description: 'For use as a subdued border on elements.'
  },
  'border-depressed': {
    value: 'rgba(87, 89, 89, 1)',
    description: 'For use as a border on depressed elements.'
  },
  'border-shadow': {
    value: 'rgba(174, 180, 185, 1)',
    description: 'For use as an additional bottom border on elements.'
  },
  'border-shadow-subdued': {
    value: 'rgba(186, 191, 196, 1)',
    description: 'For use as an additional, subdued bottom border on elements.'
  },
  divider: {
    value: 'rgba(225, 227, 229, 1)',
    description: 'For use as a divider between elements.'
  },
  'divider-dark': {
    value: 'rgba(69, 71, 73, 1)',
    description: 'For use as a dark divider between elements.'
  },
  icon: {
    value: 'rgba(92, 95, 98, 1)',
    description: 'For use as the fill color of icons.'
  },
  'icon-on-dark': {
    value: 'rgba(166, 172, 178, 1)',
    description: 'For use as the fill color of dark icons.'
  },
  'icon-hovered': {
    value: 'rgba(26, 28, 29, 1)',
    description: 'For use as the fill color of hovered icons.'
  },
  'icon-pressed': {
    value: 'rgba(68, 71, 74, 1)',
    description: 'For use as the fill color of pressed icons.'
  },
  'icon-disabled': {
    value: 'rgba(186, 190, 195, 1)',
    description: 'For use as the fill color of disabled icons.'
  },
  'icon-subdued': {
    value: 'rgba(140, 145, 150, 1)',
    description: 'For use as the fill color of subdued icons.'
  },
  text: {
    value: 'rgba(32, 34, 35, 1)',
    description: 'For use as a text color.'
  },
  'text-on-dark': {
    value: 'rgba(227, 229, 231, 1)',
    description: 'For use as a text color on dark elements.'
  },
  'text-disabled': {
    value: 'rgba(140, 145, 150, 1)',
    description: 'For use as a disabled text color and as a placeholder text color.'
  },
  'text-subdued': {
    value: 'rgba(109, 113, 117, 1)',
    description: 'For use as a subdued text color.'
  },
  'text-subdued-on-dark': {
    value: 'rgba(153, 159, 164, 1)',
    description: 'For use as a subdued text color on dark elements.'
  },
  interactive: {
    value: 'rgba(44, 110, 203, 1)',
    description: 'Used for links, plain buttons, and as the fill color for selected checkboxes and radio buttons.'
  },
  'interactive-on-dark': {
    value: 'rgba(54, 163, 255, 1)',
    description: 'Used for links, plain buttons, and as the fill color for selected checkboxes and radio buttons when on a dark element.'
  },
  'interactive-disabled': {
    value: 'rgba(189, 193, 204, 1)',
    description: 'Used for disabled links and plain buttons.'
  },
  'interactive-hovered': {
    value: 'rgba(31, 81, 153, 1)',
    description: 'Used for hovered links and plain buttons.'
  },
  'interactive-pressed': {
    value: 'rgba(16, 50, 98, 1)',
    description: 'Used for pressed links and plain buttons.'
  },
  'interactive-pressed-on-dark': {
    value: 'rgba(136, 188, 255, 1)',
    description: 'Used for pressed links and plain buttons on dark elements.'
  },
  focused: {
    value: 'rgba(69, 143, 255, 1)',
    description: 'For use in the focus ring on interactive elements.'
  },
  'surface-selected': {
    value: 'rgba(242, 247, 254, 1)',
    description: 'For use as a surface color in selected interactive elements, in components such as action list and resource list.'
  },
  'surface-selected-hovered': {
    value: 'rgba(237, 244, 254, 1)',
    description: 'For use as a surface color in selected interactive elements that are hovered, in components such as action list and resource list.'
  },
  'surface-selected-pressed': {
    value: 'rgba(229, 239, 253, 1)',
    description: 'For use as a surface color in selected interactive elements that are pressed, in components such as action list and resource list.'
  },
  'icon-on-interactive': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a fill color for icons on interactive elements.'
  },
  'text-on-interactive': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a text color on interactive elements.'
  },
  'action-secondary': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'Used for secondary buttons and tertiary buttons, as well as in form elements as a background color and pontentially other secondary surfaces.'
  },
  'action-secondary-disabled': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'Used as a disabled state for secondary buttons'
  },
  'action-secondary-hovered': {
    value: 'rgba(246, 246, 247, 1)',
    description: 'Used as a hovered state for secondary buttons'
  },
  'action-secondary-hovered-dark': {
    value: 'rgba(84, 87, 91, 1)',
    description: 'Used as a dark hovered state for secondary buttons'
  },
  'action-secondary-pressed': {
    value: 'rgba(241, 242, 243, 1)',
    description: 'Used as a pressed state for secondary buttons'
  },
  'action-secondary-pressed-dark': {
    value: 'rgba(96, 100, 103, 1)',
    description: 'Used as a dark pressed state for secondary buttons'
  },
  'action-secondary-depressed': {
    value: 'rgba(109, 113, 117, 1)',
    description: 'Used as a depressed state for secondary buttons'
  },
  'action-primary': {
    value: 'rgba(0, 128, 96, 1)',
    description: 'Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.'
  },
  'action-primary-disabled': {
    value: 'rgba(241, 241, 241, 1)',
    description: 'Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.'
  },
  'action-primary-hovered': {
    value: 'rgba(0, 110, 82, 1)',
    description: 'Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.'
  },
  'action-primary-pressed': {
    value: 'rgba(0, 94, 70, 1)',
    description: 'Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.'
  },
  'action-primary-depressed': {
    value: 'rgba(0, 61, 44, 1)',
    description: 'Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.'
  },
  'icon-on-primary': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.'
  },
  'text-on-primary': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a text color on primary actions. Not for use in text on navigation and tabs.'
  },
  'text-primary': {
    value: 'rgba(0, 123, 92, 1)',
    description: 'For use as primary text color on background. For use in text in components such as Navigation.'
  },
  'text-primary-hovered': {
    value: 'rgba(0, 108, 80, 1)',
    description: 'For use as primary hovered text color on background. For use in text in components such as Navigation.'
  },
  'text-primary-pressed': {
    value: 'rgba(0, 92, 68, 1)',
    description: 'For use as primary pressed text color on background. For use in text in components such as Navigation.'
  },
  'surface-primary-selected': {
    value: 'rgba(241, 248, 245, 1)',
    description: 'Used as a surface color to indicate selected interactive states in navigation and tabs.'
  },
  'surface-primary-selected-hovered': {
    value: 'rgba(179, 208, 195, 1)',
    description: 'Used as a surface color to indicate selected interactive states that are hovered in navigation and tabs.'
  },
  'surface-primary-selected-pressed': {
    value: 'rgba(162, 188, 176, 1)',
    description: 'Used as a surface color to indicate selected interactive states that are pressed in navigation and tabs.'
  },
  'border-critical': {
    value: 'rgba(253, 87, 73, 1)',
    description: 'For use as a border on critical components such as an outline on interactive elements in an error state.'
  },
  'border-critical-subdued': {
    value: 'rgba(224, 179, 178, 1)',
    description: 'For use as a border on critical components such as banners.'
  },
  'border-critical-disabled': {
    value: 'rgba(255, 167, 163, 1)',
    description: 'For use as a disabled border on critical components such as banners, and as an outline on interactive elements in an error state.'
  },
  'icon-critical': {
    value: 'rgba(215, 44, 13, 1)',
    description: 'For use as an icon fill color on top of critical elements.'
  },
  'surface-critical': {
    value: 'rgba(254, 211, 209, 1)',
    description: 'For use as a surface color on critical elements including badges.'
  },
  'surface-critical-subdued': {
    value: 'rgba(255, 244, 244, 1)',
    description: 'For use as a subdued surface color on critical elements including banners.'
  },
  'surface-critical-subdued-hovered': {
    value: 'rgba(255, 240, 240, 1)',
    description: 'For use as a surface color on critical interactive elements including action list items in a hovered state.'
  },
  'surface-critical-subdued-pressed': {
    value: 'rgba(255, 233, 232, 1)',
    description: 'For use as a surface color on critical interactive elements including action list items in a pressed state.'
  },
  'surface-critical-subdued-depressed': {
    value: 'rgba(254, 188, 185, 1)',
    description: 'For use as a surface color on critical interactive elements including action list items in a depressed state.'
  },
  'text-critical': {
    value: 'rgba(215, 44, 13, 1)',
    description: 'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.'
  },
  'action-critical': {
    value: 'rgba(216, 44, 13, 1)',
    description: 'For use as the background color for destructive buttons, and as the background color for error toast messages.'
  },
  'action-critical-disabled': {
    value: 'rgba(241, 241, 241, 1)',
    description: 'For use as the background color for disabled destructive buttons, and as the background color for error toast messages.'
  },
  'action-critical-hovered': {
    value: 'rgba(188, 34, 0, 1)',
    description: 'For use as the background color for hovered destructive buttons, and as the background color for error toast messages.'
  },
  'action-critical-pressed': {
    value: 'rgba(162, 27, 0, 1)',
    description: 'For use as the background color for pressed destructive buttons, and as the background color for error toast messages.'
  },
  'action-critical-depressed': {
    value: 'rgba(108, 15, 0, 1)',
    description: 'For use as the background color for depressed destructive buttons, and as the background color for error toast messages.'
  },
  'icon-on-critical': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a fill color for icons on critical actions.'
  },
  'text-on-critical': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a text color on critical actions.'
  },
  'interactive-critical': {
    value: 'rgba(216, 44, 13, 1)',
    description: 'For use as the text color for destructive interactive elements: links, plain buttons, error state of selected checkboxes and radio buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.'
  },
  'interactive-critical-disabled': {
    value: 'rgba(253, 147, 141, 1)',
    description: 'For use as a text color in disabled destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.'
  },
  'interactive-critical-hovered': {
    value: 'rgba(205, 41, 12, 1)',
    description: 'For use as a text color in hovered destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.'
  },
  'interactive-critical-pressed': {
    value: 'rgba(103, 15, 3, 1)',
    description: 'For use as a text color in pressed destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.'
  },
  'border-warning': {
    value: 'rgba(185, 137, 0, 1)',
    description: 'For use as a border on warning components such as...'
  },
  'border-warning-subdued': {
    value: 'rgba(225, 184, 120, 1)',
    description: 'For use as a border on warning components such as banners.'
  },
  'icon-warning': {
    value: 'rgba(185, 137, 0, 1)',
    description: 'For use as an icon fill color on top of warning elements.'
  },
  'surface-warning': {
    value: 'rgba(255, 215, 157, 1)',
    description: 'For use as a surface color on warning elements including badges.'
  },
  'surface-warning-subdued': {
    value: 'rgba(255, 245, 234, 1)',
    description: 'For use as a subdued surface color on warning elements including banners.'
  },
  'surface-warning-subdued-hovered': {
    value: 'rgba(255, 242, 226, 1)',
    description: 'For use as a subdued surface color on warning elements including banners.'
  },
  'surface-warning-subdued-pressed': {
    value: 'rgba(255, 235, 211, 1)',
    description: 'For use as a subdued surface color on warning elements including banners.'
  },
  'text-warning': {
    value: 'rgba(145, 106, 0, 1)',
    description: 'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.'
  },
  'border-highlight': {
    value: 'rgba(68, 157, 167, 1)',
    description: 'For use as a border on informational components such as...'
  },
  'border-highlight-subdued': {
    value: 'rgba(152, 198, 205, 1)',
    description: 'For use as a border on informational components such as banners.'
  },
  'icon-highlight': {
    value: 'rgba(0, 160, 172, 1)',
    description: 'For use as an icon fill color on top of informational elements.'
  },
  'surface-highlight': {
    value: 'rgba(164, 232, 242, 1)',
    description: 'For use as a surface color on information elements including badges.'
  },
  'surface-highlight-subdued': {
    value: 'rgba(235, 249, 252, 1)',
    description: 'For use as a surface color on information elements including banners.'
  },
  'surface-highlight-subdued-hovered': {
    value: 'rgba(228, 247, 250, 1)',
    description: 'For use as a surface color on information elements including banners.'
  },
  'surface-highlight-subdued-pressed': {
    value: 'rgba(213, 243, 248, 1)',
    description: 'For use as a surface color on information elements including banners.'
  },
  'text-highlight': {
    value: 'rgba(52, 124, 132, 1)',
    description: 'For use as a text color in inert informational elements. Not for use as a text color on banners and badges.'
  },
  'border-success': {
    value: 'rgba(0, 164, 124, 1)',
    description: 'For use as a border on success components such as text inputs.'
  },
  'border-success-subdued': {
    value: 'rgba(149, 201, 180, 1)',
    description: 'For use as a border on success components such as banners.'
  },
  'icon-success': {
    value: 'rgba(0, 127, 95, 1)',
    description: 'For use as an icon fill color on top of success elements.'
  },
  'surface-success': {
    value: 'rgba(174, 233, 209, 1)',
    description: 'For use as a surface color on success elements including badges.'
  },
  'surface-success-subdued': {
    value: 'rgba(241, 248, 245, 1)',
    description: 'For use as a surface color on information elements including banners.'
  },
  'surface-success-subdued-hovered': {
    value: 'rgba(236, 246, 241, 1)',
    description: 'For use as a surface color on information elements including banners.'
  },
  'surface-success-subdued-pressed': {
    value: 'rgba(226, 241, 234, 1)',
    description: 'For use as a surface color on information elements including banners.'
  },
  'text-success': {
    value: 'rgba(0, 128, 96, 1)',
    description: 'For use as a text color in inert success elements. Not for use as a text color on banners and badges.'
  },
  'icon-attention': {
    value: 'rgba(138, 97, 22, 1)'
  },
  'surface-attention': {
    value: 'rgba(255, 234, 138, 1)'
  },
  'decorative-one-icon': {
    value: 'rgba(126, 87, 0, 1)',
    description: 'For use as a decorative icon color that is applied on a decorative surface.'
  },
  'decorative-one-surface': {
    value: 'rgba(255, 201, 107, 1)',
    description: 'For use as a decorative surface color.'
  },
  'decorative-one-text': {
    value: 'rgba(61, 40, 0, 1)',
    description: 'For use as a decorative text color that is applied on a decorative surface.'
  },
  'decorative-two-icon': {
    value: 'rgba(175, 41, 78, 1)',
    description: 'For use as a decorative icon color that is applied on a decorative surface.'
  },
  'decorative-two-surface': {
    value: 'rgba(255, 196, 176, 1)',
    description: 'For use as a decorative surface color.'
  },
  'decorative-two-text': {
    value: 'rgba(73, 11, 28, 1)',
    description: 'For use as a decorative text color that is applied on a decorative surface.'
  },
  'decorative-three-icon': {
    value: 'rgba(0, 109, 65, 1)',
    description: 'For use as a decorative icon color that is applied on a decorative surface.'
  },
  'decorative-three-surface': {
    value: 'rgba(146, 230, 181, 1)',
    description: 'For use as a decorative surface color.'
  },
  'decorative-three-text': {
    value: 'rgba(0, 47, 25, 1)',
    description: 'For use as a decorative text color that is applied on a decorative surface.'
  },
  'decorative-four-icon': {
    value: 'rgba(0, 106, 104, 1)',
    description: 'For use as a decorative icon color that is applied on a decorative surface.'
  },
  'decorative-four-surface': {
    value: 'rgba(145, 224, 214, 1)',
    description: 'For use as a decorative surface color.'
  },
  'decorative-four-text': {
    value: 'rgba(0, 45, 45, 1)',
    description: 'For use as a decorative text color that is applied on a decorative surface.'
  },
  'decorative-five-icon': {
    value: 'rgba(174, 43, 76, 1)',
    description: 'For use as a decorative icon color that is applied on a decorative surface.'
  },
  'decorative-five-surface': {
    value: 'rgba(253, 201, 208, 1)',
    description: 'For use as a decorative surface color.'
  },
  'decorative-five-text': {
    value: 'rgba(79, 14, 31, 1)',
    description: 'For use as a decorative text color that is applied on a decorative surface.'
  }
};

var motion = {
  'duration-0': {
    value: '0ms'
  },
  'duration-50': {
    value: '50ms'
  },
  'duration-100': {
    value: '100ms'
  },
  'duration-150': {
    value: '150ms'
  },
  'duration-200': {
    value: '200ms'
  },
  'duration-250': {
    value: '250ms'
  },
  'duration-300': {
    value: '300ms'
  },
  'duration-350': {
    value: '350ms'
  },
  'duration-400': {
    value: '400ms'
  },
  'duration-450': {
    value: '450ms'
  },
  'duration-500': {
    value: '500ms'
  },
  'duration-5000': {
    value: '5000ms'
  },
  ease: {
    value: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
  },
  'ease-in': {
    value: 'cubic-bezier(0.42, 0, 1, 1)'
  },
  'ease-out': {
    value: 'cubic-bezier(0, 0, 0.58, 1)'
  },
  'ease-in-out': {
    value: 'cubic-bezier(0.42, 0, 0.58, 1)'
  },
  linear: {
    value: 'cubic-bezier(0, 0, 1, 1)'
  },
  'keyframes-bounce': {
    value: '{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }'
  },
  'keyframes-fade-in': {
    value: '{ to { opacity: 1 } }'
  },
  'keyframes-pulse': {
    value: '{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }'
  },
  'keyframes-spin': {
    value: '{ to { transform: rotate(1turn) } }'
  }
};

var shape = {
  'border-radius-05': {
    value: '2px'
  },
  'border-radius-1': {
    value: '4px'
  },
  'border-radius-2': {
    value: '8px'
  },
  'border-radius-3': {
    value: '12px'
  },
  'border-radius-4': {
    value: '16px'
  },
  'border-radius-5': {
    value: '20px'
  },
  'border-radius-6': {
    value: '30px'
  },
  'border-radius-base': {
    value: '3px'
  },
  'border-radius-large': {
    value: '6px'
  },
  'border-radius-half': {
    value: '50%'
  },
  'border-width-1': {
    value: '1px'
  },
  'border-width-2': {
    value: '2px'
  },
  'border-width-3': {
    value: '3px'
  },
  'border-width-4': {
    value: '4px'
  },
  'border-width-5': {
    value: '5px'
  },
  'border-base': {
    value: 'var(--p-border-width-1) solid var(--p-border-subdued)'
  },
  'border-dark': {
    value: 'var(--p-border-width-1) solid var(--p-border)'
  },
  'border-transparent': {
    value: 'var(--p-border-width-1) solid transparent'
  },
  'border-divider': {
    value: 'var(--p-border-width-1) solid var(--p-divider)'
  },
  'border-divider-on-dark': {
    value: 'var(--p-border-width-1) solid var(--p-divider-dark)'
  }
};

var spacing = {
  'space-0': {
    value: '0'
  },
  'space-025': {
    value: '1px'
  },
  'space-05': {
    value: '2px'
  },
  'space-1': {
    value: '4px'
  },
  'space-2': {
    value: '8px'
  },
  'space-3': {
    value: '12px'
  },
  'space-4': {
    value: '16px'
  },
  'space-5': {
    value: '20px'
  },
  'space-6': {
    value: '24px'
  },
  'space-8': {
    value: '32px'
  },
  'space-10': {
    value: '40px'
  },
  'space-12': {
    value: '48px'
  },
  'space-16': {
    value: '64px'
  },
  'space-20': {
    value: '80px'
  },
  'space-24': {
    value: '96px'
  },
  'space-28': {
    value: '112px'
  },
  'space-32': {
    value: '128px'
  }
};

var zIndex = {
  'z-1': {
    value: '100'
  },
  'z-2': {
    value: '400'
  },
  'z-3': {
    value: '510'
  },
  'z-4': {
    value: '512'
  },
  'z-5': {
    value: '513'
  },
  'z-6': {
    value: '514'
  },
  'z-7': {
    value: '515'
  },
  'z-8': {
    value: '516'
  },
  'z-9': {
    value: '517'
  },
  'z-10': {
    value: '518'
  },
  'z-11': {
    value: '519'
  },
  'z-12': {
    value: '520'
  }
};

var metadata = createMetadata({
  breakpoints: tokensToRems(breakpoints),
  colors: colors,
  depth: depth,
  font: tokensToRems(font),
  legacy: tokensToRems(legacy),
  motion: motion,
  shape: tokensToRems(shape),
  spacing: tokensToRems(spacing),
  zIndex: zIndex
});

/**
 * Identity function that simply returns the provided tokens with metadata, but additionally
 * validates the input matches the `Metadata` type exactly and infers all members.
 */
function createMetadata(metadata) {
  return metadata;
}

metadata.legacy;
    var restTokenGroups = _objectWithoutProperties(metadata, ["legacy"]);

var groupedCompletionItemTokenGroups = restTokenGroups;

/**
 * Grouped VS Code `CompletionItem`s for Polaris custom properties
 */
var groupedCompletionItems = Object.fromEntries(Object.entries(groupedCompletionItemTokenGroups).map(function (_ref) {
  var _ref2 = _slicedToArray$1(_ref, 2),
      groupedCompletionItemsKey = _ref2[0],
      tokenGroup = _ref2[1];

  var groupedCompletionItemProperties = Object.entries(tokenGroup).map(function (_ref3) {
    var _ref4 = _slicedToArray$1(_ref3, 2),
        tokenName = _ref4[0],
        tokenProperties = _ref4[1];

    return {
      label: createVar(tokenName),
      insertText: "".concat(createVar(tokenName)),
      detail: tokenProperties.value,
      documentation: tokenProperties.description,
      filterText: createVar(tokenName),
      kind: groupedCompletionItemsKey === 'color' ? node.CompletionItemKind.Color : node.CompletionItemKind.Variable
    };
  });
  return [groupedCompletionItemsKey, groupedCompletionItemProperties];
}));
var allGroupedCompletionItems = Object.values(groupedCompletionItems).flat(); // Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.

var connection = node.createConnection(node.ProposedFeatures.all); // Create a simple text document manager.

var documents = new node.TextDocuments(vscodeLanguageserverTextdocument.TextDocument);
var groupedCompletionItemPatterns = {
  breakpoints: /width/,
  colors: /color|background|shadow|border|column-rule|filter|opacity|outline|text-decoration/,
  spacing: /margin|padding|gap|top|left|right|bottom/,
  font: /font|line-height/,
  zIndex: /z-index/,
  shape: /border/,
  depth: /shadow/,
  motion: /animation/
};
connection.onInitialize(function (params) {
  params.capabilities;
  var result = {
    capabilities: {
      textDocumentSync: node.TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        triggerCharacters: ['--']
      }
    }
  };
  return result;
}); // This handler provides the list of token completion items.

connection.onCompletion(function (textDocumentPosition) {
  var doc = documents.get(textDocumentPosition.textDocument.uri);
  var matchedCompletionItems = []; // if the doc can't be found, return nothing

  if (!doc) {
    return [];
  }

  var currentText = doc.getText({
    start: {
      line: textDocumentPosition.position.line,
      character: 0
    },
    end: {
      line: textDocumentPosition.position.line,
      character: 1000
    }
  });

  for (var tokenGroup in groupedCompletionItemPatterns) {
    if (Object.prototype.hasOwnProperty.call(groupedCompletionItemPatterns, tokenGroup)) {
      var category = tokenGroup;

      if (groupedCompletionItemPatterns[category].test(currentText)) {
        var currentCompletionItems = groupedCompletionItems[category];

        if (currentCompletionItems) {
          matchedCompletionItems = matchedCompletionItems.concat(currentCompletionItems);
        }
      }
    }
  } // if there were matches above, send them


  if (matchedCompletionItems.length > 0) {
    return matchedCompletionItems;
  } // if there were no matches, send everything


  return allGroupedCompletionItems;
}); // Make the text document manager listen on the connection
// for open, change and close text document events

documents.listen(connection); // Listen on the connection

connection.listen();
