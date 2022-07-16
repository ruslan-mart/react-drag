"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIframeSkipEvents = void 0;
var react_1 = require("react");
var CSS_TEXT = "\n  iframe, frameset, object {\n    pointer-events: none !important;\n  }\n";
/**
 * Private hook that blocks iframes from intercepting the cursor
 * @param value enable or disable
 */
var useIframeSkipEvents = function (value) {
    (0, react_1.useLayoutEffect)(function () {
        if (document.styleSheets.length === 0) {
            var styleNode = document.createElement('style');
            document.head.appendChild(styleNode);
        }
    }, []);
    (0, react_1.useLayoutEffect)(function () {
        if (value) {
            var sheet_1 = document.styleSheets[document.styleSheets.length - 1];
            var index_1 = sheet_1.insertRule(CSS_TEXT, sheet_1.cssRules.length);
            return function () { return sheet_1.deleteRule(index_1); };
        }
        return;
    }, [value]);
};
exports.useIframeSkipEvents = useIframeSkipEvents;
