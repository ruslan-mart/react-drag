"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotTarget = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var Context_1 = require("../Context");
var NotTargetLocal = function (props) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, context = props.context, currentRef = props.currentRef, otherProps = tslib_1.__rest(props, ["as", "children", "context", "currentRef"]);
    var notTargetRefList = (0, react_1.useContext)(Context_1.Context).notTargetRefList;
    var notTargetRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(currentRef, function () { return notTargetRef.current; });
    (0, react_1.useEffect)(function () {
        notTargetRefList.push(notTargetRef);
        return function () {
            var index = notTargetRefList.indexOf(notTargetRef);
            notTargetRefList.splice(index, 1);
        };
    }, []);
    return (0, react_1.createElement)(as, tslib_1.__assign({ children: children, ref: notTargetRef }, otherProps));
};
exports.NotTarget = (0, react_1.forwardRef)(function (props, currentRef) {
    var children = props.children, otherProps = tslib_1.__rest(props, ["children"]);
    var context = (0, react_1.useContext)(Context_1.Context);
    (0, react_1.useEffect)(function () {
        if (context === null) {
            throw new Error("\"NotTarget\" cannot be rendered outside of \"Draggable\"");
        }
    }, []);
    return context !== null ? (react_1.default.createElement(NotTargetLocal, tslib_1.__assign({ context: context, currentRef: currentRef }, otherProps), children)) : null;
});
exports.NotTarget.displayName = 'NotTarget';
