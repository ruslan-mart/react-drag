export var checkTarget = function (container, target, targetRefList, notTargetRefList) {
    if (targetRefList.length !== 0 || notTargetRefList.length !== 0) {
        var currentNode_1 = target;
        var isCurrentNode = function (ref) { return ref.current === currentNode_1; };
        while (currentNode_1 !== container && currentNode_1 !== null) {
            if (notTargetRefList.some(isCurrentNode)) {
                return false;
            }
            if (targetRefList.some(isCurrentNode)) {
                return true;
            }
            currentNode_1 = currentNode_1.parentElement;
        }
    }
    return targetRefList.length === 0;
};
