"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _app = require("./components/app/app.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var init = function init() {
  var settings = {
    gameTime: 5,
    errorCount: 3
  };

  _reactDom["default"].render(_react["default"].createElement(_app.App, {
    errorCount: settings.errorCount,
    gameTime: settings.gameTime
  }), document.querySelector(".main"));
};

init();
//# sourceMappingURL=index.js.map