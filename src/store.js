import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

export const sections = { home: 0, work: 1, project: 2, contact: 3 };

const initialState = {
  mainScrollBar: null,
  appState: null,
  scrollingPosition: {
    x: 0,
    y: 0,
    horizontalScrollDirection: "down",
    verticleScrollDirection: "right",
  },
  windowSize: { height: undefined, width: undefined },
  activeSection: sections.home,
  rootObserver: null,
  sectionElements: new Map(),
  cursorScale: 1,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
