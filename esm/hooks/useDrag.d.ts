import { RefObject } from 'react';
import { DragEndEventHandler, DragEventHandler, DragStartEventHandler } from '../components/Draggable';
export interface UseDragHandlers {
    onDrag?: DragEventHandler;
    onDragEnd?: DragEndEventHandler;
    onDragStart?: DragStartEventHandler;
}
export interface UseDragProps extends UseDragHandlers {
    containerRef: RefObject<HTMLElement>;
    disabled?: boolean;
    notTargetRefList?: RefObject<HTMLElement>[];
    targetRefList?: RefObject<HTMLElement>[];
}
export declare const useDrag: (props: UseDragProps) => {
    isDragging: boolean;
};
