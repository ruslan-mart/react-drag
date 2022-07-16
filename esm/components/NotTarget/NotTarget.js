import { __assign, __rest } from "tslib";
import React, { createElement, forwardRef, useContext, useEffect, useImperativeHandle, useRef, } from 'react';
import { Context } from '../Context';
var NotTargetLocal = function (props) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, context = props.context, currentRef = props.currentRef, otherProps = __rest(props, ["as", "children", "context", "currentRef"]);
    var notTargetRefList = useContext(Context).notTargetRefList;
    var notTargetRef = useRef(null);
    useImperativeHandle(currentRef, function () { return notTargetRef.current; });
    useEffect(function () {
        notTargetRefList.push(notTargetRef);
        return function () {
            var index = notTargetRefList.indexOf(notTargetRef);
            notTargetRefList.splice(index, 1);
        };
    }, []);
    return createElement(as, __assign({ children: children, ref: notTargetRef }, otherProps));
};
export var NotTarget = forwardRef(function (props, currentRef) {
    var children = props.children, otherProps = __rest(props, ["children"]);
    var context = useContext(Context);
    useEffect(function () {
        if (context === null) {
            throw new Error("\"NotTarget\" cannot be rendered outside of \"Draggable\"");
        }
    }, []);
    return context !== null ? (React.createElement(NotTargetLocal, __assign({ context: context, currentRef: currentRef }, otherProps), children)) : null;
});
NotTarget.displayName = 'NotTarget';
