import type { RefObject } from 'react';

export const checkTarget = (
  container: HTMLElement,
  target: HTMLElement,
  targetRefList: RefObject<HTMLElement>[],
  notTargetRefList: RefObject<HTMLElement>[]
) => {
  if (targetRefList.length !== 0 || notTargetRefList.length !== 0) {
    let currentNode: HTMLElement | null = target;

    const isCurrentNode = (ref: RefObject<HTMLElement>) => ref.current === currentNode;

    while (currentNode !== container && currentNode !== null) {
      if (notTargetRefList.some(isCurrentNode)) {
        return false;
      }

      if (targetRefList.some(isCurrentNode)) {
        return true;
      }

      currentNode = currentNode.parentElement;
    }
  }

  return targetRefList.length === 0;
};
