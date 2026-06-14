import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [allTodos, setAllTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(localStorage.getItem("todos")) : [];
  });
  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!todo || !description) {
      alert("Please fill all the input fields");
      return;
    }
    const newTodo = {
      id: Date.now(),
      todo: todo.trim(),
      description: description.trim(),
    };
    console.log(newTodo);
    setAllTodos((prev) => [...prev, newTodo]);
    //&Saving this newTodo to the local Storage
    //&First of all check are there any existing todos which are present in the Local Storage or not
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log(savedTodos);
    savedTodos.push(newTodo);
    console.log(savedTodos);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    setTodo("");
    setDescription("");
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        description,
        handleTodo,
        handleDescription,
        handleSaveTask,
        allTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
