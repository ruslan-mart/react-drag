import { createContext, RefObject } from 'react';

export interface ContextProps {
  notTargetRefList: RefObject<HTMLElement>[];
  targetRefList: RefObject<HTMLElement>[];
}

export const Context = createContext<ContextProps | null>(null);
