import * as React from "react";

function createStore<State, Actions>(reducer) {
  const initialState = reducer(undefined, {});
  const Context = React.createContext(undefined);

  function consume(mapStateToProps, mapDispatchToProps, Component) {
    return function ConsumingComponent(props) {
      const { state, dispatch } = React.useContext(Context);

      const storeProps = {
        ...(!!mapStateToProps ? mapStateToProps(state) : {}),
        ...(!!mapDispatchToProps ? mapDispatchToProps(dispatch) : {})
      };

      if (!state || !dispatch) {
        throw new Error(`
          state and/or dispatch were not found
          be sure to wrap a component associated with the dataflow origin with RetextProvider`);
      }

      return <Component {...storeProps} {...props} />;
    };
  }

  function RetextProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  return {
    consume,
    RetextProvider
  };
}

export { createStore };
