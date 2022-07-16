"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var Context_1 = require("../Context");
var TargetLocal = function (props) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, context = props.context, currentRef = props.currentRef, otherProps = tslib_1.__rest(props, ["as", "children", "context", "currentRef"]);
    var targetRefList = context.targetRefList;
    var targetRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(currentRef, function () { return targetRef.current; });
    (0, react_1.useEffect)(function () {
        targetRefList.push(targetRef);
        return function () {
            var index = targetRefList.indexOf(targetRef);
            targetRefList.splice(index, 1);
        };
    }, []);
    return (0, react_1.createElement)(as, tslib_1.__assign({ children: children, ref: targetRef }, otherProps));
};
exports.Target = (0, react_1.forwardRef)(function (props, currentRef) {
    var children = props.children, otherProps = tslib_1.__rest(props, ["children"]);
    var context = (0, react_1.useContext)(Context_1.Context);
    (0, react_1.useEffect)(function () {
        if (context === null) {
            throw new Error("\"Target\" cannot be rendered outside of \"Draggable\"");
        }
    }, []);
    return context !== null ? (react_1.default.createElement(TargetLocal, tslib_1.__assign({ context: context, currentRef: currentRef }, otherProps), children)) : null;
});
exports.Target.displayName = 'Target';
