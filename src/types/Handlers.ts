type DragBaseEventHandler<ReturnType> = (
  coords: DragCoords,
  nativeEvent: MouseEvent | TouchEvent
) => ReturnType;

/**
 * Element position coordinates
 * Array of two values (x, y)
 */
export type DragCoords = [number, number];

/**
 * The drag event handler function
 * @param coords an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
 * @param nativeEvent a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.
 * @returns void — the event will be executed with default values.
 * @returns false — use this if you need to abort the element's «dragging».
 * @returns newCoords — an array of two numeric values (`x`, `y`), and those contain new values for element's position.
 */
export type DragEventHandler = DragBaseEventHandler<void | boolean | DragCoords>;

/**
 * The dragEnd event handler function
 * @param coords an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
 * @param nativeEvent a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.
 * @returns void
 */
export type DragEndEventHandler = DragBaseEventHandler<void>;

/**
 * The dragEnd event handler function
 * @param coords an array of two numeric values (`x`, `y`), and those contain information about the element's current position (in the moment of event's call).
 * @param nativeEvent a native event's object that is initialized after completion of `MouseEvent` or `TouchEvent` (depending on device's type). It should be used with caution. If you need to get `MouseEvent`'s props, you better specify condition `nativeEvent.type.startsWith('mouse')`.
 * @returns void — the event will be executed with default values.
 * @returns false — use this if you need to abort the element's «dragging».
 */
export type DragStartEventHandler = DragBaseEventHandler<void | boolean>;

/**
 * handlers props
 */
export interface HandlersProps {
  /**
   * Optional function that is an event handler and is called out in every change of element's position during its «dragging».
   */
  onDrag?: DragEventHandler;

  /**
   * Optional function that is an event handler and is called out after completion of element's «dragging».
   */
  onDragEnd?: DragEndEventHandler;

  /**
   * Optional function that is an event handler and is called out before the start of «dragging».
   */
  onDragStart?: DragStartEventHandler;
}
