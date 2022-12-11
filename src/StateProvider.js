// // import React, { createContext, useContext, useReducer } from "react";
// export const StateContext = createContext();
// export const StateProvider = ({ reducer, StateInit, Children }) => {
//   return;
//   <StateContext.Provider value={useReducer(reducer, StateInit)}>
//     {Children}
//   </StateContext.Provider>;
// };
// export const useGlobalState = () => useContext(StateContext);

import { createContext, useContext, useReducer } from "react";
const GlobalContext = createContext();
export const GlobalContextProvider = ({ reducer, initialState, children }) => {
  return (
    <GlobalContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
