"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInitialCoords = void 0;
var parseInitialCoords = function (node) {
    var _a = window.getComputedStyle(node), left = _a.left, top = _a.top;
    return [parseFloat(left), parseFloat(top)];
};
exports.parseInitialCoords = parseInitialCoords;
