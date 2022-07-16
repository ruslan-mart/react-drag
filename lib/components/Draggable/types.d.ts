import type { HTMLAttributes } from 'react';
import { HandlersProps } from '../../types/Handlers';
/**
 * Props object for Draggable component
 */
export interface DraggableProps extends HandlersProps, Omit<HTMLAttributes<HTMLElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'> {
    /**
     * Optional prop that sets an element type (`div`, `span`, `img`, etc.).
     * @default "div"
     */
    as?: keyof JSX.IntrinsicElements;
    /**
     * Optional prop needed for enabling/disabling the element to be «draggable».
     * Use this prop if you need to disable the element to be «draggable» for some conditions.
     * @default false
     */
    disabled?: boolean;
}
