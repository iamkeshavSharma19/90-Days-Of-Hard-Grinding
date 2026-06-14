import React from "react";
import CreateTodo from "./components/CreateTodo";
import DisplayTodo from "./components/DisplayTodo";

const TodoApp = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <hr />
      <CreateTodo />
      <hr />
      <DisplayTodo />
    </div>
  );
};

export default TodoApp;
