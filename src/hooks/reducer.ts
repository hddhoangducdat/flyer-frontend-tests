import { ACTION_TYPES, State } from "./types";

const BOXES_COUNT = 10;
const BOXES_PER_ROW = 5;

export const initialState: State = {
  positions: Array.from({ length: BOXES_COUNT }).map((_, index) => ({
    x: 100 + (150 + 100) * (index % BOXES_PER_ROW),
    y: 20 + (150 + 50) * Math.floor(index / BOXES_PER_ROW),
  })),
  sizes: Array.from({ length: BOXES_COUNT }).map((_, index) => ({
    width: 150,
    height: 150,
  })),
};

export const reducer = (
  state = initialState,
  action: { type: String; payload: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_POSITION:
      return {
        ...state,
        positions: state.positions.map((value, i) => {
          return i !== action.payload.index ? value : action.payload.position;
        }),
      };
    case ACTION_TYPES.ADD:
      return {
        positions: [...state.positions, { x: 0, y: 0 }],
        sizes: [...state.sizes, { width: 150, height: 150 }],
      };

    case ACTION_TYPES.REMOVE:
      return {
        positions: state.positions.filter((_, i) => action.payload.index !== i),
        sizes: state.sizes.filter((_, i) => action.payload.index !== i),
      };

    case ACTION_TYPES.RESIZE:
      return {
        ...state,
        sizes: state.sizes.map((value, i) => {
          return i !== action.payload.index ? value : action.payload.size;
        }),
      };
    default:
      return state;
  }
};
