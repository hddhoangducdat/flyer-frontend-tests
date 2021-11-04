import { useCallback } from "react";
import { State } from "./types";

export const useSelectors = (state: State) => ({
  position: (index: number): { x: number; y: number } => {
    return state.positions[index];
  },
  size: (index: number): { width: number; height: number } => {
    return state.sizes[index];
  },
});
