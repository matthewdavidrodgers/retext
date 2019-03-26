import * as React from "react";

function createStoreProvider (reducer) {
  const initialState = reducer(undefined, { type: "_NO-OP_" });
  const Context = React.createContext(initialState);

  return Context.Provider;
}

export { createStoreProvider };