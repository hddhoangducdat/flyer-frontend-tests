import { useCallback } from "react";
import { State } from "./types";

export const useSelectors = (state: State) => ({
  position: (index: number): { x: number; y: number } => {
    const result = useCallback(() => {
      return state.positions[index];
    }, [state.positions[index]]);

    return result();
  },
  size: (index: number): { width: number; height: number } => {
    const result = useCallback(() => {
      return state.sizes[index];
    }, [state.sizes[index]]);

    return result();
  },
});
