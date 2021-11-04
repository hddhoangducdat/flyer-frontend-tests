import { ACTION_TYPES, State } from "./types";

export const useActions = (state: State, dispatch: Function) => ({
  changePosition: (index: number, position: { x: number; y: number }) =>
    dispatch({
      type: ACTION_TYPES.CHANGE_POSITION,
      payload: { index, position },
    }),
  add: () => dispatch({ type: ACTION_TYPES.ADD }),
  remove: (index: number) =>
    dispatch({ type: ACTION_TYPES.REMOVE, payload: { index } }),
  resize: (index: number, size: { width: number; height: number }) =>
    dispatch({ type: ACTION_TYPES.RESIZE, payload: { index, size } }),
});
