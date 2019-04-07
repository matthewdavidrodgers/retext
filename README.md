# react-retext

a react state management library modeled after redux using hooks and context

### usage

react-retext exports one named export: createStore

create a store by passing createStore a function
createStore returns
RetextProvider (to wrap the top level of the data flow)
and
consume (a function which takes mapStateToProps, mapDispatchToProps, and a component to wrap)

```javascript
import React from "react";
import { createStore } from "react-retext";

const initialState = { value: "" };

function reducer (state=initialState, action) {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        value: action.value
      };
    case default:
      return state;
  }
}

const { RetextProvider, consume } = createStore(reducer);

let Component = ({ value, setValue }) => {
  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <span>Value: {value}</span>
    </div>
  );
};

const mapStateToProps = state => ({ value: state.value });
const mapDispatchToProps = dispatch => ({ setValue: dispatch({ type: "UPDATE", value }) });

let Component = consume(mapStateToProps, mapDispatchToProps, Component);

export default function App () {
  return (
    <RextextProvider>
      <Component />
    </RetextProvider>
  );
}
```
