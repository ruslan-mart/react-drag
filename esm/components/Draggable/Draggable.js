import { __assign, __rest } from "tslib";
import React, { createElement, forwardRef, useRef, useImperativeHandle } from 'react';
import { useDrag } from '../../hooks/useDrag';
import { Context } from '../Context';
export var Draggable = forwardRef(function (props, ref) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, _b = props.disabled, disabled = _b === void 0 ? false : _b, onDrag = props.onDrag, onDragEnd = props.onDragEnd, onDragStart = props.onDragStart, otherProps = __rest(props, ["as", "children", "disabled", "onDrag", "onDragEnd", "onDragStart"]);
    var containerRef = useRef(null);
    var notTargetListRef = useRef([]);
    var targetListRef = useRef([]);
    useDrag({
        containerRef: containerRef,
        disabled: disabled,
        notTargetRefList: notTargetListRef.current,
        onDrag: onDrag,
        onDragEnd: onDragEnd,
        onDragStart: onDragStart,
        targetRefList: targetListRef.current,
    });
    useImperativeHandle(ref, function () { return containerRef.current; });
    return createElement(as, __assign({ ref: containerRef }, otherProps), React.createElement(Context.Provider, { value: {
            notTargetRefList: notTargetListRef.current,
            targetRefList: targetListRef.current,
        } }, children));
});
Draggable.displayName = 'Draggable';
