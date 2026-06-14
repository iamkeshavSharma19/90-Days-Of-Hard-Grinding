import React from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContextProvider";

const DisplayTodo = () => {
  const { allTodos, handleDeleteTodo, handleEditTodo } = useContext(TodoContext);
  console.log(allTodos);
  return (
    <div>
      <h1>All Todos Will Be Displayed Here ...</h1>
      {allTodos.length === 0 ? (
        <p>No Todos Available</p>
      ) : (
        <section>
          {allTodos.map((ele) => {
            return (
              <div
                style={{
                  border: "2px solid black",
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "wheat",
                }}
                key={ele.id}
              >
                <h3>{ele.text}</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <button onClick={() => handleEditTodo(ele.id)}>edit</button>
                  <button onClick={() => handleDeleteTodo(ele.id)}>
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default DisplayTodo;
