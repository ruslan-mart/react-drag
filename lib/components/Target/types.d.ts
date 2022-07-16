import type { ForwardedRef, HTMLAttributes } from 'react';
import type { ContextProps } from '../Context';
export interface TargetLocalProps extends TargetProps {
    context: ContextProps;
    currentRef: ForwardedRef<HTMLElement>;
}
/**
 * Props object for Target component
 */
export interface TargetProps extends HTMLAttributes<HTMLElement> {
    /**
     * Optional prop that sets an element type (`div`, `span`, `img`, etc.).
     * @default "div"
     */
    as?: keyof JSX.IntrinsicElements;
}
