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
  //?Creating a separate state variable for editing the todos
  const [editId, setEditId] = useState(null);
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
    if (editId) {
      const todos = [...allTodos];
      const updatedTodos = todos.map((ele) => {
        if (ele.id === editId) {
          return { ...ele, todo, description };
        } else {
          return ele;
        }
      });
      setAllTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodo("");
      setDescription("");
      setEditId(null);
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

  //&deleting the Todo
  const handleDeleteTodo = (id) => {
    const todos = [...allTodos];

    const updatedTodos = todos.filter((ele) => ele.id !== id);

    setAllTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  //?Updating The Todos
  const handleEditTodo = (ele) => {
    setEditId(ele.id);
    setTodo(ele.todo);
    setDescription(ele.description);
  };

  //?Clearing All The todos
  // Clearing All The Todos
const handleClearAllTodos = (e) => {
  e.preventDefault();

  const isConfirmed = confirm(
    "Do you want to clear all the tasks?"
  );

  if (isConfirmed) {
    setAllTodos([]);
    localStorage.removeItem("todos");
  }
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
        handleDeleteTodo,
        handleEditTodo,
        editId,
        handleClearAllTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
