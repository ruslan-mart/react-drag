import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { checkTarget } from '../../helpers/checkTarget';
import { parseInitialCoords } from '../../helpers/parseInitialCoords';
import { validatePosition } from '../../helpers/validatePosition';
import { HandlersProps } from '../../types/Handlers';

import { useIframeSkipEvents } from '../useIframeSkipEvents';

import type { LocalDragHandler, UseDragProps, UseDragResult } from './types';

/**
 * This hook will allow you to make your elements draggable
 * @param props object with parameters
 */
export const useDrag = (props: UseDragProps): UseDragResult => {
  const {
    containerRef,
    disabled = false,
    notTargetRefList = [],
    onDrag,
    onDragEnd,
    onDragStart,
    targetRefList = [],
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const disabledRef = useRef(disabled);
  const handlersRef = useRef<HandlersProps>();
  const notTargetRefListRef = useRef(notTargetRefList);
  const targetRefListRef = useRef(targetRefList);

  useIframeSkipEvents(isDragging);

  useImperativeHandle(disabledRef, () => disabled);
  useImperativeHandle(handlersRef, () => ({ onDrag, onDragEnd, onDragStart }));
  useImperativeHandle(notTargetRefListRef, () => notTargetRefList);
  useImperativeHandle(targetRefListRef, () => targetRefList);

  useEffect(() => {
    const containerNode = containerRef.current;

    if (containerNode === null) {
      throw new Error(`"containerRef" can't be null`);
    }

    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let startX = 0;
    let startY = 0;

    let isDraggingValue = false;

    const handlers: Record<string, LocalDragHandler> = {
      end(event) {
        const { onDragEnd = null } = handlersRef.current!;

        if (onDragEnd !== null) {
          onDragEnd([currentX, currentY], event);
        }

        resetDocumentListeners();
      },

      move(event, coords) {
        if (disabledRef.current) {
          return handlers.end(event, coords);
        }

        if (!isDraggingValue) {
          const { onDragStart = null } = handlersRef.current!;

          if (onDragStart !== null && onDragStart([initialX, initialY], event) === false) {
            return handlers.end(event, coords);
          }

          isDraggingValue = true;
          setIsDragging(true);
        }

        const { onDrag = null } = handlersRef.current!;
        const [clientX, clientY] = coords;

        currentX = initialX + clientX - startX;
        currentY = initialY + clientY - startY;

        if (onDrag !== null) {
          const handlerValue = onDrag([currentX, currentY], event);

          if (handlerValue === false) {
            return handlers.end(event, coords);
          }

          if (Array.isArray(handlerValue)) {
            currentX = Number(handlerValue[0]) || 0;
            currentY = Number(handlerValue[1]) || 0;
          }
        }

        window.requestAnimationFrame(updateDOM);
      },

      start(event, coords) {
        if (!disabledRef.current) {
          if (!validatePosition(containerNode)) {
            return console.warn(
              `Drag and drop only works on elements with position set as absolute or fixed`
            );
          }

          if (
            checkTarget(
              containerNode,
              event.target as HTMLElement,
              targetRefListRef.current,
              notTargetRefListRef.current
            )
          ) {
            const [clientX, clientY] = coords;

            [initialX, initialY] = parseInitialCoords(containerNode);
            startX = clientX;
            startY = clientY;

            event.preventDefault();
            return true;
          }
        }
      },
    };

    const listeners = {
      mouseDown(event: MouseEvent) {
        if (event.button === 0) {
          const { clientX, clientY } = event;

          const handlerResult = handlers.start(event, [clientX, clientY]);

          if (handlerResult) {
            document.addEventListener('mousemove', listeners.mouseMove);
            document.addEventListener('mouseup', listeners.mouseUp);
          }
        }
      },

      mouseMove(event: MouseEvent) {
        const { clientX, clientY } = event;

        handlers.move(event, [clientX, clientY]);
      },

      mouseUp(event: MouseEvent) {
        const { clientX, clientY } = event;

        handlers.end(event, [clientX, clientY]);
      },

      touchEnd(event: TouchEvent) {
        handlers.end(event, [0, 0]);
      },

      touchMove(event: TouchEvent) {
        const { clientX, clientY } = event.touches[0];

        handlers.move(event, [clientX, clientY]);
      },

      touchStart(event: TouchEvent) {
        const { clientX, clientY } = event.touches[0];

        const handlerResult = handlers.start(event, [clientX, clientY]);

        if (handlerResult) {
          document.addEventListener('touchmove', listeners.touchMove);
          document.addEventListener('touchend', listeners.touchEnd);
        }
      },
    };

    const resetDocumentListeners = () => {
      isDraggingValue = false;
      setIsDragging(false);

      document.removeEventListener('mousemove', listeners.mouseMove);
      document.removeEventListener('mouseup', listeners.mouseUp);
      document.removeEventListener('touchmove', listeners.touchMove);
      document.removeEventListener('touchend', listeners.touchEnd);
    };

    const updateDOM = () => {
      containerNode.style.left = `${currentX}px`;
      containerNode.style.top = `${currentY}px`;
    };

    containerNode.addEventListener('mousedown', listeners.mouseDown);
    containerNode.addEventListener('touchstart', listeners.touchStart);

    return () => {
      containerNode.removeEventListener('mousedown', listeners.mouseDown);
      containerNode.removeEventListener('touchstart', listeners.touchStart);
      resetDocumentListeners();
    };
  }, []);

  return { isDragging };
};

export type { UseDragProps, UseDragResult };
