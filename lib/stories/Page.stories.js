"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedIn = exports.LoggedOut = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var testing_library_1 = require("@storybook/testing-library");
var Page_1 = require("./Page");
exports.default = {
    title: 'Example/Page',
    component: Page_1.Page,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
};
var Template = function (args) { return react_1.default.createElement(Page_1.Page, tslib_1.__assign({}, args)); };
exports.LoggedOut = Template.bind({});
exports.LoggedIn = Template.bind({});
// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
exports.LoggedIn.play = function (_a) {
    var canvasElement = _a.canvasElement;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var canvas, loginButton;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    canvas = (0, testing_library_1.within)(canvasElement);
                    return [4 /*yield*/, canvas.getByRole('button', { name: /Log in/i })];
                case 1:
                    loginButton = _b.sent();
                    return [4 /*yield*/, testing_library_1.userEvent.click(loginButton)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
