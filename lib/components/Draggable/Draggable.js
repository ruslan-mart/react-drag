"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draggable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var useDrag_1 = require("../../hooks/useDrag");
var Context_1 = require("../Context");
exports.Draggable = (0, react_1.forwardRef)(function (props, ref) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, _b = props.disabled, disabled = _b === void 0 ? false : _b, onDrag = props.onDrag, onDragEnd = props.onDragEnd, onDragStart = props.onDragStart, otherProps = tslib_1.__rest(props, ["as", "children", "disabled", "onDrag", "onDragEnd", "onDragStart"]);
    var containerRef = (0, react_1.useRef)(null);
    var notTargetListRef = (0, react_1.useRef)([]);
    var targetListRef = (0, react_1.useRef)([]);
    (0, useDrag_1.useDrag)({
        containerRef: containerRef,
        disabled: disabled,
        notTargetRefList: notTargetListRef.current,
        onDrag: onDrag,
        onDragEnd: onDragEnd,
        onDragStart: onDragStart,
        targetRefList: targetListRef.current,
    });
    (0, react_1.useImperativeHandle)(ref, function () { return containerRef.current; });
    return (0, react_1.createElement)(as, tslib_1.__assign({ ref: containerRef }, otherProps), react_1.default.createElement(Context_1.Context.Provider, { value: {
            notTargetRefList: notTargetListRef.current,
            targetRefList: targetListRef.current,
        } }, children));
});
exports.Draggable.displayName = 'Draggable';
