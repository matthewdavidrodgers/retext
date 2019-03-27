import * as React from "react";

function createStore (reducer) {
  const initialState = reducer();
  const Context = React.createContext(undefined);

  function consume(mapStateToProps, mapDispatchToProps, Component) {
    const { state, dispatch } = React.useContext(Context);
    if (!state || !dispatch) {
      throw new Error(`
        state and/or dispatch were not found
        be sure to wrap a component associated with the dataflow origin with RetextProvider`
      );
    }
    return <Component {...mapStateToProps(state)} {...mapDispatchToProps(dispatch)} />;
  }

  function RetextProvider ({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }

  return {
    consume,
    RetextProvider
  };
}

export { createStore };