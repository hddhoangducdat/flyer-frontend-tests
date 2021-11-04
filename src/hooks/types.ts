export interface State {
  positions: Array<{ x: number; y: number }>;
  sizes: Array<{ width: number; height: number }>;
}

export const ACTION_TYPES = {
  CHANGE_POSITION: "CHANGE_POSITION",
  RESIZE: "RESIZE",
  ADD: "ADD",
  REMOVE: "REMOVE",
};
