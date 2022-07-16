"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePosition = void 0;
var validatePosition = function (node) {
    var position = window.getComputedStyle(node).position;
    return position === 'absolute' || position === 'fixed';
};
exports.validatePosition = validatePosition;
