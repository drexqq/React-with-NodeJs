import React, { useReducer, createContext, useContext, useRef } from "react";

// 만들 actions
// Create
// Toggle
// Remove

function TodoRecuder(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);

    case "TOGGLE":
      return state.map((todo) =>
        todo.__id === action.__id ? { ...todo, done: !todo.done } : todo
      );

    case "REMOVE":
      return state.filter((todo) => todo.__id !== action.__id);

    default:
      throw new Error(`Unhandled Action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
export function TodoProvider({ children }) {
  async function load() {
    let url = "http://3.23.219.141:5000/api/load";
    await fetch(url, {
      method: "POST",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((response) => {
        return response.data;
      });
  }
  console.log(load());
  const initialTodos = [];
  const [state, dispatch] = useReducer(TodoRecuder, initialTodos);
  const nextId = useRef(1);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error(`Cannot find TodoProvider`);
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error(`Cannot find TodoDispatchContext`);
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error(`Cannot find TodoNextIdContext`);
  }
  return context;
}
