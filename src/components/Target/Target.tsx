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

import type { TargetLocalProps, TargetProps } from './types';

const TargetLocal: FC<TargetLocalProps> = (props) => {
  const { as = 'div', children, context, currentRef, ...otherProps } = props;

  const { targetRefList } = context;

  const targetRef = useRef<HTMLElement>(null);

  useImperativeHandle(currentRef, () => targetRef.current!);

  useEffect(() => {
    targetRefList.push(targetRef);

    return () => {
      const index = targetRefList.indexOf(targetRef);
      targetRefList.splice(index, 1);
    };
  }, []);

  return createElement(as, {
    children,
    ref: targetRef,
    ...otherProps,
  });
};

export const Target = forwardRef<HTMLElement, TargetProps>((props, currentRef) => {
  const { children, ...otherProps } = props;

  const context = useContext(Context);

  useEffect(() => {
    if (context === null) {
      throw new Error(`"Target" cannot be rendered outside of "Draggable"`);
    }
  }, []);

  return context !== null ? (
    <TargetLocal context={context} currentRef={currentRef} {...otherProps}>
      {children}
    </TargetLocal>
  ) : null;
});

Target.displayName = 'Target';

export type { TargetProps };
