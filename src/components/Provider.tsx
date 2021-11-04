import React, { createContext, useReducer } from "react";
import { useActions } from "../hooks/actions";
import { initialState, reducer } from "../hooks/reducer";
import { State } from "../hooks/types";
import { useSelectors } from "../hooks/useSelectors";

export type ContextType = {
  state: State;
  actions: ReturnType<typeof useActions>;
  selectors: ReturnType<typeof useSelectors>;
};

const initialContext: ContextType = {
  state: { ...initialState },
  actions: {
    changePosition: (index: number, position: { x: number; y: number }) =>
      undefined,
    add: () => undefined,
    remove: (index: number) => undefined,
    resize: (index: number, size: { width: number; height: number }) =>
      undefined,
  },
  selectors: {
    position: (index: number): { x: number; y: number } => ({ x: 0, y: 0 }),
    size: (index: number): { width: number; height: number } => ({
      width: 0,
      height: 0,
    }),
  },
};

export const Context = createContext<ContextType>(initialContext);

export const Provider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);
  const selectors = useSelectors(state);

  return (
    <Context.Provider value={{ state, actions, selectors }}>
      {children}
    </Context.Provider>
  );
};
