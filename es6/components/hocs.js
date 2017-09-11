var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepAssign from 'deep-assign';

export function createContextProvider(context) {
  var childContextTypes = {};
  Object.keys(context || {}).forEach(function (key) {
    childContextTypes[key] = PropTypes.any.isRequired;
  });

  var ContextProvider = function (_React$Component) {
    _inherits(ContextProvider, _React$Component);

    function ContextProvider() {
      _classCallCheck(this, ContextProvider);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    ContextProvider.prototype.getChildContext = function getChildContext() {
      return context;
    };

    ContextProvider.prototype.render = function render() {
      return this.props.children;
    };

    return ContextProvider;
  }(React.Component);

  ContextProvider.childContextTypes = childContextTypes;


  return ContextProvider;
}

export var withFocus = function withFocus(WrappedComponent) {
  var FocusableComponent = function (_Component) {
    _inherits(FocusableComponent, _Component);

    function FocusableComponent() {
      var _temp, _this2, _ret;

      _classCallCheck(this, FocusableComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this2), _this2.state = {
        mouseActive: false,
        focus: false
      }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    FocusableComponent.prototype.setMouseActive = function setMouseActive() {
      this.setState({ mouseActive: true });
    };

    FocusableComponent.prototype.resetMouseActive = function resetMouseActive() {
      this.setState({ mouseActive: false });
    };

    FocusableComponent.prototype.setFocus = function setFocus() {
      var mouseActive = this.state.mouseActive;

      if (mouseActive === false) {
        this.setState({ focus: true });
      }
    };

    FocusableComponent.prototype.resetFocus = function resetFocus() {
      this.setState({ focus: false });
    };

    FocusableComponent.prototype.render = function render() {
      var _this3 = this;

      var focus = this.state.focus;

      return React.createElement(WrappedComponent, _extends({
        focus: focus
      }, this.props, {
        onMouseDown: function onMouseDown(event) {
          _this3.setMouseActive();
          var onMouseDown = _this3.props.onMouseDown;

          if (onMouseDown) {
            onMouseDown(event);
          }
        },
        onMouseUp: function onMouseUp(event) {
          _this3.resetMouseActive();
          var onMouseUp = _this3.props.onMouseUp;

          if (onMouseUp) {
            onMouseUp(event);
          }
        },
        onFocus: function onFocus(event) {
          _this3.setFocus();
          var onFocus = _this3.props.onFocus;

          if (onFocus) {
            onFocus(event);
          }
        },
        onBlur: function onBlur(event) {
          _this3.resetFocus();
          var onBlur = _this3.props.onBlur;

          if (onBlur) {
            onBlur(event);
          }
        }
      }));
    };

    return FocusableComponent;
  }(Component);

  return FocusableComponent;
};

var withTheme = function withTheme(WrappedComponent) {
  var ThemedComponent = function (_Component2) {
    _inherits(ThemedComponent, _Component2);

    function ThemedComponent() {
      _classCallCheck(this, ThemedComponent);

      return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
    }

    ThemedComponent.prototype.render = function render() {
      var _props = this.props,
          theme = _props.theme,
          rest = _objectWithoutProperties(_props, ['theme']);

      var contextTheme = this.context.theme;

      var localTheme = deepAssign({}, contextTheme, theme);
      return React.createElement(WrappedComponent, _extends({ theme: localTheme }, rest));
    };

    return ThemedComponent;
  }(Component);

  ThemedComponent.contextTypes = {
    theme: PropTypes.object
  };


  return ThemedComponent;
};

export { withTheme };
export default { createContextProvider: createContextProvider, withFocus: withFocus, withTheme: withTheme };