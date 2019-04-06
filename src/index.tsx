import * as React from "react";

type RetextReducer<State, Actions> = (
  state: State | undefined,
  actions: Actions
) => State;

type RetextDispatch<Actions> = (action: Actions) => void;

type RetextMapStateToProps<State, StateProps> = (state: State) => StateProps;

type RetextMapDispatchToProps<Actions, DispatchProps> = (
  dispatch: RetextDispatch<Actions>
) => DispatchProps;

interface RetextContext<State, Actions> {
  state: State;
  dispatch: RetextDispatch<Actions>;
}

function createStore<State, Actions>(
  reducer: RetextReducer<State, Actions>,
  initialState: State
) {
  interface StoreContext extends RetextContext<State, Actions> {}

  const Context = React.createContext<StoreContext>({
    state: initialState,
    dispatch: () => {}
  });

  function consume<OwnProps, StateProps, DispatchProps>(
    mapStateToProps: RetextMapStateToProps<State, StateProps>,
    mapDispatchToProps: RetextMapDispatchToProps<Actions, DispatchProps>,
    Component: React.FC<OwnProps & StateProps & DispatchProps>
  ) {
    const ConsumingComponent: React.FC<
      OwnProps & StateProps & DispatchProps
    > = (props: OwnProps) => {
      const { state, dispatch } = React.useContext(Context);

      const storeProps = {
        ...mapStateToProps(state),
        ...mapDispatchToProps(dispatch)
      };

      if (!state || !dispatch) {
        throw new Error(`
          state and/or dispatch were not found
          be sure to wrap a component associated with the dataflow origin with RetextProvider`);
      }

      return <Component {...storeProps} {...props} />;
    };

    return ConsumingComponent;
  }

  const RetextProvider: React.FC<{}> = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return {
    consume,
    RetextProvider
  };
}

export { createStore };
