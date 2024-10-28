import { create, StoreApi } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { ReadingState, reading } from './reading';

interface OtherState {
  [stateName: string]: any;
}

/**
 * State tree
 */
type State = OtherState & ReadingState;

type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];

/**
 * 使用仓库model
 */
const useModel = create<State>((setState: SetState, getState: GetState) => ({
  ...reading(setState, getState),
}));

export type { State, GetState, SetState };
export { useModel, useShallow };
export default useModel;
