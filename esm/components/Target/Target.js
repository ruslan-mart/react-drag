import { __assign, __rest } from "tslib";
import React, { createElement, forwardRef, useContext, useEffect, useImperativeHandle, useRef, } from 'react';
import { Context } from '../Context';
var TargetLocal = function (props) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, context = props.context, currentRef = props.currentRef, otherProps = __rest(props, ["as", "children", "context", "currentRef"]);
    var targetRefList = context.targetRefList;
    var targetRef = useRef(null);
    useImperativeHandle(currentRef, function () { return targetRef.current; });
    useEffect(function () {
        targetRefList.push(targetRef);
        return function () {
            var index = targetRefList.indexOf(targetRef);
            targetRefList.splice(index, 1);
        };
    }, []);
    return createElement(as, __assign({ children: children, ref: targetRef }, otherProps));
};
export var Target = forwardRef(function (props, currentRef) {
    var children = props.children, otherProps = __rest(props, ["children"]);
    var context = useContext(Context);
    useEffect(function () {
        if (context === null) {
            throw new Error("\"Target\" cannot be rendered outside of \"Draggable\"");
        }
    }, []);
    return context !== null ? (React.createElement(TargetLocal, __assign({ context: context, currentRef: currentRef }, otherProps), children)) : null;
});
Target.displayName = 'Target';
