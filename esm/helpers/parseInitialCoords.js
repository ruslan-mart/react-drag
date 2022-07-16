export var parseInitialCoords = function (node) {
    var _a = window.getComputedStyle(node), left = _a.left, top = _a.top;
    return [parseFloat(left), parseFloat(top)];
};
