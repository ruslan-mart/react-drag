"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDrag = void 0;
var react_1 = require("react");
var checkTarget_1 = require("../../helpers/checkTarget");
var parseInitialCoords_1 = require("../../helpers/parseInitialCoords");
var validatePosition_1 = require("../../helpers/validatePosition");
var useIframeSkipEvents_1 = require("../useIframeSkipEvents");
/**
 * This hook will allow you to make your elements draggable
 * @param props object with parameters
 */
var useDrag = function (props) {
    var containerRef = props.containerRef, _a = props.disabled, disabled = _a === void 0 ? false : _a, _b = props.notTargetRefList, notTargetRefList = _b === void 0 ? [] : _b, onDrag = props.onDrag, onDragEnd = props.onDragEnd, onDragStart = props.onDragStart, _c = props.targetRefList, targetRefList = _c === void 0 ? [] : _c;
    var _d = (0, react_1.useState)(false), isDragging = _d[0], setIsDragging = _d[1];
    var disabledRef = (0, react_1.useRef)(disabled);
    var handlersRef = (0, react_1.useRef)();
    var notTargetRefListRef = (0, react_1.useRef)(notTargetRefList);
    var targetRefListRef = (0, react_1.useRef)(targetRefList);
    (0, useIframeSkipEvents_1.useIframeSkipEvents)(isDragging);
    (0, react_1.useImperativeHandle)(disabledRef, function () { return disabled; });
    (0, react_1.useImperativeHandle)(handlersRef, function () { return ({ onDrag: onDrag, onDragEnd: onDragEnd, onDragStart: onDragStart }); });
    (0, react_1.useImperativeHandle)(notTargetRefListRef, function () { return notTargetRefList; });
    (0, react_1.useImperativeHandle)(targetRefListRef, function () { return targetRefList; });
    (0, react_1.useEffect)(function () {
        var containerNode = containerRef.current;
        if (containerNode === null) {
            throw new Error("\"containerRef\" can't be null");
        }
        var currentX = 0;
        var currentY = 0;
        var initialX = 0;
        var initialY = 0;
        var startX = 0;
        var startY = 0;
        var isDraggingValue = false;
        var handlers = {
            end: function (event) {
                var _a = handlersRef.current.onDragEnd, onDragEnd = _a === void 0 ? null : _a;
                if (onDragEnd !== null) {
                    onDragEnd([currentX, currentY], event);
                }
                resetDocumentListeners();
            },
            move: function (event, coords) {
                if (disabledRef.current) {
                    return handlers.end(event, coords);
                }
                if (!isDraggingValue) {
                    var _a = handlersRef.current.onDragStart, onDragStart_1 = _a === void 0 ? null : _a;
                    if (onDragStart_1 !== null && onDragStart_1([initialX, initialY], event) === false) {
                        return handlers.end(event, coords);
                    }
                    isDraggingValue = true;
                    setIsDragging(true);
                }
                var _b = handlersRef.current.onDrag, onDrag = _b === void 0 ? null : _b;
                var clientX = coords[0], clientY = coords[1];
                currentX = initialX + clientX - startX;
                currentY = initialY + clientY - startY;
                if (onDrag !== null) {
                    var handlerValue = onDrag([currentX, currentY], event);
                    if (handlerValue === false) {
                        return handlers.end(event, coords);
                    }
                    if (Array.isArray(handlerValue)) {
                        currentX = Number(handlerValue[0]) || 0;
                        currentY = Number(handlerValue[1]) || 0;
                    }
                }
                window.requestAnimationFrame(removeSelection);
                window.requestAnimationFrame(updateStyleValues);
            },
            start: function (event, coords) {
                var _a;
                if (!disabledRef.current) {
                    if (!(0, validatePosition_1.validatePosition)(containerNode)) {
                        return console.warn("Drag and drop only works on elements with position set as absolute or fixed");
                    }
                    if ((0, checkTarget_1.checkTarget)(containerNode, event.target, targetRefListRef.current, notTargetRefListRef.current)) {
                        var clientX = coords[0], clientY = coords[1];
                        _a = (0, parseInitialCoords_1.parseInitialCoords)(containerNode), initialX = _a[0], initialY = _a[1];
                        startX = clientX;
                        startY = clientY;
                        return true;
                    }
                }
            },
        };
        var listeners = {
            mouseDown: function (event) {
                if (event.button === 0) {
                    var clientX = event.clientX, clientY = event.clientY;
                    var handlerResult = handlers.start(event, [clientX, clientY]);
                    if (handlerResult) {
                        document.addEventListener('mousemove', listeners.mouseMove);
                        document.addEventListener('mouseup', listeners.mouseUp);
                    }
                }
            },
            mouseMove: function (event) {
                var clientX = event.clientX, clientY = event.clientY;
                handlers.move(event, [clientX, clientY]);
            },
            mouseUp: function (event) {
                var clientX = event.clientX, clientY = event.clientY;
                handlers.end(event, [clientX, clientY]);
            },
            touchEnd: function (event) {
                handlers.end(event, [0, 0]);
            },
            touchMove: function (event) {
                var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
                handlers.move(event, [clientX, clientY]);
            },
            touchStart: function (event) {
                var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
                var handlerResult = handlers.start(event, [clientX, clientY]);
                if (handlerResult) {
                    document.addEventListener('touchmove', listeners.touchMove);
                    document.addEventListener('touchend', listeners.touchEnd);
                }
            },
        };
        var resetDocumentListeners = function () {
            isDraggingValue = false;
            setIsDragging(false);
            document.removeEventListener('mousemove', listeners.mouseMove);
            document.removeEventListener('mouseup', listeners.mouseUp);
            document.removeEventListener('touchmove', listeners.touchMove);
            document.removeEventListener('touchend', listeners.touchEnd);
        };
        var removeSelection = function () {
            var _a;
            (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        };
        var updateStyleValues = function () {
            containerNode.style.left = "".concat(currentX, "px");
            containerNode.style.top = "".concat(currentY, "px");
        };
        containerNode.addEventListener('mousedown', listeners.mouseDown);
        containerNode.addEventListener('touchstart', listeners.touchStart);
        return function () {
            containerNode.removeEventListener('mousedown', listeners.mouseDown);
            containerNode.removeEventListener('touchstart', listeners.touchStart);
            resetDocumentListeners();
        };
    }, []);
    return { isDragging: isDragging };
};
exports.useDrag = useDrag;
