import React, { useReducer } from 'react';
//all of these types because typescript in strict mode and it want type safety
type State ={
  count: number;
  input: number;
}

// Define possible action types (using a union type for safety)
//union can have more types instead of 1 type (widen)
type Action =
  |{ type: 'Increment' }
  | { type: 'Decrement' }
  | { type: 'Reset' }
  | { type: 'Update' }
  | { type: 'Set'; payload: number };

const Counter = () => {
  const initial = {
    count: 0,
    input: 0
  };

  const Activities = {
    Plus: "Increment",
    Minus: "Decrement",
    Reset: "Reset",
    Update: "Update",
    Set: "Set",
  } as const;
//as const mean the object properties will be exactly like what written, const Activities mean Activities wont change but its properties will
  // no as const make React thing properties of a type ()

  const reducer = (state:State, action:Action)=> {
    switch(action.type) {
      case Activities.Plus:
        return {
          ...state, //copy all properties of state, override count
          count: state.count + 1
        };
      case Activities.Minus:
        return {
          ...state,
          count: state.count - 1
        };
      case Activities.Reset:
        return {
          ...state,
          count: 0
        };
      case Activities.Update:
        return {
          ...state,
          count: state.input  // Copy input to count
        };
      case Activities.Set:
        return {
          ...state,
          input: action.payload  // Update input value
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <section className="flex w-2/3 flex-col items-center gap-8 border-4 border-primary-500 bg-white p-8 shadow-lg">
      <h1>Days Since the Last Accident</h1>

      {/* ✅ Display count, not input */}
      <p className="text-6xl">{state.count}</p>

      <div className="flex gap-2">
        <button onClick={() => dispatch({type: Activities.Minus})}>
          ➖ Decrement
        </button>
        <button onClick={() => dispatch({type: Activities.Reset})}>
          🔁 Reset
        </button>
        <button onClick={() => dispatch({type: Activities.Plus})}>
          ➕ Increment
        </button>
      </div>

      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          dispatch({type: Activities.Update});
        }}>
          {/* ✅ Input field shows and updates input value */}
          <input
            type="number"
            value={state.input}  // Show input value
            onChange={(e) => dispatch({
              type: Activities.Set,
              payload: Number(e.target.value)
            })}
          />
          <button type="submit">Update Counter</button>
        </form>
      </div>

      {/* Debug info to see both values */}
      <div className="text-sm text-gray-500">
        Count: {state.count} | Input: {state.input}
      </div>
    </section>
  );
};

export default Counter;
