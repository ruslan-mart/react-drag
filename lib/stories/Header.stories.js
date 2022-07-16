"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedOut = exports.LoggedIn = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Header_1 = require("./Header");
exports.default = {
    title: 'Example/Header',
    component: Header_1.Header,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
};
var Template = function (args) { return react_1.default.createElement(Header_1.Header, tslib_1.__assign({}, args)); };
exports.LoggedIn = Template.bind({});
exports.LoggedIn.args = {
    user: {
        name: 'Jane Doe',
    },
};
exports.LoggedOut = Template.bind({});
exports.LoggedOut.args = {};
