"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
require("./button.css");
/**
 * Primary UI component for user interaction
 */
var Button = function (_a) {
    var _b = _a.primary, primary = _b === void 0 ? false : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, backgroundColor = _a.backgroundColor, label = _a.label, props = tslib_1.__rest(_a, ["primary", "size", "backgroundColor", "label"]);
    var mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
    return (react_1.default.createElement("button", tslib_1.__assign({ type: "button", className: ['storybook-button', "storybook-button--".concat(size), mode].join(' '), style: { backgroundColor: backgroundColor } }, props), label));
};
exports.Button = Button;
