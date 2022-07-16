import { RefObject } from 'react';
export interface ContextProps {
    notTargetRefList: RefObject<HTMLElement>[];
    targetRefList: RefObject<HTMLElement>[];
}
export declare const Context: import("react").Context<ContextProps | null>;
