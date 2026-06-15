import React, { useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const handleTodo = (e) => {
    setTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const todos = [...allTodos];

    const newTodo = {
      id: Date.now(),
      text: todo.trim(),
      completed: false,
    };
    todos.push(newTodo);
    setAllTodos(todos);
    setTodo("");
  };

  const handleDeleteTodo = (id) => {
    const todos = [...allTodos];
    const filteredTodos = todos.filter((ele) => ele.id !== id);
    setAllTodos(filteredTodos);
  };

  const handleCheckBox = (el) => {
    const id = el.id;
    const todos = [...allTodos];
    const updatedTodos = todos.map((ele) => {
      if (id === ele.id) {
        return { ...ele, completed: true };
      } else {
        return ele;
      }
    });
    console.log(updatedTodos);
    setAllTodos(updatedTodos);
  };
  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Todo"
          onChange={handleTodo}
          value={todo}
          required
        />
        <button>Add</button>
      </form>
      {allTodos.length === 0 ? (
        <p>No Todos Available</p>
      ) : (
        <ul>
          {allTodos.map((ele) => (
            <li key={ele.id}>
              <input type="checkbox" onClick={() => handleCheckBox(ele)} />
              <span
                style={{
                  textDecoration:
                    ele.completed === true ? "line-through" : "none",
                }}
              >
                {ele.text}
              </span>
              <button onClick={() => handleDeleteTodo(ele.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
