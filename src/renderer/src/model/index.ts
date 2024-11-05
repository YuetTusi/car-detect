// import { StoreApi } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { ReadingState, useReading } from './reading';
import { RfState, useRf } from './rf';

interface OtherState {
  [stateName: string]: any;
}

/**
 * State tree
 */
// type State = OtherState & ReadingState & RfState;
// type GetState = StoreApi<State>['getState'];
// type SetState = StoreApi<State>['setState'];

// export type { State, GetState, SetState };
export { useShallow, useReading, useRf };
