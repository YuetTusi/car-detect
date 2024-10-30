import { StoreApi } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { ReadingState, useReading } from './reading';

interface OtherState {
  [stateName: string]: any;
}

/**
 * State tree
 */
type State = OtherState & ReadingState;
type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];

export type { State, GetState, SetState };
export { useShallow, useReading };
