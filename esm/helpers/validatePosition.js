export var validatePosition = function (node) {
    var position = window.getComputedStyle(node).position;
    return position === 'absolute' || position === 'fixed';
};
