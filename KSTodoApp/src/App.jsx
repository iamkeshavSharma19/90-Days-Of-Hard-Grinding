import React from "react";
import TodoContextProvider from "./ContextProvider/TodoContextProvider";
import TodoApp from "./TodoApp";
import "./App.css";

const App = () => {
  return (
    <TodoContextProvider>
      <TodoApp />
    </TodoContextProvider>
  );
};

export default App;
