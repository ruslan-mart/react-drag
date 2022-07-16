import React, { createElement, forwardRef, useRef, useImperativeHandle } from 'react';

import { useDrag } from '../../hooks/useDrag';
import {
  DragCoords,
  DragEndEventHandler,
  DragEventHandler,
  DragStartEventHandler,
} from '../../types/Handlers';

import { Context } from '../Context';
import type { DraggableProps } from './types';

export const Draggable = forwardRef<HTMLElement, DraggableProps>((props, ref) => {
  const {
    as = 'div',
    children,
    disabled = false,
    onDrag,
    onDragEnd,
    onDragStart,
    ...otherProps
  } = props;

  const containerRef = useRef<HTMLElement>(null);
  const notTargetListRef = useRef([]);
  const targetListRef = useRef([]);

  useDrag({
    containerRef,
    disabled,
    notTargetRefList: notTargetListRef.current,
    onDrag,
    onDragEnd,
    onDragStart,
    targetRefList: targetListRef.current,
  });

  useImperativeHandle(ref, () => containerRef.current!);

  return createElement(
    as,
    {
      ref: containerRef,
      ...otherProps,
    },
    <Context.Provider
      value={{
        notTargetRefList: notTargetListRef.current,
        targetRefList: targetListRef.current,
      }}>
      {children}
    </Context.Provider>
  );
});

Draggable.displayName = 'Draggable';

export type {
  DragCoords,
  DragEndEventHandler,
  DragEventHandler,
  DragStartEventHandler,
  DraggableProps,
};
