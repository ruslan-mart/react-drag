import type { RefObject } from 'react';

import type { DragCoords, HandlersProps } from '../../types/Handlers';

export type LocalDragHandler = (
  event: MouseEvent | TouchEvent,
  coords: DragCoords
) => void | boolean;

export interface UseDragProps extends HandlersProps {
  /**
   * Ref to the element container
   */
  containerRef: RefObject<HTMLElement>;

  /**
   * Indicating that the control is not available for interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * List of element refs to ignore drag
   * @default []
   */
  notTargetRefList?: RefObject<HTMLElement>[];

  /**
   * List of element refs to drag
   * @default []
   */
  targetRefList?: RefObject<HTMLElement>[];
}

/**
 * Object returned by useDrag
 */
export interface UseDragResult {
  /**
   * A value indicating whether the element is currently being dragged
   */
  isDragging: boolean;
}
