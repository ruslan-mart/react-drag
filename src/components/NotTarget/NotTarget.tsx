import React, {
  createElement,
  FC,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { Context } from '../Context';

import type { NotTargetLocalProps, NotTargetProps } from './types';

const NotTargetLocal: FC<NotTargetLocalProps> = (props) => {
  const { as = 'div', children, context, currentRef, ...otherProps } = props;

  const { notTargetRefList } = useContext(Context)!;

  const notTargetRef = useRef<HTMLElement>(null);

  useImperativeHandle(currentRef, () => notTargetRef.current!);

  useEffect(() => {
    notTargetRefList.push(notTargetRef);

    return () => {
      const index = notTargetRefList.indexOf(notTargetRef);
      notTargetRefList.splice(index, 1);
    };
  }, []);

  return createElement(as, {
    children,
    ref: notTargetRef,
    ...otherProps,
  });
};

export const NotTarget = forwardRef<HTMLElement, NotTargetProps>((props, currentRef) => {
  const { children, ...otherProps } = props;

  const context = useContext(Context);

  useEffect(() => {
    if (context === null) {
      throw new Error(`"NotTarget" cannot be rendered outside of "Draggable"`);
    }
  }, []);

  return context !== null ? (
    <NotTargetLocal context={context} currentRef={currentRef} {...otherProps}>
      {children}
    </NotTargetLocal>
  ) : null;
});

NotTarget.displayName = 'NotTarget';

export type { NotTargetProps };
