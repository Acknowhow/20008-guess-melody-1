"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var App = function App() {
  return _react["default"].createElement("section", {
    className: "welcome"
  }, _react["default"].createElement("div", {
    className: "welcome__logo"
  }, _react["default"].createElement("img", {
    src: "img/melody-logo.png",
    alt: "\u0423\u0433\u0430\u0434\u0430\u0439 \u043C\u0435\u043B\u043E\u0434\u0438\u044E",
    width: "186",
    height: "83"
  })), _react["default"].createElement("button", {
    className: "welcome__button"
  }, _react["default"].createElement("span", {
    className: "visually-hidden"
  }, "\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443")), _react["default"].createElement("h2", {
    className: "welcome__rules-title"
  }, "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438\u0433\u0440\u044B"), _react["default"].createElement("p", {
    className: "welcome__text"
  }, "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0440\u043E\u0441\u0442\u044B:"), _react["default"].createElement("ul", {
    className: "welcome__rules-list"
  }, _react["default"].createElement("li", null, "\u0417\u0430 5 \u043C\u0438\u043D\u0443\u0442 \u043D\u0443\u0436\u043D\u043E \u043E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u043D\u0430 \u0432\u0441\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B."), _react["default"].createElement("li", null, "\u041C\u043E\u0436\u043D\u043E \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C 3 \u043E\u0448\u0438\u0431\u043A\u0438.")), _react["default"].createElement("p", {
    className: "welcome__text"
  }, "\u0423\u0434\u0430\u0447\u0438!"));
};

exports.App = App;
//# sourceMappingURL=app.js.map