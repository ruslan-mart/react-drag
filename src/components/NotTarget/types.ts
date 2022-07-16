import type { ForwardedRef, HTMLAttributes } from 'react';

import type { ContextProps } from '../Context';

export interface NotTargetLocalProps extends NotTargetProps {
  context: ContextProps;
  currentRef: ForwardedRef<HTMLElement>;
}

/**
 * Props object for NotTarget component
 */
export interface NotTargetProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional prop that sets an element type (`div`, `span`, `img`, etc.).
   * @default "div"
   */
  as?: keyof JSX.IntrinsicElements;
}
