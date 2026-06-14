import React from "react";
import Header from "./components/Header";
import CreateTodo from "./components/CreateTodo";
import DisplayTodo from "./components/DisplayTodo";

const TodoApp = () => {
  return (
    <div>
      <Header />
      <CreateTodo />
      <DisplayTodo />
    </div>
  );
};

export default TodoApp;
